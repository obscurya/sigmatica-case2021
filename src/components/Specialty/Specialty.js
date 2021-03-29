import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { findSpecialtyById } from '../../redux/actions';
import { IconButton, Typography, Card, CardContent, CardActions, Collapse } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useStyles } from './Specialty.style';

export const Specialty = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const params = useParams();

  const [specialty, setSpecialty] = useState(null);
  const [instructionOpened, setInstructionOpened] = useState(false);

  const toggleInstructionOpened = () => {
    setInstructionOpened(!instructionOpened);
  };

  useEffect(() => {
    if (appState.data && (!specialty || specialty.id !== params.specialtyId)) {
      setSpecialty(dispatch(findSpecialtyById(params.specialtyId)));
    }
  }, [appState.data, specialty, params.specialtyId, dispatch]);

  return specialty ? (
    <div className={classes.root}>
      <Card className={classes.card}>
        <CardContent>
          <Typography gutterBottom variant="h6">
            {specialty.name}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {specialty.description}
          </Typography>
        </CardContent>
        <CardActions className={classes.cardActions}>
          <Typography variant="body2">Должностная инструкция</Typography>
          <IconButton className={classes.expandButton} onClick={toggleInstructionOpened}>
            {instructionOpened ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </CardActions>
        <Collapse in={instructionOpened} timeout="auto" unmountOnExit>
          <CardContent>
            {specialty.instruction.split('\n').map((paragraph, index) => (
              <Typography key={index} variant="body2" gutterBottom>
                {paragraph}
              </Typography>
            ))}
          </CardContent>
        </Collapse>
      </Card>
    </div>
  ) : null;
};
