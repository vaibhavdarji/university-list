import React,  { memo } from 'react';
import { InputAdornment, makeStyles } from '@material-ui/core';
import { VisibilityOffTwoTone, VisibilityTwoTone } from "@material-ui/icons";

const useStyles = makeStyles(() => ({
    passwordEye: {
        color: "rgba(131,153,167,0.9)",
        opacity: 0.7,
        cursor: 'pointer'
    },
}));

const PasswordAdornment = memo(({ hide, showPassword }) => {
    const classes = useStyles();
    return (<InputAdornment position="end">
        {
            hide ? (
                <VisibilityOffTwoTone
                    fontSize="default"
                    className={classes.passwordEye}
                    onClick={showPassword}
                />
            ) : (
                <VisibilityTwoTone
                    fontSize="default"
                    className={classes.passwordEye}
                    onClick={showPassword}
                />
            )
        }
    </InputAdornment>
)
});

export default PasswordAdornment;