import { useEffect, useContext } from 'react';
import { withRouter } from 'react-router';
import { clearSessionToken } from '../components/AuthUser';

import { FirebaseContext } from '../Firebase';

function Signout({ history }) {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.doSignOut();
    clearSessionToken();
    const timer = setTimeout(() => history.push('/'), 2000);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

export default withRouter(Signout);
