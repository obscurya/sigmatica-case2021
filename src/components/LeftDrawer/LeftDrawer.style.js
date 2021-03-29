import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  title: {
    width: '100%',
  },
  message: {
    maxWidth: 250,
    padding: theme.spacing(2),
  },
}));
