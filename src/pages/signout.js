import { useEffect, useContext } from 'react';
import { withRouter } from 'react-router';

import { FirebaseContext } from '../Firebase';

const Signout = ({ history }) => {
  const firebase = useContext(FirebaseContext);

  useEffect(() => {
    firebase.doSignOut();
    setTimeout(() => history.push('/'), 2000);
  });
  return null;
};

export default withRouter(Signout);
