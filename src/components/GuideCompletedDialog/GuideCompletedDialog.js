import { useDispatch, useSelector } from 'react-redux';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@material-ui/core';
import { setGuideNotCompleted } from '../../redux/actions';

export const GuideCompletedDialog = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);

  const handleClose = () => {
    dispatch(setGuideNotCompleted());
  };

  return (
    <Dialog open={appState.guideCompleted} onClose={handleClose}>
      <DialogTitle>Поздравляем с окончанием обучения!</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">Теперь вы квалифицированный пользователь.</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Здорово!
        </Button>
      </DialogActions>
    </Dialog>
  );
};
