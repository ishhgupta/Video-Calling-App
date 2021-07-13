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
    // alignSelf : 'center'
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
    
    const showModal = (showVal) => {
      setIsModalVisible(showVal);
    };
    const handleCancel = () => {
      setIsModalVisible(false);
      rejectCall();
      window.location.reload();
    };

    useEffect(() => {
      if (call.isReceivingCall && !callAccepted) {
        setIsModalVisible(true);
        // setOtherUser(call.from);
      } else setIsModalVisible(false);
    }, [call.isReceivingCall]);

    // return(
    //     <>
    //       {call.isReceivingCall && !callAccepted &&(
    //         <div style ={{ display : 'flex' , justifyContent: 'center'}}>
    //             <h1>{call.name} is calling: </h1>
    //             <Button variant= "contained" color="primary" onClick={
    //               // console.log("in notifs")
    //               answerCall
    //               }>
    //                 Answer
    //             </Button>
    //           </div>
    //       )}
    //     </>
                     
    // )
  // }
    return (
      <>

          {call.isReceivingCall && !callAccepted &&(
            <div className ={classes.notif}>
              <audio src = {Teams} loop ref={Audio}/>
              <h1>{call.name} is calling: </h1>
                 <Button variant= "contained" color="primary" onClick={answerCall}>
                    Answer
                </Button>
              {/* <Modal title="Incoming Call" visible={isModalVisible} onOk={()=>showModal(false)} onCancel={handleCancel} footer = {null}>
                <div style={{ display: "flex", justifyContent: "space-around" }}>
                  <h1>
                    {call.name} is calling you:{" "}
                    <img
                      src={Phone}
                      alt="phone ringing"
                      // className={classes.phone}
                      style={{ display: "inline-block" }}
                    />
                  </h1>
                </div>
                <div 
                // className={classes.btnDiv}
                >
                  <Button
                    variant="contained"
                    // className={classes.answer}
                    color="#29bb89"
                    // icon={<PhoneOutlined />}
                    onClick={() => {
                      answerCall();
                      Audio.current.pause();
                    }}
                    // tabIndex="0"
                  >
                    Answer
                  </Button>
                  <Button
                    variant="contained"
                    // className={classes.decline}
                    // icon={<PhoneOutlined />}
                    onClick={() => {
                      setIsModalVisible(false);
                      Audio.current.pause();
                    }}
                    // tabIndex="0"
                  >
                    Decline
                  </Button>
                </div>
              </Modal> */}
          </div>  
          )};
      </>
    )
}
 

export default Notifications;