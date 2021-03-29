import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: '100%',
    flexGrow: 1,
    background: '#fff',
  },
  toolbar: theme.mixins.toolbar,
}));
