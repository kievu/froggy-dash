import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';

import './index.css';
import { theme } from './styles';
import Home from './pages/home';
import * as serviceWorker from './serviceWorker';

const Router = () => (
  <BrowserRouter>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
      </ul>

      <hr />

      <Route exact path="/" component={Home} />
    </div>
  </BrowserRouter>
);

const App = () => {
  return (
    <MuiThemeProvider theme={theme}>
      <Router />
    </MuiThemeProvider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
