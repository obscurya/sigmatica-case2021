import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  balance: {
    display: 'flex',
    alignItems: 'center',
    margin: theme.spacing(2, 0),
    '& > *:first-child': {
      width: '100%',
    },
  },
  atoms: {
    display: 'flex',
    alignItems: 'center',
    color: '#9575cd',
    fill: '#9575cd',
    '& > *:last-child': {
      marginTop: -2,
      marginLeft: theme.spacing(1),
      display: 'flex',
      alignItems: 'center',
    },
  },
  button: {
    '& > span': {
      display: 'flex',
      alignItems: 'center',
      '& > *:last-child': {
        marginTop: -2,
      },
    },
  },
  tasks: {
    margin: theme.spacing(2, 0),
  },
  task: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& > *:first-child': {
      padding: theme.spacing(1, 1, 1, 2),
    },
    '& > *:last-child': {
      padding: theme.spacing(1, 2, 1, 1),
    },
  },
}));
