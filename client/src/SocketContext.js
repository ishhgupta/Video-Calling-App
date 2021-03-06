import React, {createContext, useState, useRef, useEffect} from 'react';
import Peer from 'simple-peer';
import {io} from 'socket.io-client';

const SocketContext = createContext();

// const socket = io('http://localhost:5000');
const socket = io('https://kishmish-video-calling.herokuapp.com/');


const ContextProvider = ({children}) =>{
    const [stream,setStream] = useState(null);
    const [callAccepted,setCallAccepted] = useState(false);
    const [name,setName] = useState('');
    const [videoMuted, setVideoMuted] = useState(false);
    const [audioMuted, setAudioMuted] = useState(false);
    const [me,setMe] = useState('');
    const [call,setCall] = useState({});    
    const [callEnded,setCallEnded] = useState(false);

    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(()=>{
        navigator.mediaDevices.getUserMedia({ video: true , audio : true})
            .then((currentStream) =>{
                setStream(currentStream);

                myVideo.current.srcObject = currentStream;
            });
        
        socket.on('me',(id)=> setMe(id));

        socket.on('calluser',({from,name:callerName, signal})=>{
            setCall({isReceivingCall : true,from, name : callerName,signal})
        });
    },[]);

    const answerCall = () => {
        setCallAccepted(true)

        const peer = new Peer({initiator: false, trickle: false, stream});

        peer.on('signal',(data)=>{
            socket.emit('answercall', {signal: data, to: call.from});
        });

        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject =   currentStream;  
        })

        peer.signal(call.signal);

        connectionRef.current = peer;

        socket.on('close', ()=>{
            window.location.reload();
        })
    }

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true, 
            trickle: false, 
            stream});

        peer.on('signal',(data)=>{
            socket.emit('calluser', {userToCall: id, signalData: data, from : me, name});
        });
        peer.on('stream',(currentStream)=>{
            userVideo.current.srcObject =   currentStream;  
        });
        socket.on('callaccepted', (signal)=>{
            setCallAccepted(true);

            peer.signal(signal);
        });
        socket.on('close', ()=>{
            window.location.reload();
        })
        connectionRef.current = peer;

    }

    /* Ends the Call when we Click on Hang Up */
    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        socket.emit('close', {to:call.from});
        window.location.reload();
    }

    /* Turns Audio ON/OFF */
    const toggleMuteAudio =() =>{
        if(stream){
            setAudioMuted(!audioMuted)
            stream.getAudioTracks()[0].enabled = audioMuted;
        }
    }

    /* Turns Video ON/OFF */
    const toggleMuteVideo = () =>{
        if(stream){
            setVideoMuted(!videoMuted)
            stream.getVideoTracks()[0].enabled = videoMuted;
        }
    }

    /* Handles Reject Call functionality when we decline the call */
    const rejectCall = () => {
        socket.emit('close', {to:call.from});
    }


    /* Handles Screen share Functionality */
    const screenShare = () =>{
        navigator.mediaDevices.getDisplayMedia({cursor:true})
        .then(screenStream => {
            connectionRef.current.replaceTrack(stream.getVideoTracks()[0],screenStream.getVideoTracks()[0],stream)
            myVideo.current.srcObject= screenStream
            screenStream.getTracks()[0].onended = () =>{
                connectionRef.current.replaceTrack(screenStream.getVideoTracks()[0], stream.getVideoTracks()[0],stream)
                myVideo.current.srcObject = stream
            }
        })
    }

    return (
        <SocketContext.Provider value={{ call, callAccepted, myVideo, userVideo, stream, name, setName, callEnded, me, callUser, leaveCall, answerCall, audioMuted, videoMuted, toggleMuteAudio, toggleMuteVideo, screenShare, rejectCall}}>
            {children}
        </SocketContext.Provider>
    )
}

export {ContextProvider, SocketContext};