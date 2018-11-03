import React from 'react';
import ReactDOM from 'react-dom';
import App from './components';
import * as serviceWorker from './serviceWorker';
import { BrowserRouter } from 'react-router-dom'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import './index.css';

const theme = createMuiTheme({
  typography : {
    useNextVariants: true,
  },
});

ReactDOM.render(
  <MuiThemeProvider theme={theme}>
    <BrowserRouter>
      <App/>
    </BrowserRouter>
  </MuiThemeProvider>,
  document.getElementById('root')
);

serviceWorker.unregister();
