import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { hideGuideDialog, showGuide } from '../../redux/actions';

export const GuideDialog = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);

  const handleClose = () => {
    dispatch(hideGuideDialog());
  };

  return (
    <Dialog open={appState.showGuideDialog} onClose={handleClose}>
      <DialogTitle>Здравствуйте, {appState.user.name.split(' ')[1]}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Желаете пройти обучение и узнать о функционале приложения?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            handleClose();
            dispatch(showGuide());
          }}
          color="primary"
        >
          Да
        </Button>
        <Button onClick={handleClose} color="secondary">
          Нет
        </Button>
      </DialogActions>
    </Dialog>
  );
};
