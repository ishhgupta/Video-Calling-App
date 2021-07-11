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
  },
  gridContainer: {
    justifyContent: 'center',
    [theme.breakpoints.down('xs')]: {
      flexDirection: 'column',
    },
  },
  paper: {
    padding: '10px',
    border: '2px solid black',
    margin: '10px',
  },
}));

const VideoPlayer = () =>{
    const {name, callAccepted, myVideo, userVideo, callEnded, stream, call, audioMuted, videoMuted, toggleMuteAudio, toggleMuteVideo, screenShare} = useContext(SocketContext);
    const classes = useStyles();
    
    return(
        <Grid container className={classes.gridContainer}>

            {/* Our own video */}
            {stream && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{name || 'Name'}</Typography>
                        <video playsInline muted ref={myVideo} autoPlay className={classes.video}/>
                        <Typography variant = "h5" gutterBottom>
                          
                          {/* Audio Controls */}
                          {audioMuted ? (
                            <Button startIcon={<MicOff fontSize="large"/>} onClick={()=>toggleMuteAudio()}></Button>
                          ) : (
                            <Button startIcon={<Mic fontSize="large"/>} onClick={()=>toggleMuteAudio()}></Button>
                          )}
                          
                          {/* Video Controls */}
                          {videoMuted ? (
                            <Button startIcon={<VideocamOff fontSize="large"/>} onClick={()=>toggleMuteVideo()}></Button>
                          ) : (
                            <Button startIcon={<Videocam fontSize="large"/>} onClick={()=>toggleMuteVideo()}></Button>
                          )}

                          {/* Screen Sharing */}
                          <Button startIcon={<ScreenShare fontSize="large"/>} onClick={()=>screenShare()}></Button>

                        </Typography>
                    </Grid>
                </Paper>
            )}

            {/* User's video */}
            {callAccepted && !callEnded && (
                <Paper className={classes.paper}>
                    <Grid item xs={12} md={6}>
                        <Typography variant="h5" gutterBottom>{call.name || 'Name'}</Typography>
                        <video playsInline ref={userVideo} autoPlay className={classes.video}/>
                    </Grid>
                </Paper>
            )}
        </Grid>
    )
}

export default VideoPlayer;