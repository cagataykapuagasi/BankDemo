import React from 'react';
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
import { images, fonts, colors, height } from 'res';
import { ScaledSheet } from 'react-native-size-matters';
import Icon from './Icon';

const animation = new Animated.Value(0);
const animation2 = new Animated.Value(0);
const animation3 = new Animated.Value(0);

const UserCard = ({ title, desc, selectCard, setSelectCard }) => {
  const translateLeft = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -height * 0.5],
  });

  const translateRight = animation2.interpolate({
    inputRange: [0, 1],
    outputRange: [0, height * 0.5],
  });

  startAnimation = (toValue, duration) => {
    Animated.parallel([
      Animated.timing(animation, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
      Animated.timing(animation2, {
        toValue,
        duration,
        useNativeDriver: true,
      }),
    ]).start(() =>
      Animated.timing(animation3, {
        toValue,
        duration: 500,
        useNativeDriver: true,
      }).start()
    );
  };

  if (selectCard) {
    startAnimation(1, 250);
  } else {
    startAnimation(0, 500);
  }

  const goBack = () => setSelectCard(0);

  return (
    <>
      {selectCard && (
        <Animated.View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            opacity: animation3,
            position: 'absolute',
            width: '100%',
            top: 15,
            zIndex: 1000000,
          }}>
          <TouchableOpacity
            onPress={goBack}
            style={{
              position: 'absolute',
              left: 10,
            }}>
            <Icon type="ionicons" name="arrow-back" size={20} />
          </TouchableOpacity>
          <Text style={{ fontWeight: 'bold', left: 0, right: 0, top: 0 }}>
            My Cards
          </Text>
        </Animated.View>
      )}

      <View
        style={[
          styles.container,
          { borderBottomWidth: selectCard ? 0 : 1 },
        ]}>
        <Animated.View
          style={{
            flexDirection: 'row',
            flex: 1,
            transform: [{ translateX: translateLeft }],
          }}>
          <Image style={styles.image} source={images.logo} />

          <View style={styles.textContainer}>
            <Text>{title}</Text>
            <Text style={styles.desc}>{desc}</Text>
          </View>
        </Animated.View>

        <TouchableOpacity>
          <Animated.View
            style={{ transform: [{ translateX: translateRight }] }}>
            <Icon
              type="material-community"
              name="dots-horizontal"
              size={25}
            />
          </Animated.View>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = ScaledSheet.create({
  container: {
    height: '65@s',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: '15@s',
    marginTop: '10@s',
    borderBottomColor: colors.borderColor,
  },
  image: {
    height: '40@s',
    width: '40@s',
    borderRadius: '20@s',
  },
  textContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  desc: {
    fontSize: 12,
    color: colors.lightGray,
  },
  line: {
    borderWidth: 0.5,
    borderColor: colors.borderColor,
    marginTop: '15@s',
  },
});

export default UserCard;
