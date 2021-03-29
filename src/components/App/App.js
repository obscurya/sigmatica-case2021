import { useEffect, useState } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authUser, fetchData } from '../../redux/actions';
import { Container } from '@material-ui/core';
import { useStyles } from './App.style';
import { LeftDrawer } from '../LeftDrawer/LeftDrawer';
import { Header } from '../Header/Header';
import { ProcessList } from '../ProcessList/ProcessList';
import { Profile } from '../Profile/Profile';
import { Process } from '../Process/Process';
import { Employees } from '../Employees/Employees';
import { Auth } from '../Auth/Auth';
import { Schedule } from '../Schedule/Schedule';
import { Specialty } from '../Specialty/Specialty';
import { CommonDocuments } from '../CommonDocuments/CommonDocuments';
import { CommonDocument } from '../CommonDocument/CommonDocument';

export const App = () => {
  const dispatch = useDispatch();
  const appState = useSelector(state => state.app);
  const classes = useStyles();

  const [drawerOpened, setDrawerOpened] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpened(!drawerOpened);
  };

  useEffect(() => {
    if (!appState.data) {
      dispatch(fetchData());
    } else if (!appState.user) {
      dispatch(authUser());
    }
  });

  return (
    <Container className={classes.root} fixed disableGutters>
      <LeftDrawer drawerOpened={drawerOpened} toggleDrawer={toggleDrawer} />
      <Header toggleDrawer={toggleDrawer} />
      <div className={classes.toolbar} />
      {appState.user ? (
        <Switch>
          <Route exact path="/">
            <Redirect to={`/schedule/${appState.user.id}`} />
          </Route>
          <Route exact path={'/profile/:employeeId'}>
            <Profile />
          </Route>
          <Route exact path={'/schedule/:employeeId'}>
            <Schedule />
          </Route>
          <Route exact path={'/process-list'}>
            <ProcessList />
          </Route>
          <Route exact path={'/process-list/:processId'}>
            <Process />
          </Route>
          <Route exact path={'/employees'}>
            <Employees />
          </Route>
          <Route exact path={'/common-documents'}>
            <CommonDocuments />
          </Route>
          <Route exact path={'/common-documents/:documentId'}>
            <CommonDocument />
          </Route>
          <Route exact path={'/specialties/:specialtyId'}>
            <Specialty />
          </Route>
        </Switch>
      ) : (
        <Auth />
      )}
    </Container>
  );
};
