import React from 'react';
import { Grid, Card, CardHeader, CardContent, Typography } from "@material-ui/core";
import useStyles from "./style";

const University = ({ university, loading }) => {
    const classes = useStyles();
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={classes.root}>
                <CardHeader
                    title={university.name}
                    subheader={university.country}
                    titleTypographyProps={
                        {
                            variant: 'subtitle1'
                        }
                    }
                    subheaderTypographyProps={{
                        variant: 'subtitle2'
                    }}
                />
                <CardContent>
                    {
                        university.web_pages.map((url, index) => (
                            <Typography 
                                key={index}
                                variant="body2" 
                                color="textSecondary" 
                                component="a"
                                href={url}
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className={classes.content}
                            >
                                {url}
                            </Typography>
                        ))
                    }
                    
                </CardContent>
            </Card>
        </Grid>
    );
};

export default University;