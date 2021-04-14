import React from 'react';
import useStyles from "./style";

const NotFound = () => {
    const classes = useStyles();
    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            Not Found
        </main>
    );
};

export default NotFound;