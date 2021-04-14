import React from 'react';
import useStyles from "./style";
import Universities from "../Universities/Universities";

const Home = () => {
    const classes = useStyles();

    return (
        <main className={classes.root}>
            <div className={classes.toolbar} />
            <Universities />
        </main>
    );
};

export default Home;