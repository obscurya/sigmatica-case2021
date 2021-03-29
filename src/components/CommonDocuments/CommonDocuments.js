import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useStyles } from './CommonDocuments.style';

export const CommonDocuments = () => {
  const appState = useSelector(state => state.app);
  const classes = useStyles();

  return appState.data ? (
    <div className={classes.root}>
      {appState.data.commonDocuments.map(document => (
        <Link key={document.id} className={classes.link} to={`/common-documents/${document.id}`}>
          {document.name}
        </Link>
      ))}
    </div>
  ) : null;
};
