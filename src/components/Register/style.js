import { makeStyles } from "@material-ui/core";

export default makeStyles(theme => ({
    root: {
        height: '100vh'
    },
    image: {
        backgroundImage: 'url(https://source.unsplash.com/random)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
    },
    paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    labels: {
        padding: `${theme.spacing(1)}px ${theme.spacing(4)}px`,
        lineHeight: "5px",
    },
    inputs: {
        position: "relative",
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        padding: `${theme.spacing(1.5)}px ${theme.spacing(1)}px`,
        borderRadius: theme.spacing(1),
        border: "2px solid rgba(0, 0, 0, 0.87)",
        "&:hover": {
            borderColor: '#3f51b5'
        }
    },
    
    submit: {
        margin: theme.spacing(3, 0, 2)
    },
}));