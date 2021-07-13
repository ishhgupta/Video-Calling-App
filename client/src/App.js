import React from 'react';
import {Typography,AppBar} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

import Notifications from './components/Notifications';
import Options from './components/Options';
import VideoPlayer from './components/Videoplayer';

const useStyles = makeStyles((theme)=>({
  appBar: {
    backgroundColor: "rgba(255, 255, 255, 0.175)",
    height : '20%',
    // justifyContent: 'center',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
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
    justifyContent: 'center',
    fontSize : "35px",
    flexGrow : 1, 
    color : 'white',
    fontFamily : "Source Sans Pro",
    [theme.breakpoints.down('xs')]: {
      fontSize: '20px',
    },
  },
  header : {
    // display : 'flex',
    // flexDirection : 'row',
    color : "white",
    fontFamily: "Gilroy-light",
    fontSize : '25px',
    justifyContent : 'center',
    marginTop : '20px',
    position : 'relative',
  }
}));

const App = () => {
  const classes = useStyles();
  return (
    <div className = {classes.wrapper}>
      
      {/* Header */}
      <AppBar className={classes.appBar} position="static" color="inherit">
        <Typography  className = {classes.title}>Anonymous Video Calls</Typography>
      </AppBar>

      <div className={classes.header}>To call your friend, ask them to open this app in their browser.</div>
      <div className={classes.header}>   Send your copied id and wait for their call <span style={{fontWeight: 600}}>OR</span> enter their id and hit call! <br/></div>
        
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
