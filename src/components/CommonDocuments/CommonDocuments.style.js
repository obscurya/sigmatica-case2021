import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
  },
}));
