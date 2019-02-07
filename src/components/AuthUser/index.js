import React, { useState, useEffect } from 'react';

import { withFirebase } from '../../Firebase';

export const AuthUserContext = React.createContext(null);

const AuthUserProvider = ({ children, firebase }) => {
  const [authUser, setUser] = useState(null);
  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(
      user => user && setUser(user),
    );
    return unsubscribe;
  }, [firebase.auth]);

  return (
    <AuthUserContext.Provider value={authUser}>
      {children}
    </AuthUserContext.Provider>
  );
};

export default withFirebase(AuthUserProvider);
