import React, { useContext, useState } from "react";
import {Button,TextField,Grid,Typography,Container,Paper} from "@material-ui/core";
import { makeStyles,  ThemeProvider,} from "@material-ui/core/styles";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Assignment, Phone, PhoneDisabled } from "@material-ui/icons";
import useStyles from './OptionsStyles';
import {
  WhatsappShareButton,
  WhatsappIcon,
  FacebookIcon,
  FacebookShareButton,
} from "react-share";
import { SocketContext } from "../../SocketContext";

const Options = ({ children }) => {
  const {me,name,callEnded,setName,callAccepted,leaveCall,callUser} = useContext(SocketContext);
  const [idToCall, setIdToCall] = useState("");
  const classes = useStyles();
  return (
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
                    onClick={() => {alert("Code copied successfully!")}} 
                  >Copy Your ID</Button>
                </CopyToClipboard>

                <div>
                    <WhatsappShareButton
                    url={`https://video-chat-mihir.web.app/`}
                    title={`Join the meeting with the given code : `+ me + `\n`}   
                    separator="Link: "
                    className={classes.shareIcon}
                >
                  <WhatsappIcon size={35} round />
                </WhatsappShareButton>
                <FacebookShareButton
                  url={`https://video-chat-mihir.web.app/`}
                  title={`Join the meeting with the given code : `+ me + `\n`}
                  className={classes.shareIcon}
                >
                  <FacebookIcon size={35} round />
                </FacebookShareButton>
                </div>
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
                    className={classes.margin}
                    onClick={() => {
                      if(name.length && idToCall.length) 
                        {callUser(idToCall)} 
                      else{ 
                        if(!name.length){
                          alert("Please enter your name")
                        }
                        else if(!idToCall.length){
                          alert("Please enter your id")
                        }
                      }
                    }}
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
  );
};

export default Options;
