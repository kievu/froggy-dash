import React, { useState, useEffect } from 'react';
import { Card, CircularProgress, Typography } from '@material-ui/core';
import { withRouter } from 'react-router';
import { withFirebase } from '../../Firebase';
import running from '../../assets/running-person.svg';

function MotionDetector({ firebase, id, match }) {
  const [motionData, onMotionChange] = useState({
    loading: true,
    motionDetected: null,
  });

  useEffect(() => {
    firebase.sensor(id || match.params.id).on('value', snapshot => {
      onMotionChange({
        loading: false,
        motionDetected: snapshot.val().motion,
      });
    });
  });

  return (
    <Card
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        width: 350,
        height: 300,
        marginTop: 50,
        marginLeft: 40,
        backgroundColor: motionData.motionDetected ? '#76AF21' : '#DC143C',
      }}
    >
      {motionData.loading ? (
        <CircularProgress />
      ) : motionData.motionDetected ? (
        <>
          <img
            src={running}
            alt="running person"
            style={{ width: 120, height: 150 }}
          />
          <Typography
            paragraph
            variant="h6"
            style={{ color: 'white', marginTop: 30 }}
          >
            Det befinner seg noen i rommet!
          </Typography>
          <Typography style={{ color: 'white' }}>Sensor: {id}</Typography>
        </>
      ) : (
        <>
          <Typography
            paragraph
            variant="h6"
            style={{
              color: 'white',
              marginTop: 30,
              width: '90%',
              textAlign: 'center',
            }}
          >
            Ingen personer befinner seg i rommet
          </Typography>
          <Typography style={{ color: 'white' }}>Sensor: {id}</Typography>
        </>
      )}
    </Card>
  );
}

export default withFirebase(withRouter(MotionDetector));
