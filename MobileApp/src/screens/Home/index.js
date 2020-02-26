/* @flow */

import React, {PureComponent} from 'react';
import {
  View,
  Button,
  TextInput,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import HomeActions from './actions';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faMicrophone} from '@fortawesome/free-solid-svg-icons';
// import Voice from 'react-native-voice';
// console.log(Voice)
class Home extends PureComponent<Props> {
  constructor(props) {
    super(props);
    this.state = {
      recognized: '',
      started: '',
      results: [],
      searchText: '',
    };
  }

  // componentWillUnmount() {
  //   Voice.destroy().then(Voice.removeAllListeners);
  // }

  // onSpeechStart = e => {
  //   this.setState({
  //     started: '√',
  //   });
  // };

  // onSpeechRecognized = e => {
  //   this.setState({
  //     recognized: '√',
  //   });
  // };

  // onSpeechResults = e => {
  //   this.setState({
  //     results: e.value,
  //   });
  // };

  // async _startRecognition(e) {
  //   this.setState({
  //     recognized: '',
  //     started: '',
  //     results: [],
  //   });
  //   try {
  //     await Voice.start('en-US');
  //   } catch (e) {
  //     console.error(e);
  //   }
  // }

  onChangeText = text => {
    this.setState({
      searchText: text,
    });
  };

  onClickButton = e => {
    const {searchText} = this.state;
    const {actions, navigation} = this.props;
    console.log('before');
    actions.fetchYoutubeVideoId(searchText, navigation);
  };

  startAudio = () => {
    console.log('here');
  };

  render() {
    const {searchText} = this.props;
    // console.log("speech: ", results);
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          <TouchableHighlight
            style={styles.mic}
            onPress={this.startAudio}>
            <FontAwesomeIcon icon={faMicrophone} size={25} />
          </TouchableHighlight>
        </View>
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
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  mic: {
    backgroundColor: '#d9d9d9',
    height: 40,
    width: 40,
    borderRadius: 20,
    flexDirection: 'column',
    alignItems: 'center',
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
      fetchYoutubeVideoId: HomeActions.fetchYoutubeVideoId,
    },
    dispatch,
  ),
});

export default connect(
  null,
  mapDispatchToProps,
)(Home);
