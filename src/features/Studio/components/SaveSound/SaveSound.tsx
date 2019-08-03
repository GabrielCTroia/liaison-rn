import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects, Colors, Layout } from '../../../../styles';
import { CircleButton } from '../../../../components/CircleButton';
import { Player } from '../../../../lib/Player';
import { AudioRecordCreation } from '../../types';


type Props = {
  soundUri: string;
  onSave: (audioRecordInfo: AudioRecordCreation) => void;
}

type State = {
  soundName: string;
}

export class SaveSound extends React.Component<Props, State> {

  private player = new Player();

  readonly state = {
    soundName: '',
  }

  async playSound() {
    await this.player.play(this.props.soundUri);
  }

  render() {
    return (
      <View style={styles.container}>
        <CircleButton
          color={Colors.red}
          size={60}
          iconSource={require('../../../../../assets/play_icon.png')}
          onPress={() => this.playSound()}
        />
        <View style={styles.inputContainer}>
          <View style={styles.input}>
            <InputField
              placeholder="Spell it..."
              autoFocus={true}
              onChangeText={(soundName) => {
                this.setState({ soundName });
              }}
            />
          </View>
          <Button
            disabled={this.state.soundName.length === 0}
            onPress={() => this.props.onSave({
              uri: this.props.soundUri,
              name: this.state.soundName,
            })}
            title="Done"
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: '10%',
    right: '10%',
    top: (Layout.screenHeight / 2) - 140,
    padding: 30,
    display: 'flex',
    alignContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.lightGrey,
    ...Effects.deepShadow,

    borderRadius: 10,
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
    fontSize: 16,
    color: '#2D9CDB',
  },
});
