import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    video: {
      width: '550px',
      [theme.breakpoints.down('xs')]: {
        width: '300px',
      },
      borderRadius : 10
    },
    gridContainer: {
      justifyContent: 'center',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
      },
    },
    paper: {
      display : 'flex',
      flexDirection : 'row',
      margin: '10px',
      backgroundColor : "transparent",
    },
    name : {
      color : "white",
    }, 
    option : {
      justifyContent : "center",
      color : 'white',
    },
    buttonOff : {
      color : 'red',
    },
    buttonOn : {
      color : 'white'
    }
}));

export default useStyles;