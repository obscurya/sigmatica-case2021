import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardContent, CardActions, Typography, IconButton, Collapse, Button, Avatar } from '@material-ui/core';
import { Phone, ExpandMore, ExpandLess, MailOutline, Schedule } from '@material-ui/icons';
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
      <div className={classes.profileImage}>
        <Avatar className={classes.avatar} src={employee.image} />
        <div className={classes.buttons}>
          <IconButton component="a" href={`mailto:${employee.contacts.email}`} style={{ background: '#42a5f5' }}>
            <MailOutline />
          </IconButton>
          <IconButton component="a" href={`tel:${employee.contacts.phone}`} style={{ background: '#66bb6a' }}>
            <Phone />
          </IconButton>
          <IconButton component={Link} to={`/schedule/${employee.id}`} style={{ background: '#ffa726' }}>
            <Schedule />
          </IconButton>
        </div>
      </div>
      <Card className={classes.card} variant="outlined">
        <CardContent>
          <Typography className={classes.name} variant="h6">
            {employee.name}
          </Typography>
          <Typography
            className={classes.linkSpecialty}
            variant="body2"
            component={Link}
            to={`/specialties/${employee.specialty.id}`}
          >
            {employee.specialty.name}
          </Typography>
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
