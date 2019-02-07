import React from 'react';
import { Grid, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';

function UnathenticatedNav() {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Button
          to="/signup"
          color="primary"
          component={Link}
          style={{ height: '40px', minWidth: '120px', marginRight: 10 }}
        >
          Sign up
        </Button>

        <Button
          to="/login"
          color="primary"
          component={Link}
          variant="contained"
          style={{ height: '40px', minWidth: '130px' }}
        >
          Login
        </Button>
      </Grid>
    </Grid>
  );
}

export default UnathenticatedNav;
