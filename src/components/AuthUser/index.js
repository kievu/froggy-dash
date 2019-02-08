import React, { useState, useEffect } from 'react';
import lscache from 'lscache';
import mitt from 'mitt';
import { withFirebase } from '../../Firebase';

const emitter = new mitt();

const KEY = 'session';

// Number of minutes the tokens lives
const TTL = 30;

/**
 * Every time we access the token, we reset the TTL
 */
export const getSessionToken = () => {
  const token = lscache.get(KEY);

  if (token != null) {
    setSessionToken(token);
  }
  return token;
};

export const setSessionToken = (token: string, emitEvent: boolean = false) => {
  lscache.set(KEY, token, TTL);
  if (emitEvent) {
    emitter.emit('login');
  }
};

export function clearSessionToken() {
  lscache.remove(KEY);
  emitter.emit('signout');
}

export function subscribe(eventType: 'login' | 'signout', handler: () => void) {
  emitter.on(eventType, handler);
}

export const AuthUserContext = React.createContext(null);

function AuthUserProvider({ children, firebase }) {
  const [hasToken, setUser] = useState(Boolean(getSessionToken()));

  const stateFromStorage = () => {
    const cacheToken = Boolean(getSessionToken());
    // Don't do the set state if the value hasn't changed. Prevents rerendering
    if (hasToken !== cacheToken) {
      setUser(hasToken);
    }
  };

  useEffect(() => {
    stateFromStorage();
    const firesub = firebase.auth.onAuthStateChanged(user => {
      setSessionToken('yes');
      setUser(!!user);
    });
    return () => firesub();
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={hasToken}>
      {children}
    </AuthUserContext.Provider>
  );
}

export default withFirebase(AuthUserProvider);
