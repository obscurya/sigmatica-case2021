import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authUser } from '../../redux/actions';
import { TextField, Button, Typography } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { useStyles } from './Auth.style';

export const Auth = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();

  const [authData, setAuthData] = useState({
    email: {
      value: 'ivanov.ivan@rosatom.ru',
      error: '',
    },
    password: {
      value: 'qwerty1',
      error: '',
    },
  });

  const handleAuthData = e => {
    const key = e.target.name;
    setAuthData({ ...authData, [key]: { ...authData[key], value: e.target.value } });
  };

  const auth = () => {
    const result = dispatch(authUser(authData));

    if (result) {
      setAuthData(result);
    }
  };

  return appState.data ? (
    <div className={classes.root}>
      <TextField
        className={classes.input}
        name="email"
        label="Электронная почта"
        value={authData.email.value}
        error={Boolean(authData.email.error)}
        helperText={authData.email.error}
        onChange={e => handleAuthData(e)}
      />
      <br />
      <TextField
        className={classes.input}
        name="password"
        label="Пароль"
        type="password"
        value={authData.password.value}
        error={Boolean(authData.password.error)}
        helperText={authData.password.error}
        onChange={e => handleAuthData(e)}
      />
      <br />
      <Button className={classes.button} variant="contained" color="primary" disableElevation onClick={() => auth()}>
        Войти
      </Button>
      <br />
      <Alert className={classes.alert} severity="info" variant="outlined">
        <Typography variant="body2" gutterBottom>
          Корректная почта и пароль уже введены в форму, но на всякий случай продублируем:
        </Typography>
        <Typography variant="subtitle2">
          ivanov.ivan@rosatom.ru
          <br />
          qwerty1
        </Typography>
      </Alert>
    </div>
  ) : null;
};
