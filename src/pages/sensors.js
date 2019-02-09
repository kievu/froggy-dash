import React from 'react';
import { Layout, Center } from '../elements';
import { CircularProgress } from '@material-ui/core';

import { withFirebase } from '../Firebase';
import Sensor from '../components/Sensor';

class Sensors extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      measurements: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.measurements().on('value', snapshot => {
      this.setState({
        measurements: snapshot.val(),
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
        {Object.keys(this.state.measurements).map(sensorId => (
          <Sensor key={sensorId} id={sensorId} />
        ))}
      </Layout>
    );
  }
}

export default withFirebase(Sensors);
