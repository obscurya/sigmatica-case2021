import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  schedule: {
    maxWidth: 375,
    width: '100%',
  },
  scheduleHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  day: {
    width: '100%',
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  process: {
    margin: theme.spacing(1, 2),
    padding: theme.spacing(1),
  },
  link: {
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
  },
  dayOff: {
    marginTop: theme.spacing(2),
  },
}));
