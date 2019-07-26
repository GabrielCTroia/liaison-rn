import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Colors, Layout } from '../../styles';
import { RecordButton, RecordedSound } from './components/RecordButton';
import { InputField } from '../../components/InputField';
import { CircleButton } from '../../components/CircleButton';
import { Player } from '../../lib/Player';

export type HomeScreenProps = {
  // navigation: NavigationScreenProp<any, any>;
}

type State = {
  // hasRecording: boolean;
  recordedSound?: RecordedSound;
  recordedSoundUri?: string;
}

const player = new Player();

export class HomeScreen extends React.Component<HomeScreenProps, State> {

  static navigationOptions = {
    header: null,
  };

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      // hasRecording: false,
      recordedSound: undefined,
      recordedSoundUri: undefined,
    }
  }

  private async playSound() {
    if (!this.state.recordedSoundUri) {
      return;
    }

    console.log('gonna play', this.state.recordedSoundUri);

    await player.play(this.state.recordedSoundUri);

    // this.state.recordedSound.pauseAsync();

    // const x = await this.state.recordedSound.playAsync();

    // console.log(x);
  }

  private renderSaveAsInput() {
    if (!this.state.recordedSoundUri) {
      return null;
    }

    return (
      <View style={styles.saveContainer}>
        <CircleButton
          color={Colors.red}
          size={60}
          iconSource={require('../../../assets/play_icon.png')}
          onPress={() => this.playSound()}
        />
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <InputField placeholder="Save as..." autoFocus={true} />
          </View>
          <Text style={styles.inputButton}>Done</Text>
        </View>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.content}></View>
        <View style={styles.footer}>
          <RecordButton onRecorded={(recordedSoundUri) => {
            console.log('record uri staet', recordedSoundUri);

            this.setState({ recordedSoundUri });
          }} />
        </View>

        {this.renderSaveAsInput()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGrey,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    flex: .2,
  },
  content: {
    flex: 1,
  },
  footer: {
    flex: .2,
    // alignSelf: 'center',
    position: 'relative',
    zIndex: 10,
  },
  inputContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    flex: 1,
  },
  inputButton: {
    paddingLeft: 10,
    fontSize: 16,
    color: '#2D9CDB',
  },
  saveContainer: {
    // backgroundColor: Colors.red,

    position: 'absolute',
    // backgroundColor: Colors.white,
    // width: Layout.screenWidth - 100,
    // marginLeft: 50,
    // marginRight: 50,
    // backgroundColor: 'red',
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    // top: 400,
    height: Layout.screenHeight / 1.5,
    bottom: 0,

    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',
  }
});
