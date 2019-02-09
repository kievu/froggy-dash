import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

import bygg0 from '../../assets/voksena.png';
import bygg1 from '../../assets/uni.png';

const styles = theme => ({
  root: {
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: 'inline',
  },
});

function AlignItemsList(props) {
  const { classes } = props;
  return (
    <Card style={{ marginTop: '2rem' }}>
      <CardContent>
        <List className={classes.root}>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={bygg0} />
            </ListItemAvatar>
            <ListItemText
              primary="Voksenåsen Bygg 1"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sparer 30kWh. Kunne spart 100 kWh til.{' '}
                    <strong>👈 Gjør tiltak her først!</strong>
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar alt="Remy Sharp" src={bygg1} />
            </ListItemAvatar>
            <ListItemText
              primary="Voksenåsen Bygg 2"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sparer 80kWh. Kunne spart 20 kWh til.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
          <ListItem button alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                alt="Remy Sharp"
                src="https://www.sfv.se/filtered/16100/rszww440h225-90/voksenasen-foto-sfv-765689502-rszww440h225-90.jpg"
              />
            </ListItemAvatar>
            <ListItemText
              primary="Voksenåsen Bygg 3"
              secondary={
                <React.Fragment>
                  <Typography
                    component="span"
                    className={classes.inline}
                    color="textPrimary"
                  >
                    Sparer 10kWh. Kunne spart 10 kWh til.
                  </Typography>
                </React.Fragment>
              }
            />
          </ListItem>
        </List>
      </CardContent>
    </Card>
  );
}

AlignItemsList.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AlignItemsList);
