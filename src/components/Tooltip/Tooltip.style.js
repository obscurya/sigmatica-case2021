import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  arrow: {
    color: '#ba68c8',
    fontSize: '0.875rem',
  },
  tooltip: {
    backgroundImage: 'linear-gradient(to bottom, #ba68c8, #ab47bc)',
    margin: theme.spacing(-1, 0, 0, 0),
    padding: theme.spacing(2),
    maxWidth: 200,
    boxShadow: theme.shadows[10],
  },
  step: {
    opacity: 0.7,
  },
}));
