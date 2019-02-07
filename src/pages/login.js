import React, { useState } from 'react';
import { Layout, Center } from '../elements';
import { Card, CardHeader, CardContent } from '@material-ui/core';

function Login() {
  const [username, setUsername] = useState(null);
  const [email, setEmail] = useState(null);
  const [passwordOne, setPasswordOne] = useState(null);
  const [passwordTwo, setPasswordTwo] = useState(null);

  const onSubmit = event => {};
  const onChange = event => {};

  return (
    <Layout>
      <Center>
        <Card>
          <CardHeader title="Login" />
          <CardContent>
            <form onSubmit={onSubmit}>
              <input
                name="username"
                value={username}
                onChange={onChange}
                type="text"
                placeholder="Full Name"
              />
              <input
                name="email"
                value={email}
                onChange={onChange}
                type="text"
                placeholder="Email Address"
              />
              <input
                name="passwordOne"
                value={passwordOne}
                onChange={onChange}
                type="password"
                placeholder="Password"
              />
              <input
                name="passwordTwo"
                value={passwordTwo}
                onChange={onChange}
                type="password"
                placeholder="Confirm Password"
              />
            </form>
          </CardContent>
        </Card>
      </Center>
    </Layout>
  );
}
export default Login;
