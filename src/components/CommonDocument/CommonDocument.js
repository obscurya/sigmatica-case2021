import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Typography } from '@material-ui/core';
import { useStyles } from './CommonDocument.style';
import { findCommonDocumentById } from '../../redux/actions';

export const CommonDocument = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();
  const params = useParams();
  const [document, setDocument] = useState(null);

  useEffect(() => {
    if (appState.data && (!document || document.id !== params.documentId)) {
      setDocument(dispatch(findCommonDocumentById(params.documentId)));
    }
  }, [appState.data, document, params.documentId, dispatch]);

  return document ? (
    <div className={classes.root}>
      <Typography gutterBottom variant="h6">
        {document.name}
      </Typography>
      {document.text.split('\n').map((paragraph, index) => (
        <Typography key={index} variant="body2" gutterBottom>
          {paragraph}
        </Typography>
      ))}
    </div>
  ) : null;
};
