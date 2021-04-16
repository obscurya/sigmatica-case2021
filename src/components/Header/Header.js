import { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Avatar } from '@material-ui/core';
import { Menu as MenuIcon, AccountCircle } from '@material-ui/icons';
import { useDispatch, useSelector } from 'react-redux';
import { useStyles } from './Header.style';
import { findEmployeeById } from '../../redux/actions';
import { Tooltip } from '../Tooltip/Tooltip';

export const Header = ({ toggleDrawer }) => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const location = useLocation();
  const [employeeAsUser, setEmployeeAsUser] = useState(null);

  const page = appState.pages.filter(page => location.pathname.split('/').indexOf(page.link) !== -1)[0];

  useEffect(() => {
    if (appState.data && appState.user && (!employeeAsUser || employeeAsUser.id !== appState.user)) {
      setEmployeeAsUser(dispatch(findEmployeeById(appState.user.id)));
    } else {
      setEmployeeAsUser(null);
    }
  }, [appState.data, appState.user, employeeAsUser, dispatch]);

  return (
    <AppBar position="fixed" elevation={0}>
      <Toolbar variant="dense">
        <Tooltip guideStepIndex={0} placement="bottom">
          <IconButton edge="start" className={classes.menuButton} color="inherit" onClick={() => toggleDrawer(true)}>
            <MenuIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="body1" className={classes.title}>
          {employeeAsUser ? (page ? page.title : 'Not Found') : 'Авторизация'}
        </Typography>
        {employeeAsUser ? (
          <Tooltip guideStepIndex={4} placement="bottom">
            <IconButton color="inherit" edge="end" component={Link} to={`/profile/${employeeAsUser.id}`}>
              <Avatar className={classes.avatar} src={employeeAsUser.image} />
            </IconButton>
          </Tooltip>
        ) : (
          <IconButton color="inherit" edge="end">
            <AccountCircle />
          </IconButton>
        )}
      </Toolbar>
    </AppBar>
  );
};
