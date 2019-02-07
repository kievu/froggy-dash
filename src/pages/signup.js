import React, { useState, useContext } from 'react';
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

function SignUp() {
  const [email, setEmail] = useState('');
  const [passwordOne, setPasswordOne] = useState('');
  const [passwordTwo, setPasswordTwo] = useState('');

  const [error, setError] = useState(null);

  const firebase = useContext(FirebaseContext);

  const onSubmit = async event => {
    event.preventDefault();
    try {
      const user = await firebase.doCreateUserWithEmailAndPassword(
        email,
        passwordOne,
      );
      console.log(user);
    } catch (error) {
      setError(error);
    }
  };

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
                  placeholder="Password"
                  margin="normal"
                  onChange={event => setPasswordOne(event.target.value)}
                  variant="outlined"
                />
                <TextField
                  fullWidth
                  title="Repeat password"
                  placeholder="Repeat password"
                  margin="normal"
                  onChange={event => setPasswordTwo(event.target.value)}
                  variant="outlined"
                />
                <Button type="submit" variant="contained" color="primary">
                  Submit
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

export default SignUp;
