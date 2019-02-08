import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import {
  Button,
  Card,
  CardHeader,
  CardContent,
  TextField as Field,
  Typography,
} from '@material-ui/core';
import { Layout, Center, Padding } from '../elements';
import { FirebaseContext } from '../Firebase';

function Login({ history }) {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');

  const firebase = useContext(FirebaseContext);
  const [error, setError] = useState(null);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await firebase.doSignInWithEmailAndPassword(email, passwordOne);
      history.push('/dashboard');
    } catch (error) {
      setError(error);
    }
  };

  return (
    <Layout>
      <Center>
        <Card style={{ width: 400 }}>
          <Padding>
            <CardHeader title="Login" />
            <CardContent>
              <form
                onSubmit={onSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}
              >
                <TextField
                  fullWidth
                  title="Email"
                  type="text"
                  placeholder="Your email"
                  margin="normal"
                  onChange={event => setEmail(event.target.value)}
                  variant="outlined"
                  data-cypress="email-input"
                />

                <TextField
                  fullWidth
                  title="Password"
                  type="password"
                  placeholder="Password"
                  margin="normal"
                  onChange={event => setPasswordOne(event.target.value)}
                  variant="outlined"
                  data-cypress="password-input"
                />

                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  data-cypress="login-button"
                >
                  Login
                </Button>
                {error && (
                  <Typography color="error">{error.message}</Typography>
                )}
              </form>
            </CardContent>
          </Padding>
        </Card>
      </Center>
    </Layout>
  );
}

const TextField = ({ title, ...rest }) => (
  <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 20 }}>
    <Typography color="primary">{title}</Typography>
    <Field {...rest} />
  </div>
);

export default withRouter(Login);
