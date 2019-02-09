import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import { MuiThemeProvider } from '@material-ui/core/styles';
import WebFont from 'webfontloader';

import './index.css';
import { theme } from './styles';
import Home from './pages/home';
import Login from './pages/login';
import SignUp from './pages/signup';
import SignOut from './pages/signout';
import Rooms from './pages/rooms';
import Sensors from './pages/sensors';
import Buildings from './pages/buildings';
import Dashboard from './pages/dashboard';

import Room from './components/Room';
import Building from './components/Building';
import Sensor from './components/Sensor';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './Firebase';
import AuthUserProvider, { AuthUserContext } from './components/AuthUser';

WebFont.load({
  google: {
    families: ['Hind:300,400,500,600,700'],
  },
});

const Router = () => (
  <BrowserRouter>
    <>
      <Route exact path="/" component={Login} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signout" component={SignOut} />
      <PrivateRoute path="/dashboard" component={Dashboard} />
      <Route path="/sensors" component={Sensors} />
      <Route path="/sensors/:id" component={Sensor} />
      <Route path="/buildings" component={Buildings} />
      <Route path="/buildings/:id" component={Building} />
      <Route path="/rooms" component={Rooms} />
      <Route path="/rooms/:id" component={Room} />
    </>
  </BrowserRouter>
);

const PrivateRoute = ({ component: Component, ...rest }) => (
  <AuthUserContext.Consumer>
    {hasToken => (
      <>
        <Route
          {...rest}
          render={props =>
            hasToken ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{
                  pathname: '/login',
                  state: { from: props.location },
                }}
              />
            )
          }
        />
      </>
    )}
  </AuthUserContext.Consumer>
);

const App = () => {
  return (
    <FirebaseContext.Provider value={new Firebase()}>
      <AuthUserProvider>
        <MuiThemeProvider theme={theme}>
          <Router />
        </MuiThemeProvider>
      </AuthUserProvider>
    </FirebaseContext.Provider>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
