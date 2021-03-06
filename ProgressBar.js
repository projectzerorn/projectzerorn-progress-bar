import React from 'react';
import {
  Animated,
  Easing,
  StyleSheet,
  View
} from 'react-native';
const createReactClass = require('create-react-class');

var styles = StyleSheet.create({
  background: {
    backgroundColor: '#bbbbbb',
    height: 5,
    overflow: 'hidden'
  },
  fill: {
    backgroundColor: '#3b5998',
    height: 5
  }
});

var ProgressBar = createReactClass({

  getDefaultProps() {
    return {
      style: styles,
      easing: Easing.inOut(Easing.ease),
      easingDuration: 500
    };
  },

  getInitialState() {
    return {
      progress: new Animated.Value(this.props.initialProgress || 0)
    };
  },

  componentDidUpdate(prevProps, prevState) {
    if (this.props.progress >= 0 && this.props.progress != prevProps.progress) {
      this.update();
    }
  },

  render() {

    var i = this.state.progress.interpolate({
        inputRange: [0.0, 1.0],
        outputRange: [0.0, 1.0 * this.props.style.width],
    });

    var fillWidth = i._interpolation(1.0 * this.props.progress)

    return (
      <View style={[styles.background, this.props.backgroundStyle, this.props.style]}>
        <Animated.View style={[styles.fill, this.props.fillStyle, {width:fillWidth, borderRadius:this.props.style.borderRadius}]}/>
      </View>
    );
  },

  update() {
    Animated.timing(this.state.progress, {
      easing: this.props.easing,
      duration: this.props.easingDuration,
      toValue: this.props.progress
    }).start();
  }
});

module.exports = ProgressBar;
