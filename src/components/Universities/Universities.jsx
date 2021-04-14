import React, { useCallback, useEffect, useState } from 'react';
import { Grid, Card, CardHeader, CardContent, Divider, InputBase } from '@material-ui/core';
import { Search } from "@material-ui/icons";
import {  Skeleton } from '@material-ui/lab';
import { useDispatch, useSelector } from "react-redux";
import useStyles from "./style";
import { universityActions } from "../../store/actions";
import useDebounce from "../../hooks/useDebounce";

import University from "../University/University";
import { PER_PAGE } from "../../config";


const Universities = () => {
    const classes = useStyles();
    const [page, setPage] = useState(1);
    const dispatch = useDispatch();

    const [searchTerm, setSearchTerm] = useState('');
    const debouncedSearchTerm = useDebounce(searchTerm, 500);

    const { loading, data, next_page } = useSelector(state => state.universities);

    useEffect(() => {
        dispatch(universityActions.getUniversities(page, debouncedSearchTerm));
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [page, dispatch, debouncedSearchTerm]);

    const onChangeSearch = ({ target: { value } }) => {
        
        setSearchTerm(value);
        setPage(1);
    }

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
            document.documentElement.offsetHeight
          )
            return;
        fetchMoreItems();
    };

    const fetchMoreItems = useCallback(() => {
        if (next_page) {
            setPage((page) => page + 1);
        }
    }, [next_page])

    return  (
        <React.Fragment>
            <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <Search/>
                        </div>
                        <InputBase
                            placeholder="Search university detail here"
                            classes={{
                              root: classes.inputRoot,
                              input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                            onChange={onChangeSearch}
                        />
                    </div>
            <Divider/>
        <Grid container justify="center" spacing={4} className={classes.list}>
                {
                    data.map((university, index) => (
                        <University key={index} university={university} />
                    ))
                }
                {
                    loading && (
                        Array.from(Array(PER_PAGE).keys()).map(number => (
                            <Grid key={number} item xs={12} sm={6} md={4} lg={3}>
                                <Card className={classes.card}>
                                    <CardHeader
                                        title={
                                            <Skeleton 
                                                animation="wave"
                                                height={10}
                                                style={{ marginBottom: 6 }}
                                            />
                                        }
                                        subheader={
                                            <Skeleton animation="wave" height={10} width="40%" />
                                        }
                                    />
                                    {/* <Skeleton animation="wave" variant="rect" className={classes.media} /> */}
                                    <CardContent>
                                        <Skeleton animation="wave" height={10} style={{ marginBottom: 6 }} />
                                        <Skeleton animation="wave" height={10} width="80%" />
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))
                    )
                }
            </Grid>
        </React.Fragment>
    )
};
export default Universities;