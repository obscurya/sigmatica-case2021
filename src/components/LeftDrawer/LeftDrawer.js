import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Typography, Drawer, List, ListItem, ListItemText, Divider, IconButton } from '@material-ui/core';
import { Close } from '@material-ui/icons';
import { useStyles } from './LeftDrawer.style';
import { Tooltip } from '../Tooltip/Tooltip';

export const LeftDrawer = ({ drawerOpened, toggleDrawer }) => {
  const appState = useSelector(state => state.app);
  const classes = useStyles();

  return (
    <Drawer anchor="left" open={drawerOpened} onClose={toggleDrawer}>
      <div>
        <div className={classes.titleContainer}>
          <Typography className={classes.title} variant="h6">
            ГК Росатом
          </Typography>
          <IconButton size="small" onClick={toggleDrawer}>
            <Close />
          </IconButton>
        </div>
        <Divider />
        {appState.user ? (
          <List>
            {appState.pages.slice(0, 5).map((page, index) => {
              const to = page.link === 'schedule' ? `/${page.link}/${appState.user.id}` : `/${page.link}`;
              return index === 0 ? (
                <Tooltip key={index} guideStepIndex={1} placement="bottom">
                  <ListItem button component={Link} to={to} onClick={toggleDrawer} style={{ position: 'relative' }}>
                    <ListItemText primary={page.title} />
                  </ListItem>
                </Tooltip>
              ) : (
                <ListItem key={index} button component={Link} to={to} onClick={toggleDrawer}>
                  <ListItemText primary={page.title} />
                </ListItem>
              );
            })}
          </List>
        ) : (
          <Typography className={classes.message} variant="body2">
            Авторизуйтесь для просмотра контента
          </Typography>
        )}
        <Divider />
        <div className={classes.message}>
          <Typography variant="body2" color="textSecondary">
            Демонстрационный прототип приложения, разработанного для чемпионата CASE-IN 2021 (полуфинал), направление
            Цифровой Атом.
            <br />
            <br />
            Авторы: команда Сигматика, кафедра Информационных технологий ИГЭУ.
          </Typography>
        </div>
      </div>
    </Drawer>
  );
};
