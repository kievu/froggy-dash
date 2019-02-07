import React from 'react';
import { Layout, Center } from '../elements';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

import { withFirebase } from '../Firebase';
import Sensor from '../components/Sensor';

class Sensors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensors: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.sensors().on('value', snapshot => {
      this.setState({
        sensors: snapshot.val(),
        loading: false,
      });
    });
  }

  render() {
    if (this.state.loading) {
      return (
        <Layout>
          <Center>
            <CircularProgress />
          </Center>
        </Layout>
      );
    }

    return (
      <Layout>
        <Center>
          {Object.keys(this.state.sensors).map(sensorId => (
            <Sensor id={sensorId} />
          ))}
        </Center>
      </Layout>
    );
  }
}

export default withFirebase(Sensors);
