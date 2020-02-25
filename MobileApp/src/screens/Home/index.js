/* @flow */

import React, {PureComponent} from 'react';
import {View, Button, TextInput, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeActions from './actions';

class Home extends PureComponent<Props> {
  state = {
    searchText: '',
  };

  onChangeText = text => {
    this.setState({
      searchText: text,
    });
  };

  onClickButton = e => {
    const {actions} = this.props;
    const {navigation} = this.props;
    navigation.navigate('video');
    actions.sample();
  };

  render() {
    const {searchText} = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.inputBox}
            onChangeText={text => this.onChangeText(text)}
            value={searchText}
          />
        </View>
        <Button title="Search" color="#f194ff" onPress={this.onClickButton} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    marginTop: 200,
  },
  inputContainer: {
    marginTop: 40,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  inputBox: {
    height: 40,
    width: 250,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    padding: 5,
  },
  backgroundVideo: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      sample: HomeActions.pressMeSample,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
