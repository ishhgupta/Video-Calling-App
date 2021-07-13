import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme)=>({
    appBar: {
      backgroundColor: "rgba(255, 255, 255, 0.175)",
      height : '20%',
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
      color : "white",
      fontFamily: "Gilroy-light",
      fontSize : '25px',
      justifyContent : 'center',
      marginTop : '20px',
      position : 'relative',
    }
}));

export default useStyles;
  