import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: theme.spacing(1, 2),
  },
  button: {
    marginBottom: theme.spacing(1),
  },
  card: {
    maxWidth: 345,
    width: '100%',
  },
  media: {
    height: 250,
    backgroundPosition: 'center',
  },
  linkSpecialty: {
    display: 'block',
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
  },
  contacts: {
    marginTop: theme.spacing(4),
  },
  contact: {
    display: 'flex',
    '& > *:last-child': {
      paddingLeft: theme.spacing(1),
    },
  },
  cardActions: {
    display: 'flex',
    '& > *:first-child': {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
}));
