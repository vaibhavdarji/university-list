import React, { useState } from 'react';
import {  AppBar, Toolbar, Typography, IconButton, Menu, MenuItem } from "@material-ui/core";
import { AccountCircle } from "@material-ui/icons";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';
import useStyles from "./style";

const NavBar  = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const user = useSelector(state => state.authentication.user);
    const history = useHistory();
    
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const onLogout = () => {
        handleClose();
        history.push("/login");
    }

    return (
        <React.Fragment>
            <AppBar 
                position="fixed"
                className={classes.appBar}
                // color="inherit"
            >
                <Toolbar>
                    <Typography 
                        component={Link}
                        to="/"
                        variant="h6"
                        className={classes.title}
                        color="inherit"
                    >
                        
                        University Center
                    </Typography>
                    
                    <div className={classes.grow}/>
                    {
                        user && user.username && (
                            <React.Fragment>
                                <IconButton
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                    <Typography variant="h6" color="inherit">
                                        { user.username }
                                    </Typography>
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                      vertical: 'top',
                                      horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={handleClose}
                                >
                                    <MenuItem onClick={onLogout}>Logout</MenuItem>
                                </Menu>
                            </React.Fragment>
                        )
                    }
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
};

export default NavBar;