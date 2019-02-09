import React, { useState, useContext } from 'react';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';
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

function SignUp({ history }) {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const [error, setError] = useState(null);

  const firebase = useContext(FirebaseContext);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      await firebase.doCreateUserWithEmailAndPassword(email, passwordOne);
      history.push('/dashboard');
    } catch (error) {
      setError(error);
    }
  };

  const isInvalid = passwordOne !== passwordTwo;

  return (
    <Layout>
      <Center>
        <Card style={{ width: 400 }}>
          <Padding>
            <CardHeader title="Sign up" />
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
                />
                <TextField
                  fullWidth
                  title="Password"
                  type="password"
                  placeholder="Password"
                  margin="normal"
                  onChange={event => setPasswordOne(event.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  title="Repeat password"
                  type="password"
                  placeholder="Repeat password"
                  margin="normal"
                  onChange={event => setPasswordTwo(event.target.value)}
                  variant="outlined"
                />
                <Button
                  type="submit"
                  disabled={isInvalid}
                  variant="contained"
                  color="primary"
                >
                  Submit
                </Button>
                {error && (
                  <Typography color="error">{error.message}</Typography>
                )}
              </form>
            </CardContent>
          </Padding>
        </Card>
        <Typography variant="subtitle1" style={{ marginTop: 30 }}>
          Remember your account? <Link to="/">Go to login</Link>
        </Typography>
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

export default withRouter(SignUp);
