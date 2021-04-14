import { makeStyles  } from '@material-ui/core';

export default makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default
    },
    toolbar: theme.mixins.toolbar,
}));