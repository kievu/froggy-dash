import { useState, useEffect, useContext } from 'react';

import FirebaseContext from '../Firebase';

const userAuth = auth => {
  const [authState, setState] = useState({
    isLoading: true,
    user: null,
  });

  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    const unsubscribe = firebase.auth.onAuthStateChanged(authState =>
      setState({ isLoading: false, user: authState }),
    );
    return unsubscribe;
  }, [auth]);
  return authState;
};

export default userAuth;
