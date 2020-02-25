/*This is an Example of YouTube integration in React Native*/
import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  PixelRatio,
  Dimensions,
  Platform,
} from 'react-native';
import YouTube, {
  YouTubeStandaloneIOS,
  YouTubeStandaloneAndroid,
} from 'react-native-youtube';

export default class RCTYouTubeExample extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };

  render() {
    const {route} = this.props;
    const url = route.params.url;
    return (
      <ScrollView
        style={styles.container}
        onLayout={({
          nativeEvent: {
            layout: {width},
          },
        }) => {
          if (!this.state.containerMounted) {
            this.setState({containerMounted: true});
          }
          if (this.state.containerWidth !== width) {
            this.setState({containerWidth: width});
          }
        }}>
        {this.state.containerMounted && (
          <YouTube
            ref={component => {
              this._youTubeRef = component;
            }}
            // You must have an API Key for the player to load in Android
            apiKey="YOUR_API_KEY"
            // Un-comment one of videoId / videoIds / playlist.
            // You can also edit these props while Hot-Loading in development mode to see how
            // it affects the loaded native module
            videoId={url}
            // videoIds={['HcXNPI-IPPM', 'XXlZfc1TrD0', 'czcjU1w-c6k', 'uMK0prafzw0']}
            // playlistId="PLF797E961509B4EB5"
            play={this.state.isPlaying}
            loop={this.state.isLooping}
            fullscreen={this.state.fullscreen}
            controls={1}
            style={[
              {
                height: PixelRatio.roundToNearestPixel(
                  this.state.containerWidth / (16 / 9),
                ),
              },
              styles.player,
            ]}
            onError={e => this.setState({error: e.error})}
            onReady={e => this.setState({isReady: true})}
            onChangeState={e => this.setState({status: e.state})}
            onChangeQuality={e => this.setState({quality: e.quality})}
            onChangeFullscreen={e =>
              this.setState({fullscreen: e.isFullscreen})
            }
            onProgress={e =>
              this.setState({
                duration: e.duration,
                currentTime: e.currentTime,
              })
            }
          />
        )}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: 18,
    color: 'blue',
  },
  buttonTextSmall: {
    fontSize: 15,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});
// /*Example of React Native Video*/
// import React, {Component} from 'react';
// //Import React
// import {Platform, StyleSheet, Text, View} from 'react-native';
// //Import Basic React Native Component
// import Video from 'react-native-video';
// //Import React Native Video to play video
// import MediaControls, {PLAYER_STATES} from 'react-native-media-controls';
// //Media Controls to control Play/Pause/Seek and full screen

// class RandomVideo extends Component {
//   videoPlayer;

//   constructor(props) {
//     super(props);
//     this.state = {
//       currentTime: 0,
//       duration: 0,
//       isFullScreen: false,
//       isLoading: true,
//       paused: false,
//       playerState: PLAYER_STATES.PLAYING,
//       screenType: 'content',
//     };
//   }

//   onSeek = seek => {
//     //Handler for change in seekbar
//     this.videoPlayer.seek(seek);
//   };

//   onPaused = playerState => {
//     //Handler for Video Pause
//     this.setState({
//       paused: !this.state.paused,
//       playerState,
//     });
//   };

//   onReplay = () => {
//     //Handler for Replay
//     this.setState({playerState: PLAYER_STATES.PLAYING});
//     this.videoPlayer.seek(0);
//   };

//   onProgress = data => {
//     const {isLoading, playerState} = this.state;
//     // Video Player will continue progress even if the video already ended
//     if (!isLoading && playerState !== PLAYER_STATES.ENDED) {
//       this.setState({currentTime: data.currentTime});
//     }
//   };

//   onLoad = data => this.setState({duration: data.duration, isLoading: false});

//   onLoadStart = data => this.setState({isLoading: true});

//   onEnd = () => this.setState({playerState: PLAYER_STATES.ENDED});

//   onError = () => alert('Oh! ', error);

//   exitFullScreen = () => {
//     alert('Exit full screen');
//   };

//   enterFullScreen = () => {};

//   onFullScreen = () => {
//     if (this.state.screenType == 'content') {
//       this.setState({screenType: 'cover'});
//     } else {
//       this.setState({screenType: 'content'});
//     }
//   };
//   renderToolbar = () => (
//     <View>
//       <Text> toolbar </Text>
//     </View>
//   );
//   onSeeking = currentTime => this.setState({currentTime});

//   render() {
//     const { route }= this.props;
//     const url = route.params.url || 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4'
//     return (
//       <View style={styles.container}>
//         <Video
//           onEnd={this.onEnd}
//           onLoad={this.onLoad}
//           onLoadStart={this.onLoadStart}
//           onProgress={this.onProgress}
//           paused={this.state.paused}
//           ref={videoPlayer => (this.videoPlayer = videoPlayer)}
//           resizeMode={this.state.screenType}
//           onFullScreen={this.state.isFullScreen}
//           source={{
//             uri:
//               url,
//           }}
//           style={styles.mediaPlayer}
//           volume={10}
//         />
//         <MediaControls
//           duration={this.state.duration}
//           isLoading={this.state.isLoading}
//           mainColor="#333"
//           onFullScreen={this.onFullScreen}
//           onPaused={this.onPaused}
//           onReplay={this.onReplay}
//           onSeek={this.onSeek}
//           onSeeking={this.onSeeking}
//           playerState={this.state.playerState}
//           progress={this.state.currentTime}
//           toolbar={this.renderToolbar()}
//         />
//       </View>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     height: 1000,
//   },
//   toolbar: {
//     backgroundColor: 'black',
//     padding: 10,
//     borderRadius: 5,
//   },
//   mediaPlayer: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom: 0,
//     right: 0,
//     backgroundColor: 'black',
//   },
// });
// export default RandomVideo;
