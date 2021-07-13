import React, {useContext} from 'react';
import {Grid, Typography, Paper, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {Mic, MicOff, Videocam, VideocamOff, ScreenShare} from '@material-ui/icons';
import {SocketContext} from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
    borderRadius : 10
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    display : 'flex',
    flexDirection : 'row',
    margin: '10px',
    backgroundColor : "transparent",
  },
  name : {
    color : "white",
  }, 
  option : {
    justifyContent : "center",
    color : 'white',
  },
  buttonOff : {
    color : 'red',
  },
  buttonOn : {
    color : 'white'
  }
}));

const VideoPlayer = () =>{
    const {name, callAccepted, myVideo, userVideo, callEnded, stream, call, audioMuted, videoMuted, toggleMuteAudio, toggleMuteVideo, screenShare} = useContext(SocketContext);
    const classes = useStyles();
    
    return(
        <Grid container className={classes.gridContainer}>

            {/* Our own video */}
            {stream && (
                <Paper className={classes.paper}>
                    <Grid className={classes.grid} item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom className = {classes.name}>{name || 'Name'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                        <div className = {classes.option}>
                          
                          {/* Audio Controls */}
                          {audioMuted ? (
                            <Button  startIcon={<MicOff alt = "mute" className = {classes.buttonOff} style = {{fontSize : 25}}/>} onClick={()=>toggleMuteAudio()}></Button>
                          ) : (
                            <Button startIcon={<Mic className = {classes.buttonOn} style = {{fontSize : 25}} />} onClick={()=>toggleMuteAudio()}></Button>
                          )}
                          
                          {/* Video Controls */}
                          {videoMuted ? (
                            <Button startIcon={<VideocamOff className = {classes.buttonOff} style = {{fontSize : 25}}/>} onClick={()=>toggleMuteVideo()}></Button>
                          ) : (
                            <Button startIcon={<Videocam className = {classes.buttonOn} style = {{fontSize : 25}}/>} onClick={()=>toggleMuteVideo()}></Button>
                          )}

                          {/* Screen Sharing */}
                          <Button startIcon={<ScreenShare className = {classes.buttonOn} style = {{fontSize : 25}}/>} onClick={()=>screenShare()}></Button>
                        </div>
                    </Grid>
                </Paper>
            )}

            {/* User's video */}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h6" gutterBottom className = {classes.name}>{call.name || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
            )}
        </Grid>
    )
}

export default VideoPlayer;