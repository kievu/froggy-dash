import React from 'react';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import config from './config';

export const FirebaseContext = React.createContext(null);

class Firebase {
  constructor() {
    app.initializeApp(config);
    this.auth = app.auth();
    this.db = app.database();
  }

  // *** Auth API ***

  doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password => this.auth.currentUser.updatePassword(password);

  // *** Sensors, rooms and buildings API ***

  sensor = id => this.db.ref(`sensors/${id}`);

  sensors = () => this.db.ref('sensors');

  measurement = id => this.db.ref(`measurements/${id}`);

  measurements = () => this.db.ref('measurements');

  building = id => this.db.ref(`buildings/${id}`);

  buildings = () => this.db.ref('buildings');

  room = id => this.db.ref(`rooms/${id}`);

  rooms = () => this.db.ref('rooms');

  setSensorIsIdentifying = (id, isIdentifying) =>
    this.db.ref(`sensors/${id}/isIdentifying`).set(isIdentifying);

  setSensorName = (id, name) => this.db.ref(`sensors/${id}/name`).set(name);
}

export const withFirebase = Component => props => (
  <FirebaseContext.Consumer>
    {firebase => <Component {...props} firebase={firebase} />}
  </FirebaseContext.Consumer>
);

export default Firebase;
