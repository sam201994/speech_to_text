/* @flow */

import React, {PureComponent} from 'react';
import {View, Button} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeActions from './actions';

// import Voice from '@react-native-community/voice';

class Home extends PureComponent<Props> {
  // constructor(props) {
  //   Voice.onSpeechStart = this.onSpeechStartHandler.bind(this);
  //   Voice.onSpeechEnd = this.onSpeechEndHandler.bind(this);
  //   Voice.onSpeechResults = this.onSpeechResultsHandler.bind(this);
  // }

  onClickButton = e => {
    const {actions} = this.props;
    // Voice.start('en-US');
    actions.sample();
  };
  render() {
    return (
      <View>
        <Button title="Press me" color="#f194ff" onPress={this.onClickButton} />
      </View>
    );
  }
}

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
