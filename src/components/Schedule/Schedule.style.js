import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  schedule: {
    maxWidth: 375,
    width: '100%',
    padding: theme.spacing(1, 0, 7, 0),
  },
  scheduleTitle: {
    padding: theme.spacing(0, 2),
  },
  scheduleDay: {
    padding: theme.spacing(0, 2),
  },
  scheduleHeader: {
    display: 'flex',
    alignItems: 'center',
    marginTop: theme.spacing(2),
  },
  day: {
    width: '100%',
  },
  chip: {
    marginLeft: theme.spacing(1),
  },
  process: {
    display: 'flex',
    alignItems: 'flex-end',
    margin: theme.spacing(2, 0),
    padding: theme.spacing(1),
  },
  processLeft: {
    width: '100%',
  },
  processAvatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  link: {
    display: 'block',
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
  },
  dayOff: {
    marginTop: theme.spacing(2),
  },
  subtitle: {
    margin: theme.spacing(2, 0),
  },
}));
