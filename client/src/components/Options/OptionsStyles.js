import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexDirection: "column",
    },
    gridContainer: {
      width: "100%",
      [theme.breakpoints.down("xs")]: {
        flexDirection: "column",
      },
    },
    container: {
      width: "600px",
      margin: "35px 0",
      padding: 0,
      [theme.breakpoints.down("xs")]: {
        width: "80%",
      },
    },
    margin: {
      marginTop: 20,
    },
    padding: {
      padding: 20,
    },
    paper: {
      backgroundColor: "transparent",
      padding: "10px 20px",
    },
    option: {
      fontFamily: "Gilroy-light",
      color: "#FFFFFF",
      fontWeight: 800,
    },
  
    text: {
      fontStyle: "italic",
      "& label.MuiIn": {
        color: "white",
      },
      "& label.Mui-focused": {
        color: "white",
      },
      "& .MuiInput-underline:after": {
        borderBottomColor: "white",
      },
      "& .MuiInput-underline:before": {
        borderBottomColor: "white",
      },
      "&& .MuiInput-underline:hover": {
        borderBottomColor: "white",
      },
    },
  
    input: {
      color: "white",
    },
    label: {
      color: "white",
    },
    shareIcon :{
      marginTop : '8px',
      marginRight : '10px',
    }
    
}));

export default useStyles;