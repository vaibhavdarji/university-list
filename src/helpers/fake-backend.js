

import universities from "../data/university.json";
import { PER_PAGE } from "../config";
// array in local storage for registered users
let users = JSON.parse(localStorage.getItem('users')) || [];
    
const configureFakeBackend = () => {
    let realFetch = window.fetch;
    window.fetch = function (url, opts) {
        const { method } = opts;
        const body = opts.body && JSON.parse(opts.body);

        return new Promise((resolve, reject) => {
            // wrap in timeout to simulate server api call
            setTimeout(handleRoute, 500);
            
            function handleRoute() {
                switch (true) {
                    case url.endsWith('/users/authenticate') && method === 'POST':
                        return authenticate();
                    case url.endsWith('/users/register') && method === 'POST':
                        return register();
                    case url.endsWith('/users/universities') && method === 'GET':
                        return getUniversities();
                    default:
                        // pass through any requests not handled above
                        return realFetch(url, opts)
                            .then(response => resolve(response))
                            .catch(error => reject(error));
                }
            }

            // route functions

            function authenticate() {
                const { username, password } = body;
                const user = users.find(x => x.username === username && x.password === password);
                if (!user) return error('Username or password is incorrect');
                return ok({
                    id: user.id,
                    username: user.username,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    token: 'fake-jwt-token'
                });
            }

            function register() {
                const user = body;
                if (user.password !== user.passwordConfirm) {
                    return error('Password does not match');
                }
                if (users.find(x => x.username === user.username)) {
                    return error(`Username  ${user.username} is already taken`);
                }
    
                // assign user id and a few other properties then save
                user.id = users.length ? Math.max(...users.map(x => x.id)) + 1 : 1;
                users.push(user);
                localStorage.setItem('users', JSON.stringify(users));

                return ok();
            }

            function getUniversities() {
                const { name, current_page, per_page_items  } = body;
                let page = current_page || 1,
	                per_page = per_page_items || PER_PAGE,
	                offset = (page - 1) * per_page;

	            let list = universities.filter(university => university.name.includes(name) === true);
                let paginatedItems;
                if (name) {
                    paginatedItems = list.slice(offset).slice(0, per_page);
                } else {
                    paginatedItems = list.slice(offset).slice(0, per_page);
                }
                const total_pages = Math.ceil(list.length / per_page);
                return ok({
                    data: paginatedItems,
                    page,
                    next_page: (total_pages > page)
                    // next_page: (total_pages > page) ? page + 1 : null,
                    // page,
                    // per_page,
                    // pre_page: page - 1 ? page - 1 : null,
                    // next_page: (total_pages > page) ? page + 1 : null,
                    // total: universities.length,
                    // total_pages,
                    // data: paginatedItems
                });
            };

            // helper functions

            function ok(body) {
                resolve({ ok: true, text: () => Promise.resolve(JSON.stringify(body)) });
            }

            function error(message) {
                resolve({ status: 400, text: () => Promise.resolve(JSON.stringify({ message })) });
            }
        });
    }
}

export default configureFakeBackend;