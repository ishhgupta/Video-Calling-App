import React from 'react';
import {Typography,AppBar} from '@material-ui/core';

import Notifications from './components/Notifications/Notifications';
import Options from './components/Options/Options';
import VideoPlayer from './components/VideoPlayer/Videoplayer';
import useStyles from './AppStyles'

const App = () => {
  const classes = useStyles();
  return (
    <div className = {classes.wrapper}>
      
      {/* Header */}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography  className = {classes.title}>Anonymous Video Calls</Typography>
      </AppBar>

      <div className={classes.header}>To call your friend, ask them to open this app in their browser.</div>
      <div className={classes.header}>Send your copied id and wait for their call <span style={{fontWeight: 600}}>OR</span> enter their id and hit call! <br/></div>
        
      {/* Options -> Notifications */}
      <Options>
        <Notifications/>
      </Options>

       {/* Videoplayer */}
       <VideoPlayer/>
      
     
    </div>
  );
}

export default App;
