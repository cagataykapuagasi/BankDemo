import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { images, fonts, colors } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import { Icon } from '../components';

const Bar = ({ percent, leftText, rightText }) => {
  const width = percent >= 0 && percent <= 100 ? percent : 0;

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.percent}>
          {percent}%{'  '}
          <Text style={styles.percentDesc}>{leftText}</Text>
        </Text>
        <Text style={styles.percentDesc}>{rightText}</Text>
      </View>

      <View style={styles.bar}>
        <View style={[styles.barProgress, { width: `${width}%` }]} />
      </View>
    </View>
  );
};

const styles = ScaledSheet.create({
  container: {
    minHeight: '40@s',
    width: '100%',
    alignItems: 'center',
    marginTop: '25@s',
    paddingHorizontal: '15@s',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  percent: {
    fontWeight: 'bold',
    fontSize: 18,
    letterSpacing: -1,
  },
  percentDesc: {
    color: colors.lightGray,
    fontSize: 12,
    letterSpacing: 0,
  },
  bar: {
    width: '100%',
    backgroundColor: colors.borderColor,
    borderRadius: '4@s',
    height: '8@s',
    marginTop: '10@s',
    overflow: 'hidden',
  },
  barProgress: {
    width: '75%',
    height: '100%',
    backgroundColor: 'black',
    borderRadius: '4@s',
  },
});

export default Bar;
