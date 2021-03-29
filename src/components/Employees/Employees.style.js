import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(1, 2),
  },
  tablePaper: {
    marginBottom: theme.spacing(2),
  },
  tableBody: {
    '& > tr:last-child > *': {
      borderBottom: 'none',
    },
  },
  link: {
    textDecoration: 'none',
    color: `${theme.palette.primary.main} !important`,
  },
  employee: {
    display: 'flex',
    alignItems: 'center',
    '& > *:last-child': {
      width: '100%',
      marginLeft: theme.spacing(2),
    },
  },
}));
