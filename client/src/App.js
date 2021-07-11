import React from 'react';
import {Typography,AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/Videoplayer';

const useStyles = makeStyles((theme)=>({
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 0.175)",
    // backgroundColor: '#ffffff',
    // opacity : '0.1',
    // backgroundColor : '#373d49',
    // opacity: '0.9',
    display: 'flex',
    flexDirection: 'row',
    height : '60px',
    justifyContent: 'space-around',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '90%',
    },
  },
  wrapper: {
    flexGrow : 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  title : {
    marginLeft : theme.spacing(4),
    flexGrow : 1, 
    color : 'white',
    fontFamily : "Source Sans Pro"
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className = {classes.wrapper}>
      {/* Header */}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography variant="h4" className = {classes.title}>Anonymous Video Calls</Typography>
      </AppBar>
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
