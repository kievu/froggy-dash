import React, { useState, useEffect } from 'react';
import { Layout, Center } from '../elements';
import { CircularProgress } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import Building from '../components/Building';

function Buildings({ firebase }) {
  const [buildingData, setData] = useState({ loading: true, buildings: null });

  useEffect(() => {
    firebase.buildings().on('value', snapshot => {
      setData({
        loading: false,
        buildings: snapshot.val(),
      });
    });
  });

  return buildingData.loading ? (
    <Layout>
      <Center>
        <CircularProgress />
      </Center>
    </Layout>
  ) : (
    <Layout>
      {Object.keys(buildingData.buildings).map(buildingId => (
        <Building id={buildingId} key={buildingId} />
      ))}
    </Layout>
  );
}

export default withFirebase(Buildings);
