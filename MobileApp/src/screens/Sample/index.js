/* @flow */

import React, {PureComponent} from 'react';
import {View, StyleSheet, Text} from 'react-native';

class Sample extends PureComponent<Props> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <Text>ola</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 200,
  },
  container: {
    backgroundColor: 'red',
    height: '100%',
    width: '100%',
    marginTop: 200,
  },
});

export default Sample;
