import React, { useState } from 'react';
import {  Grid, CssBaseline, Avatar, Typography, Paper, TextField, Button, CircularProgress } from "@material-ui/core";
import { LockOutlined, PeopleAlt } from "@material-ui/icons";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "../../store/actions";
import useStyles from "./style";
import PasswordAdornment from "../PasswordAdornment/PasswordAdornment";



const UserForm = ({ signUp }) => {
    const classes = useStyles();
    const [hidePassword, setTogglePassword] = useState(true);
    const showPassword = () => setTogglePassword(prevState => !prevState);
    const [submitted, setSubmitted] = useState(false);
    const history = useHistory();

    const [inputs, setInputs] = useState({
        username: '',
        password: '',
        ...(signUp ? {
            passwordConfirm: ''
        }: {})
    });

    const { username, password, passwordConfirm } = inputs;

    const loggingIn = useSelector(state => state.authentication.loggingIn);

    const dispatch = useDispatch();
    const location = useLocation();

    const handleOnChange = ({ target: { name, value } }) => setInputs(inputs => ({
        ...inputs,
        [name]: value
    }));

    const onSuccessLogin = () => {
        // get return url from location state or default to home page
        const { from } = location.state || { from: { pathname: "/" } };
        history.push(from)
    };

    const onSuccessRegister = () => {
        history.push('/login');
    };

    const handleOnSubmit = event => {
        event.preventDefault();
        setSubmitted(true);
        if (username && password) {
            if (signUp) {
                dispatch(userActions.register(inputs, onSuccessRegister));    
            } else {
                dispatch(userActions.login(username, password, onSuccessLogin));
            }
        }
    };

    return (
        <Grid container component="main" className={classes.root}>
            <CssBaseline />
            <Grid item xs={false} sm={4} md={7} className={classes.image} />
            <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        {
                            signUp ? (
                                <PeopleAlt />
                            ) : (
                                <LockOutlined />
                            )
                        }
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        {
                            signUp ? 'Sign Up': 'Sign In'
                        }
                    </Typography>
                    <form 
                        className={classes.form} 
                        noValidate 
                        autoComplete="off"
                        onSubmit={handleOnSubmit}
                    >
                        <TextField
                            required
                            error={submitted && !username}
                            fullWidth
                            margin="normal"
                            name="username"
                            id="username"
                            variant="outlined"
                            label="User Name"
                            onChange={handleOnChange}
                        />
                        <TextField
                            required
                            error={submitted && !password}
                            fullWidth
                            margin="normal"
                            name="password"
                            id="password"
                            variant="outlined"
                            label="Password"
                            type={hidePassword ? "password": "text"}
                            onChange={handleOnChange}
                            InputProps={{
                                endAdornment: <PasswordAdornment hide={hidePassword} showPassword={showPassword}/>
                            }}
                        />
                        {
                            signUp && (
                                <TextField
                                    required
                                    error={submitted && !passwordConfirm}
                                    fullWidth
                                    margin="normal"
                                    name="passwordConfirm"
                                    id="passwordConfirm"
                                    variant="outlined"
                                    label="Confirm Password"
                                    type={hidePassword ? "password": "text"}
                                    onChange={handleOnChange}
                                    InputProps={{
                                        endAdornment: <PasswordAdornment hide={hidePassword} showPassword={showPassword}/>
                                    }}
                                />
                            )
                        }
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            {
                               signUp ? 'Sign Up': 'Sign In'
                            }
                            {
                                loggingIn && (
                                <CircularProgress 
                                    color="inherit"
                                    className={classes.loader}
                                    size={30}
                                    thickness={2}
                                />
                            )}
                        </Button>
                        <Grid container>
                            <Grid item>
                                <Typography
                                    variant="body2"
                                    component={Link}
                                    to={signUp ? "/login": "/register"}
                                >
                                    {
                                        signUp ? "I am already a member" : "Don't have an account? Sign Up"
                                    }
                                    
                                </Typography>
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Grid>
        </Grid>
    )
};

export default UserForm;