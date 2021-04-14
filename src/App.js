import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline, Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import { useSelector } from 'react-redux';
import { NavBar, Home, NotFound, Login, Register } from "./components";

const PrivateRoute = ({ component: Component, roles, ...rest }) => {
  const user = localStorage.getItem('user');
  return (
    <Route 
      {...rest}
      render={
        props => {
          if (!user) {
            // not logged in so redirect to login page with the return url
            return (
              <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )
          } 
          // logged in so return component
          return (
            <React.Fragment>
              <NavBar />
              <Component {...props} />
            </React.Fragment>
          )
        }
      }
    />
  )
};

const App = () => {
  const alert = useSelector(state => state.alert);
  const [open, setOpen] = useState(false);

  const handleOnClose = (_, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  useEffect(() => {
    if (alert.message) {
      setOpen(true);
    }
  }, [alert])
  return (
    <Router>
      <div style={{display: 'flex'}}>
        {
          alert.message && (
            <Snackbar 
              open={open}
              onClose={handleOnClose}
              autoHideDuration={3000}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right'
              }}
            >
              <Alert 
                elevation={3} 
                variant="filled"
                onClose={handleOnClose}
                severity={alert.type}
              >
                {alert.message}
              </Alert>
            </Snackbar>
          )
        }
        <CssBaseline />
        {/* <NavBar /> */}
        <Switch>
          <PrivateRoute exact path="/" component={Home}/>
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route component={NotFound}/>
        </Switch>
      </div>
    </Router>
  )
};

export default App;
