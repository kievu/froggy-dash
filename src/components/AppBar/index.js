import React, { useState } from 'react';
import {
  AppBar as MuiAppBar,
  Drawer,
  Grid,
  Hidden,
  List,
  IconButton,
  Toolbar,
  Button,
} from '@material-ui/core';
import { Menu } from '@material-ui/icons';
import { withTheme } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';

function AppBar({ theme }) {
  const [isDrawerOpen, toggleDrawer] = useState(false);

  return (
    <MuiAppBar position="static" color="secondary">
      <Toolbar css={{ color: 'red' }}>
        <Grid container justify="flex-end">
          <Hidden xsDown>
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
          </Hidden>
          <Hidden smUp>
            <IconButton onClick={() => toggleDrawer(!isDrawerOpen)}>
              <Menu />
            </IconButton>
            <Drawer
              elevation={0}
              ModalProps={{
                BackdropProps: {
                  style: {
                    marginTop: theme.mixins.toolbar.minHeight,
                  },
                },
              }}
              PaperProps={{
                style: {
                  marginTop: theme.mixins.toolbar.minHeight,
                },
              }}
              style={{
                marginTop: theme.mixins.toolbar.minHeight,
              }}
              anchor="top"
              open={isDrawerOpen}
              onClose={() => toggleDrawer(false)}
            >
              <List>
                <Link to="/login">Login</Link>
              </List>
            </Drawer>
          </Hidden>
        </Grid>
      </Toolbar>
    </MuiAppBar>
  );
}

export default withTheme()(AppBar);
