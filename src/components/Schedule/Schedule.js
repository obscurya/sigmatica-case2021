import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { createScheduleByEmployeeId } from '../../redux/actions';
import { MobileStepper, IconButton, Typography, Paper, Chip, Avatar } from '@material-ui/core';
import { KeyboardArrowRight, KeyboardArrowLeft } from '@material-ui/icons';
import { useStyles } from './Schedule.style';
import { setDay } from 'date-fns';
import SwipeableViews from 'react-swipeable-views';
import { Tooltip } from '../Tooltip/Tooltip';

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

  const formatName = fullName => {
    const parts = fullName.split(' ');
    return `${parts[0]} ${parts[1][0]}.${parts[2][0]}.`;
  };

  useEffect(() => {
    if (appState.data && (!schedule || schedule.employee.id !== params.employeeId)) {
      setSchedule(dispatch(createScheduleByEmployeeId(params.employeeId)));
    }
  }, [appState.data, schedule, params.employeeId, dispatch]);

  return schedule ? (
    <div className={classes.root}>
      <div className={classes.schedule}>
        <Typography className={classes.scheduleTitle} variant="body2" color="textSecondary">
          {schedule.employee.id === appState.user.id
            ? 'Мое расписание'
            : `Расписание сотрудника ${formatName(schedule.employee.name)}`}
        </Typography>
        <SwipeableViews index={activeStep} onChangeIndex={step => setActiveStep(step)} enableMouseEvents resistance>
          {days.map((day, stepIndex) => (
            <div key={day} className={classes.scheduleDay}>
              <div className={classes.scheduleHeader}>
                <Typography className={classes.day} variant="body1">
                  {day}
                </Typography>
                <Chip className={classes.chip} label={formatDate(stepIndex + 1)} size="small" />
              </div>
              {schedule.days[stepIndex].processes.length ? (
                Object.keys(schedule.days[stepIndex]).map(
                  (item, index) =>
                    Boolean(schedule.days[stepIndex][item].length) && (
                      <React.Fragment key={index}>
                        {index > 0 &&
                          (index === 1 ? (
                            <Typography className={classes.subtitle} variant="body2" color="textSecondary">
                              Расписание сотрудников, от которых исходят ресурсы
                            </Typography>
                          ) : (
                            <Typography className={classes.subtitle} variant="body2" color="textSecondary">
                              Расписание сотрудников, которым поступают продукты
                            </Typography>
                          ))}
                        {schedule.days[stepIndex][item].map((process, processIndex) =>
                          stepIndex === 0 && index === 0 && processIndex === 0 ? (
                            <Tooltip key={process.id} guideStepIndex={2} placement="bottom">
                              <Paper className={classes.process} variant="outlined">
                                <div className={classes.processLeft}>
                                  <Typography
                                    className={classes.link}
                                    variant="body1"
                                    gutterBottom
                                    component={Link}
                                    to={`/process-list/${process.id}`}
                                  >
                                    {process.name}
                                  </Typography>
                                  <Typography variant="body2">
                                    {process.schedule.timeStart} &mdash; {process.schedule.timeEnd}
                                  </Typography>
                                </div>
                                <div>
                                  <Avatar className={classes.processAvatar} src={process.employees[0].image} />
                                </div>
                              </Paper>
                            </Tooltip>
                          ) : (
                            <Paper key={process.id} className={classes.process} variant="outlined">
                              <div className={classes.processLeft}>
                                <Typography
                                  className={classes.link}
                                  variant="body1"
                                  gutterBottom
                                  component={Link}
                                  to={`/process-list/${process.id}`}
                                >
                                  {process.name}
                                </Typography>
                                <Typography variant="body2">
                                  {process.schedule.timeStart} &mdash; {process.schedule.timeEnd}
                                </Typography>
                              </div>
                              <div>
                                <Avatar className={classes.processAvatar} src={process.employees[0].image} />
                              </div>
                            </Paper>
                          )
                        )}
                      </React.Fragment>
                    )
                )
              ) : (
                <Typography className={classes.dayOff} variant="body2" align="center">
                  Работы нет, можно отдохнуть! &#128525;
                </Typography>
              )}
            </div>
          ))}
        </SwipeableViews>
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
