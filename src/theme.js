import { red } from '@material-ui/core/colors';
import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#7e57c2',
    },
    secondary: {
      main: '#ef5350',
    },
    error: {
      main: red.A400,
    },
    background: {
      default: '#fff',
    },
  },
});
