import React, { useContext } from 'react';
import { AppBar as MuiAppBar, Toolbar } from '@material-ui/core';
import AuthenticatedNav from './AuthenticatedNav';
import UnauthenticatedNav from './UnauthenticatedNav';
import { AuthUserContext } from '../AuthUser';

function AppBar() {
  const authUser = useContext(AuthUserContext);
  return (
    <MuiAppBar position="static" color="secondary">
      <Toolbar css={{ color: 'red' }}>
        {authUser ? <AuthenticatedNav /> : <UnauthenticatedNav />}
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
