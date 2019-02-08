import React from 'react';
import {
  Card,
  CardHeader,
  CardContent,
  CircularProgress,
} from '@material-ui/core';
import { withRouter } from 'react-router';
import moment from 'moment';
import { sortBy } from 'lodash';
import { colors } from '../../styles'
import { HTMLEntities } from '../../utils/stringUtils';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';
import Button from "@material-ui/core/Button/Button";

class Sensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
      isIdentifying: false
    };
  }

  componentDidMount() {
    this.setState({
      loading: true,
      id: this.props.id || this.props.match.params.id,
    });

    this.props.firebase
      .measurement(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          sensor: snapshot.val(),
          loading: false,
        });
      });
  }

  sortedAndFormattedMeasurements = () =>
    sortBy(Object.values(this.state.sensor), 'timestamp').map(measurement => ({
      ...measurement,
      timestamp: moment(measurement.timestamp).format('DD.MM.YY h:mm'),
    }));

  setIdentifying(isIdentifying) {
    this.props.firebase.setSensorIsIdentifying(this.props.id, isIdentifying)
    this.setState({
      isIdentifying: isIdentifying
      }
    )
  }

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    console.log(this.state.isIdentifying)

    return (
      <div style={{ width: '100%' }}>
        <h4>Sensor {this.state.id}</h4>
        <Button variant="contained" size="small" style={{backgroundColor: this.state.isIdentifying? colors.secondary : colors.primary}} onClick={() => this.setIdentifying(!this.state.isIdentifying)}>
          Identify
        </Button>
        <SimpleLineChart data={this.sortedAndFormattedMeasurements()} />
      </div>
    );
  }
}

export default withFirebase(withRouter(Sensor));
