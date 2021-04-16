import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Tooltip as MaterialTooltip, Typography } from '@material-ui/core';
import { useStyles } from './Tooltip.style';
import { nextGuideStep } from '../../redux/actions';

export const Tooltip = ({ guideStepIndex, placement, children }) => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const [guideStep, setGuideStep] = useState(null);

  useEffect(() => {
    if (appState.data && appState.showGuide && guideStepIndex === appState.guideStepIndex) {
      setTimeout(() => setGuideStep(appState.guide[guideStepIndex]), 225);
    } else {
      setGuideStep(null);
    }
  }, [appState.data, appState.showGuide, appState.guideStepIndex, appState.guide, guideStepIndex]);

  return guideStep ? (
    <MaterialTooltip
      classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      title={
        <>
          <Typography variant="body2" gutterBottom>
            {guideStep[0]}
          </Typography>
          <Typography variant="body2" gutterBottom>
            Нажмите на {guideStep[1]} чтобы продолжить.
          </Typography>
          <Typography className={classes.step} variant="body2" align="right">
            Шаг {guideStepIndex + 1} / {appState.guide.length}
          </Typography>
        </>
      }
      arrow
      placement={placement}
      open={true}
      children={React.cloneElement(children, {
        onClick: () => {
          if (children.props.onClick) {
            children.props.onClick();
          }

          dispatch(nextGuideStep());
        },
      })}
    />
  ) : (
    children
  );
};
