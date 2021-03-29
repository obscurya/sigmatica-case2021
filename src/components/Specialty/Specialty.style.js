import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    padding: theme.spacing(1, 2),
  },
  card: {
    maxWidth: 345,
    width: '100%',
  },
  cardActions: {
    display: 'flex',
    '& > *:first-child': {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
}));
