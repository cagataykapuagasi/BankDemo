import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { images, fonts, colors, height, width } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';
import Baseight from '../components/modals/BaseLightBox';

const Home = () => {
  return (
    <Baseight>
      <View style={styles.container}>
        <Text onPress={Actions.home}>Cards</Text>
      </View>
    </Baseight>
  );
};

const styles = ScaledSheet.create({
  container: {
    height,
    width,
  },
  card: {
    height: '30%',
    width: '100%',
    backgroundColor: 'red',
    borderRadius: 8,
    marginTop: '10@s',
  },
});

export default Home;
