import React, {useContext, useState, useRef, useEffect} from 'react';
import {Button} from '@material-ui/core';
import {Modal} from "antd";
import Phone from "../assets/phone.gif";
import Teams from "../assets/teams.mp3";
import {makeStyles} from '@material-ui/core/styles';

import {SocketContext} from '../SocketContext';

const useStyles = makeStyles((theme) => ({
  video: {
    width: '550px',
    [theme.breakpoints.down('xs')]: {
      width: '300px',
    },
  },
  notif : {
    display : 'flex',
    justifyContent : 'center',
    alignItems : 'center'
  },
  ring : { 
    display : 'flex' , 
    flexDirection : 'column', 
    justifyContent: 'center', 
    alignItems : 'center' 
  },
  answer : {
    backgroundColor :'#4d7902', 
    color : 'white'
  }
}));

const Notifications = () =>{
    const {answerCall, call, callAccepted, rejectCall} = useContext(SocketContext);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const Audio = useRef();
    const classes = useStyles();

    useEffect(() => {
      if (isModalVisible) {
        Audio?.current?.play();
      } else Audio?.current?.pause();
    }, [isModalVisible]);
    
    // const showModal = (showVal) => {
    //   setIsModalVisible(showVal);
    // };
    const handleCancel = () => {
      setIsModalVisible(false);
      rejectCall();
      window.location.reload();
    };

    useEffect(() => {
      if (call.isReceivingCall && !callAccepted) {
        setIsModalVisible(true);
      } else setIsModalVisible(false);
    }, [call.isReceivingCall]);

    return (
      <>
          {call.isReceivingCall && !callAccepted &&(
            <div className ={classes.notif}>
              <audio src = {Teams} loop ref={Audio}/>
              <div className = {classes.ring}>
                <h1 style = {{color : 'white'}}>
                  {call.name} is calling: {" "}
                  <img
                      src={Phone}
                      alt="phone ringing"
                      style={{  display : "inline-block" , height : '40px' }}
                    />
                </h1>
                <div style = {{justifyContent : 'center', alignItems : 'center'}}>
                  <Button variant= "contained" color="primary" className = {classes.answer} onClick={() => {answerCall(); Audio.current.pause();}}>
                      Answer
                  </Button>
                  <Button variant= "contained" color="secondary"  style = {{marginLeft : '10px'}} onClick={() => {handleCancel(); Audio.current.pause();}}>
                      Reject
                  </Button>
                </div>
              </div>
          </div>  
          )};
      </>
    )
}
 

export default Notifications;