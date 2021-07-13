import {makeStyles} from '@material-ui/core/styles';

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
export default useStyles;