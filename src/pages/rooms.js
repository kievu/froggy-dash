import React, { useState, useEffect } from 'react';
import { Layout, Center } from '../elements';
import { CircularProgress } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import Room from '../components/Room';

function Rooms({ firebase }) {
  const [roomData, setData] = useState({ loading: true, rooms: null });

  useEffect(() => {
    firebase.rooms().on('value', snapshot => {
      setData({ loading: false, rooms: snapshot.val() });
    });
  });

  return roomData.loading ? (
    <Layout>
      <Center>
        <CircularProgress />
      </Center>
    </Layout>
  ) : (
    <Layout>
      {Object.values(roomData.rooms).map(roomId => (
        <Room id={roomId} key={roomId} />
      ))}
    </Layout>
  );
}

export default withFirebase(Rooms);
