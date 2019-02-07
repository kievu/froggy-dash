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
import Building from '../components/Building';

class Buildings extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      buildings: {},
    };
  }

  componentDidMount() {
    this.setState({ loading: true });

    this.props.firebase.buildings().on('value', snapshot => {
      this.setState({
        buildings: snapshot.val(),
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
        {Object.keys(this.state.buildings).map(buildingId => (
          <Building id={buildingId} />
        ))}
      </Layout>
    );
  }
}

export default withFirebase(Buildings);
