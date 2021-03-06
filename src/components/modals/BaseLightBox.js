import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View, StyleSheet, Animated, Dimensions } from 'react-native';
import { Actions } from 'react-native-router-flux';

const { height: deviceHeight, width: deviceWidth } = Dimensions.get('window');

export default class BaseLightBox extends Component {
  static propTypes = {
    children: PropTypes.any,
    horizontalPercent: PropTypes.number,
    verticalPercent: PropTypes.number,
  };

  constructor(props) {
    super(props);

    this.state = {
      opacity: new Animated.Value(0),
    };
  }

  componentDidMount() {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 1,
    }).start();
  }

  closeModal = () => {
    Animated.timing(this.state.opacity, {
      duration: 500,
      toValue: 0,
    }).start(Actions.pop);
  };

  _renderLightBox = () => {
    const { children, horizontalPercent = 1, verticalPercent = 1 } = this.props;
    const height = verticalPercent ? deviceHeight * verticalPercent : deviceHeight;
    const width = horizontalPercent ? deviceWidth * horizontalPercent : deviceWidth;
    return <View style={[styles.lightBox, { width, height }]}>{children}</View>;
  };

  render() {
    return (
      <Animated.View style={[styles.container, { opacity: this.state.opacity }]}>
        {this._renderLightBox()}
      </Animated.View>
    );
  }
}

const gray1 = 'rgba(52,52,52,0.5)';
const gray2 = 'rgba(35,42,56,0.93)';

const styles = StyleSheet.create({
  container: {
    backgroundColor: gray1,
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lightBox: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: gray2,
  },
});
