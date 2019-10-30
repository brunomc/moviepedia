import React from 'react';
import Home from '../views/Home';
import Details from '../views/Details';
import {colors} from '../styles';
import {Router, Scene, Stack, Actions} from 'react-native-router-flux';

export default Routes = () => (
  <Router
    navigationBarStyle={{backgroundColor: colors.primary, borderBottomWidth: 0}}
    titleStyle={{color: '#ffffff'}}
    tintColor="#ffffff">
    <Stack key="root">
      <Scene
        key="home"
        title="Home"
        component={Home}
        drawerLockMode="locked-closed"
        hideNavBar
      />
      <Scene
        key="details"
        title=""
        component={Details}
        drawerLockMode="locked-closed"
        onBack={() => {
          Actions.home();
        }}
        back
        navTransparent={true}
      />
    </Stack>
  </Router>
);
