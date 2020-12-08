import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Scene,
  Modal,
  Router,
  Lightbox,
  Stack,
} from 'react-native-router-flux';
import { Provider } from 'mobx-react';
import { Home, Cards } from './src/screens';
import { colors } from 'res';
import RNBootSplash from 'react-native-bootsplash';
import { store } from './src/store';
//starterkit
export default class App extends Component {
  componentDidMount() {
    store
      .init()
      .then(() => {
        //
      })
      .catch(() => {
        //
      })
      .finally(() => RNBootSplash.hide({ duration: 250 }));
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Provider store={store}>
          <Router
            sceneStyle={styles.scene}
            titleStyle={styles.title}
            tintColor={colors.headerTint}
            headerTintColor={colors.headerTint}>
            <Lightbox>
              <Stack key="root">
                <Scene hideNavBar component={Home} initial key="home" />
              </Stack>
              <Scene hideNavBar component={Cards} key="cards" />
            </Lightbox>
          </Router>
        </Provider>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    backgroundColor: colors.background,
  },
  tab: {
    backgroundColor: colors.lightGray,
  },
});
