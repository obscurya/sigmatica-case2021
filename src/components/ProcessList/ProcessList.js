import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Collapse, List, ListItem, ListItemText, IconButton } from '@material-ui/core';
import { ExpandLess, ExpandMore } from '@material-ui/icons';
import { useStyles } from './ProcessList.style';
import { toggleProcessOpened } from '../../redux/actions';

export const ProcessList = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();

  const renderNestedList = process => {
    return (
      <React.Fragment key={process.id}>
        <ListItem component={Link} to={`/process-list/${process.id}`}>
          <ListItemText primary={process.name} secondary={process.description} />
          {process.subprocesses && (
            <IconButton
              onClick={e => {
                e.preventDefault();
                dispatch(toggleProcessOpened(process.id));
              }}
            >
              {process.opened ? <ExpandLess /> : <ExpandMore />}
            </IconButton>
          )}
        </ListItem>
        {process.subprocesses && (
          <Collapse in={process.opened} timeout="auto" unmountOnExit>
            <List className={classes.nestedList} disablePadding dense>
              {process.subprocesses.map(subprocess => renderNestedList(subprocess))}
            </List>
          </Collapse>
        )}
      </React.Fragment>
    );
  };

  return appState.techProcess ? (
    <List disablePadding dense>
      {renderNestedList(appState.techProcess)}
    </List>
  ) : null;
};
