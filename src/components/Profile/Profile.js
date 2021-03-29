import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardActions, Typography, CardMedia, IconButton, Collapse, Button } from '@material-ui/core';
import { AlternateEmailOutlined, Phone, ExpandMore, ExpandLess } from '@material-ui/icons';
import { authUser, getAllEmployeeDataById } from '../../redux/actions';
import { useStyles } from './Profile.style';

export const Profile = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const params = useParams();
  const classes = useStyles();
  const [employee, setEmployee] = useState(null);
  const [processesOpened, setProcessesOpened] = useState(false);

  const toggleProcessesOpened = () => {
    setProcessesOpened(!processesOpened);
  };

  const formatPhone = phone => {
    return `${phone[0]} (${phone.slice(1, 4)}) ${phone.slice(4, 7)}-${phone.slice(7, 9)}-${phone.slice(9)}`;
  };

  useEffect(() => {
    if (appState.data && (!employee || employee.id !== params.employeeId)) {
      setEmployee(dispatch(getAllEmployeeDataById(params.employeeId)));
    }
  }, [appState.data, employee, params.employeeId, dispatch]);

  return employee ? (
    <div className={classes.root}>
      {appState.user.id === employee.id && (
        <Button
          className={classes.button}
          variant="outlined"
          color="primary"
          component="div"
          disableElevation
          fullWidth
          onClick={() => dispatch(authUser('logout'))}
        >
          Выйти из аккаунта
        </Button>
      )}
      <Card className={classes.card}>
        <CardMedia className={classes.media} image={employee.image} />
        <CardContent>
          <Typography gutterBottom variant="h6">
            {employee.name}
          </Typography>
          <Typography
            className={classes.linkSpecialty}
            variant="body2"
            color="textSecondary"
            component={Link}
            to={`/specialties/${employee.specialty.id}`}
            gutterBottom
          >
            {employee.specialty.name}
          </Typography>
          <div className={classes.contacts}>
            <Typography className={classes.contact} variant="body2" color="textSecondary" gutterBottom>
              <AlternateEmailOutlined fontSize="small" />
              <span>{employee.contacts.email}</span>
            </Typography>
            <Typography className={classes.contact} variant="body2" color="textSecondary">
              <Phone fontSize="small" />
              <span>{formatPhone(employee.contacts.phone)}</span>
            </Typography>
          </div>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="body2">Технологические процессы</Typography>
          <IconButton className={classes.expandButton} onClick={toggleProcessesOpened}>
            {processesOpened ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardActions>
        <Collapse in={processesOpened} timeout="auto" unmountOnExit>
          <CardContent>
            {employee.processes.map(process => (
              <Typography
                key={process.id}
                className={classes.linkSpecialty}
                variant="body2"
                color="textSecondary"
                component={Link}
                to={`/process-list/${process.id}`}
                gutterBottom
              >
                {process.name}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  ) : null;
};
