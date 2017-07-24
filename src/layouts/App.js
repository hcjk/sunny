import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchLocation } from '../redux/modules/location';
import { fetchWeather } from '../redux/modules/weather';

class App extends Component {
  componentWillMount() {
    this.props.fetchLocation()
      .then(() => {
        this.props.fetchWeather({
          lat: this.props.location.location.coords.latitude,
          lng: this.props.location.location.coords.longitude
        });
      });
  }

  render() {
    const { location: { location: { coords } } } = this.props;
    const styles = StyleSheet.create({
      container: {
        paddingVertical: 50,
        paddingHorizontal: 50
      }
    });
    return (
      <View style={styles.container}>
        {coords && <Text>{coords.latitude} {coords.longitude}</Text>}
      </View>
    );
  }
}

App.propTypes = {
  fetchLocation: PropTypes.func.isRequired,
  fetchWeather: PropTypes.func.isRequired,
  location: PropTypes.shape({
    location: PropTypes.object
  }).isRequired
};

export default connect(({ location }) => ({ location }), { fetchLocation, fetchWeather })(App);
