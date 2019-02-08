import React from 'react';
import { Card, CircularProgress } from '@material-ui/core';
import { withRouter } from 'react-router';
import moment from 'moment';
import { flatten, groupBy, sortBy } from 'lodash';
import { colors } from '../../styles';
import { withFirebase } from '../../Firebase';
import SimpleLineChart from '../SimpleLineChart';
import Button from '@material-ui/core/Button/Button';
import TextField from '@material-ui/core/TextField/TextField';
import LightAndMovementChart from '../LightAndMovementChart';

const LIGHT_IS_OFF_THRESHOLD = 700;

class Sensor extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      sensor: {},
      id: null,
      isIdentifying: false,
      name: '',
      chartType: null,
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
        });
      });

    this.props.firebase
      .sensor(this.props.id || this.props.match.params.id)
      .on('value', snapshot => {
        this.setState({
          name: snapshot.val().name,
          isIdentifying: snapshot.val().isIdentifying,
          loading: false,
        });
      });
  }

  sortedAndFormattedMeasurements = () =>
    sortBy(Object.values(this.state.sensor), 'timestamp')
      .filter(measurement => moment(measurement.timestamp).minute() % 20 === 0)
      .map(measurement => ({
        ...measurement,
        timestamp: moment(measurement.timestamp).format('H:mm'),
        light: measurement.light > LIGHT_IS_OFF_THRESHOLD ? 0 : 1,
      }));

  setIdentifying(isIdentifying) {
    this.props.firebase.setSensorIsIdentifying(this.props.id, isIdentifying);
    this.setState({
      isIdentifying: isIdentifying,
    });
  }

  setNewName = event => {
    this.props.firebase.setSensorName(this.props.id, event.target.value);
  };

  renderChart = () => {
    switch (this.props.chartType) {
      case 'light':
        return (
          <LightAndMovementChart data={this.sortedAndFormattedMeasurements()} />
        );
      default:
        return <SimpleLineChart data={this.sortedAndFormattedMeasurements()} />;
    }
  };

  render() {
    if (this.state.loading) {
      return <CircularProgress />;
    }

    return (
      <Card>
        <div style={{ marginTop: '8px', marginLeft: '8px' }}>
          <TextField
            id="sensorHeader"
            label="Sensor"
            defaultValue={this.state.name}
            margin="normal"
            onChange={this.setNewName}
          />
          <Button
            variant="contained"
            size="small"
            style={{
              backgroundColor: this.state.isIdentifying
                ? colors.secondary
                : colors.primary,
            }}
            onClick={() => this.setIdentifying(!this.state.isIdentifying)}
          >
            Identify
          </Button>
        </div>
        {this.renderChart()}
      </Card>
    );
  }
}

export default withFirebase(withRouter(Sensor));
