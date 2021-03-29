import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createScheduleByEmployeeId } from '../../redux/actions';
import { MobileStepper, IconButton, Typography, Paper, Chip } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import { useStyles } from './Schedule.style';
import { setDay } from 'date-fns';

export const Schedule = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const params = useParams();

  const [schedule, setSchedule] = useState(null);
  const [activeStep, setActiveStep] = useState(0);
  const days = ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница'];

  const toggleDay = value => {
    setActiveStep(activeStep + value);
  };

  const formatDate = day => {
    const date = setDay(new Date(), day);
    return `${('0' + date.getDate()).slice(-2)}.${('0' + (date.getMonth() + 1)).slice(-2)}`;
  };

  useEffect(() => {
    if (appState.data && (!schedule || schedule.employeeId !== params.employeeId)) {
      setSchedule(dispatch(createScheduleByEmployeeId(params.employeeId)));
    }
  }, [appState.data, schedule, params.employeeId, dispatch]);

  return schedule ? (
    <div className={classes.root}>
      <div className={classes.schedule}>
        <div className={classes.scheduleHeader}>
          <Typography className={classes.day} variant="body1">
            {days[activeStep]}
          </Typography>
          <Chip className={classes.chip} label={formatDate(activeStep + 1)} size="small" />
        </div>
        {schedule.days[activeStep].length ? (
          schedule.days[activeStep].map(process => (
            <Paper key={process.id} className={classes.process} variant="outlined">
              <Typography className={classes.link} variant="body1" component={Link} to={`/process-list/${process.id}`}>
                {process.name}
              </Typography>
              <Typography variant="body2">
                {process.schedule.timeStart} &mdash; {process.schedule.timeEnd}
              </Typography>
            </Paper>
          ))
        ) : (
          <Typography className={classes.dayOff} variant="body2" align="center">
            Работы нет, можно отдохнуть! &#128525;
          </Typography>
        )}
        <MobileStepper
          steps={schedule.days.length}
          position="bottom"
          variant="dots"
          activeStep={activeStep}
          nextButton={
            <IconButton disabled={activeStep === schedule.days.length - 1} onClick={() => toggleDay(1)}>
              <KeyboardArrowRight />
            </IconButton>
          }
          backButton={
            <IconButton disabled={activeStep === 0} onClick={() => toggleDay(-1)}>
              <KeyboardArrowLeft />
            </IconButton>
          }
        />
      </div>
    </div>
  ) : null;
};
