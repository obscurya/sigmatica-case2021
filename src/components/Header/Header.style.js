import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  avatar: {
    width: 24,
    height: 24,
  },
}));
