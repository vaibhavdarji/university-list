import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userActions } from "../../store/actions";
import UserForm from "../UserForm/UserForm";

const Login = () => {
    
    const dispatch = useDispatch();
    // reset login status
    useEffect(() => { 
        dispatch(userActions.logout()); 
    }, [dispatch]);
    return (
        <UserForm />
    )
};

export default Login;