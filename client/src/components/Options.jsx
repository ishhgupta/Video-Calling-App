import React, { useContext, useState } from "react";
import {Button,TextField,Grid,Typography,Container,Paper} from "@material-ui/core";
import {  createMuiTheme,  makeStyles,  ThemeProvider,} from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import Alert from '@material-ui/lab/Alert';
// import {message} from "antd";

import { SocketContext } from "../SocketContext";

const theme = createMuiTheme({
  typography: {
    fontFamily: ["Source Sans Pro", "Helvetica", "sans-serif"].join(","),
    color: "#FFFFFF",
  },
});

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
    // border: '2px solid black',
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
}));

const Options = ({ children }) => {
  const {me,name,callEnded,setName,callAccepted,leaveCall,callUser} = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();
  // const showCopiedMessage = () => {
  //   navigator.clipboard.writeText(yourID)
  //   // setCopied(true)
  //   setInterval(()=>{
  //     setCopied(false)
  //   },1000)
  // }

  return (
    <ThemeProvider theme={theme}>
      <Container className={classes.container}>
        <Paper elevation={10} className={classes.paper}>
          <form className={classes.root} noValidate autoComplete="off">
            <Grid container className={classes.gridContainer}>
              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h5" className={classes.option} >Account Info </Typography>
                <TextField
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.label }}
                  className={classes.text}
                  label="Your Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  fullWidth
                />
                <CopyToClipboard text={me} className={classes.margin}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    startIcon={<Assignment fontSize="large" />}
                    // onClick={() => message.success("Code copied successfully!")}
                    onClick={() => {alert("Code copied successfully!")}} 
                    // {<Alert severity="success">This is a success alert — check it out!</Alert>}}
                  >Copy Your ID</Button>
                </CopyToClipboard>
              </Grid>

              <Grid item xs={12} md={6} className={classes.padding}>
                <Typography gutterBottom variant="h5" className={classes.option}>Make a call</Typography>
                <TextField
                  InputProps={{ className: classes.input }}
                  InputLabelProps={{ className: classes.label }}
                  className={classes.text}
                  label="ID to Call"
                  value={idToCall}
                  onChange={(e) => setIdToCall(e.target.value)}
                  fullWidth
                />
                {callAccepted && !callEnded ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    startIcon={<PhoneDisabled fontSize="large" />}
                    fullWidth
                    onClick={leaveCall}
                    className={classes.margin}
                  >
                    Hang Up
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<Phone fontSize="large" />}
                    fullWidth
                    onClick={() => callUser(idToCall)}
                    className={classes.margin}
                  >
                    Call
                  </Button>
                )}
              </Grid>
            </Grid>
          </form>
          {children}
        </Paper>
      </Container>
    </ThemeProvider>
  );
};

export default Options;
