import React from 'react';
import {
  Typography,
  Drawer,
  Divider,
  List,
  ListItem,
  ListItemIcon,
} from '@material-ui/core';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { colors } from '../styles';
import { Layout } from '../elements';
import Dashboard from '../components/Dashboard';
import uni from '../assets/uni.png';
import snappy from '../assets/snappy.svg';
import logout from '../assets/logout.svg';

function DashboardPage({ classes, theme }) {
  return (
    <Layout style={{ display: 'grid', gridTemplateColumns: '250px 1fr' }}>
      <Drawer variant="permanent">
        <DrawerList />
      </Drawer>
      {/* Dashboard */}
      <Dashboard />
    </Layout>
  );
}

const DrawerList = () => (
  <>
    <LogoHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <img src={snappy} alt="snappy logo" />
        <Typography variant="h6" style={{ color: 'white', marginLeft: 10 }}>
          SNAPPY
        </Typography>
      </div>
    </LogoHeader>
    <Divider />
    <BuildingProfile>
      <img src={uni} alt="university" style={{ width: 130, height: 130 }} />
      <Typography
        variant="h5"
        style={{
          textAlign: 'center',
          color: colors.secondary,
          marginTop: 20,
          width: '90%',
        }}
      >
        University of Stavanger
      </Typography>
    </BuildingProfile>

    <List>
      {['Dashboard', 'Profil', 'Eksempel', 'Menyvalg'].map((text, index) => (
        <ListItem
          button
          key={text}
          style={{
            display: 'flex',
            justifyContent: 'center',
            height: 75,
          }}
          divider
        >
          <WhiteListItem variant="subtitle1">{text}</WhiteListItem>
        </ListItem>
      ))}
      <ListItem
        button
        to="/signout"
        component={Link}
        style={{
          display: 'flex',
          justifyContent: 'center',
          height: 75,
        }}
        focusRippleColor="#4E4E4E"
      >
        <ListItemIcon>
          <img src={logout} alt="logout" />
        </ListItemIcon>
        <WhiteListItem variant="subtitle1">Logout</WhiteListItem>
      </ListItem>
    </List>
  </>
);

const LogoHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80px;
  background-color: ${colors.secondary};
`;

const BuildingProfile = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 400px;
`;

const WhiteListItem = props => (
  <Typography style={{ color: 'white', textAlign: 'center' }} {...props} />
);

export default DashboardPage;
