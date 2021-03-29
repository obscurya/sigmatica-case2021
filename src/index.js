import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, compose, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { HashRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/core/styles';
import { theme } from './theme';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { rootReducer } from './redux/rootReducer';
import { App } from './components/App/App';
import './index.css';

const store = createStore(rootReducer, compose(applyMiddleware(thunk)));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter basename="/">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App />
      </ThemeProvider>
    </HashRouter>
  </Provider>,
  document.getElementById('root')
);
