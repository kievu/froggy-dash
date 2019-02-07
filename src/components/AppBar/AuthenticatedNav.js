import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function AuthenticatedNav() {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Button
          to="/signout"
          color="primary"
          variant="contained"
          component={Link}
          style={{ height: '40px', minWidth: '130px' }}
        >
          Logout
        </Button>
      </Grid>
    </Grid>
  );
}

export default AuthenticatedNav;
