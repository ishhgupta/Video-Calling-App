import React, { useContext, useState, useRef, useEffect } from "react";
import { Button } from "@material-ui/core";
import Phone from "../../assets/phone.gif";
import Teams from "../../assets/teams.mp3";
import useStyles from "./NotificationStyles";

import { SocketContext } from "../../SocketContext";

const Notifications = () => {
  const { answerCall, call, callAccepted, rejectCall } = useContext(
    SocketContext
  );
  const [isModalVisible, setIsModalVisible] = useState(false);
  const Audio = useRef();
  const classes = useStyles();

  useEffect(() => {
    if (isModalVisible) {
      Audio?.current?.play();
    } else Audio?.current?.pause();
  }, [isModalVisible]);

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
      {call.isReceivingCall && !callAccepted && (
        <div className={classes.notif}>
          <audio src={Teams} loop ref={Audio} />
          <div className={classes.ring}>

            <h1 style={{ color: "white" }}>
              {call.name} is calling:{" "}
              <img
                src={Phone}
                alt="phone ringing"
                style={{ display: "inline-block", height: "40px" }}
              />
            </h1>

            <div style={{ justifyContent: "center", alignItems: "center" }}>
              
              {/* Button to answer the call */}
              <Button
                variant="contained"
                color="primary"
                className={classes.answer}
                onClick={() => {
                  answerCall();
                  Audio.current.pause();
                }}
              >
                Answer
              </Button>

              {/* Button to Reject the Call */}
              <Button
                variant="contained"
                color="secondary"
                style={{ marginLeft: "10px" }}
                onClick={() => {
                  handleCancel();
                  Audio.current.pause();
                }}
              >
                Reject
              </Button>

            </div>
          </div>
        </div>
      )}
      ;
    </>
  );
};

export default Notifications;
