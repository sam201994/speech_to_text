/* @flow */

import React, {PureComponent} from 'react';
import {View, StyleSheet, TouchableHighlight, Text} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeActions from './actions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faMicrophone,
  faSearch,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import Voice from '@react-native-community/voice';

class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      active: false,
    };
    Voice.onSpeechStart = this.onSpeechStart;
    Voice.onSpeechRecognized = this.onSpeechRecognized;
    Voice.onSpeechResults = this.onSpeechResults;
  }

  componentWillUnmount() {
    Voice.destroy().then(Voice.removeAllListeners);
  }

  onClearInput = () => {
    Voice.stop().then(() => {
      Voice.destroy();
      this.setState({
        recognized: '',
        started: '',
        results: [],
        active: false,
      });
    });
  };

  onSpeechStart = e => {
    this.setState({
      started: '√',
    });
  };

  onSpeechRecognized = e => {
    this.setState({
      recognized: '√',
    });
  };

  onSpeechResults = e => {
    this.setState({
      results: e.value,
    });
  };

  async _startRecognition(e) {
    const {active} = this.state;
    if (!active) {
      this.setState({
        recognized: '',
        started: '',
        results: [],
        active: true,
      });
      try {
        await Voice.start('en-US');
      } catch (e) {
        throw e;
      }
    }
  }

  onClickButton = e => {
    const {results} = this.state;
    const {actions, navigation} = this.props;
    const searchText = results.join(' ');
    Voice.stop();
    this.setState({
      recognized: '',
      started: '',
      active: false,
    });

    actions.fetchYoutubeVideoId(searchText, navigation);
  };

  render() {
    const {results, active} = this.state;
    const iconContainer = active
      ? {...styles.iconContainer, backgroundColor: 'green'}
      : styles.iconContainer;

    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <TouchableHighlight
            style={iconContainer}
            onPress={this._startRecognition.bind(this)}>
            <FontAwesomeIcon icon={faMicrophone} size={25} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconContainer}
            onPress={this.onClickButton}>
            <FontAwesomeIcon icon={faSearch} size={25} />
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.iconContainer}
            onPress={this.onClearInput}>
            <FontAwesomeIcon icon={faTimes} size={25} />
          </TouchableHighlight>
        </View>
        <View style={styles.row}>
          <View style={styles.inputContainer}>
            <Text>{results.join(' ')}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 20,
  },
  container: {
    height: '100%',
    width: '100%',
    marginTop: 200,
  },
  buttonContainer: {
    backgroundColor: '#e8e6e6',
    width: 100,
    margin: 5,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    height: 50,
  },
  iconContainer: {
    backgroundColor: '#d9d9d9',
    height: 40,
    width: 40,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
  },
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(
    {
      fetchYoutubeVideoId: HomeActions.fetchYoutubeVideoId,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
