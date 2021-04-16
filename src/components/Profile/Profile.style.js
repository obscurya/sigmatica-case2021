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
  cardActions: {
    display: 'flex',
    '& > *:first-child': {
      marginLeft: theme.spacing(1),
      width: '100%',
    },
  },
  avatar: {
    width: theme.spacing(18),
    height: theme.spacing(18),
    margin: theme.spacing(0, 2),
  },
  contactsAndAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    margin: theme.spacing(2, 0, 4, 0),
    '& > *:first-child': {
      background: '#42a5f5',
      color: '#fff',
    },
    '& > *:last-child': {
      background: '#66bb6a',
      color: '#fff',
    },
  },
  name: {
    marginBottom: theme.spacing(1),
  },
  profileImage: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: theme.spacing(2, 0, 4, 0),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: theme.spacing(4),
    '& > *': {
      color: '#fff !important',
      margin: theme.spacing(0, 1),
    },
  },
}));
