import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  Animated,
  TouchableWithoutFeedback,
} from 'react-native';
import { images, fonts, colors, height, width } from 'res';
import { ScaledSheet, scale } from 'react-native-size-matters';
import { Actions } from 'react-native-router-flux';

types = {
  visa: 'https://marka-logo.com/wp-content/uploads/2020/04/Visa-Logo.png',
  mastercard:
    'https://cdn.vox-cdn.com/thumbor/UKSLdttYoIK2bv1gd231rqL4eiQ=/1400x788/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/13674554/Mastercard_logo.jpg',
};

const animation = new Animated.Value(0);
const opacityAnimation = new Animated.Value(0);

const CreditCard = ({
  item: { type, name, lastNumbers, color: backgroundColor, cash },
  setSelectCard,
  selectCard,
  index = 0,
}) => {
  const toggleCard = () => {
    setSelectCard(index);
  };

  //console.warn(selectCard, index);

  const translateY = animation.interpolate({
    inputRange: [0, 1, 2],
    outputRange: [
      0,
      -height * 0.08,
      (height * 0.28 + 10) * index - height * 0.08,
    ],
  });

  if (selectCard) {
    Animated.timing(opacityAnimation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();

    Animated.sequence([
      Animated.timing(animation, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        toValue: 2,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();
  } else {
    Animated.spring(animation, {
      toValue: 0,
      duration: 250,
      useNativeDriver: true,
    }).start();
  }

  return (
    <TouchableWithoutFeedback onPress={toggleCard}>
      <Animated.View
        style={[
          styles.card,
          {
            opacity: index === 0 ? 1 : opacityAnimation,
            transform: [{ translateY }],
            position: selectCard && 'absolute',
            zIndex: index * -1,
          },
        ]}>
        <View style={[styles.firstContainer, { backgroundColor }]}>
          <Image
            style={{ height: 40, width: 40 }}
            source={{
              uri:
                'https://cdn.iconscout.com/icon/premium/png-512-thumb/credit-card-chip-1522262-1288452.png',
            }}
          />
          <Text style={{ color: 'white' }}>{name}</Text>
        </View>
        <View style={styles.secondContainer}>
          <View style={{}}>
            <Text style={{ color: 'white' }}>
              {selectCard ? `$${cash}` : 'Business Card'}{' '}
            </Text>
            <Text style={{ color: 'white', marginTop: 10 }}>
              . . . . {lastNumbers}
            </Text>
          </View>
          <Image
            style={{ height: 40, width: 80 }}
            source={{
              uri: types[type],
            }}
          />
        </View>
      </Animated.View>
    </TouchableWithoutFeedback>
  );
};

const styles = ScaledSheet.create({
  card: {
    height: height * 0.28,
    width: width - scale(30),
    borderRadius: '10@s',
    marginTop: '10@s',
    overflow: 'hidden',
    zIndex: -9999,
    alignSelf: 'center',
  },
  firstContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '15@s',
  },
  secondContainer: {
    flex: 1.5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '15@s',
    backgroundColor: 'black',
  },
});

export default CreditCard;
