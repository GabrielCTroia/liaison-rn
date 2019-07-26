import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects, Colors, Layout } from '../../../../styles';
import { CircleButton } from '../../../../components/CircleButton';
import { Player } from '../../../../lib/Player';
import { SoundEntry } from '../SoundList/SoundList';

type SoundListProps = {
  soundUri: string;
  onSaved: (s: SoundEntry) => void;
}

type State = {
  soundName: string;
}

export class SaveSound extends React.Component<SoundListProps, State> {

  private player: Player;

  constructor(props: SoundListProps) {
    super(props);

    this.player = new Player();

    this.state = {
      soundName: '',
    }
  }

  private async playSound() {
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
                this.setState({ soundName })
              }}
            />
          </View>
          <Button
            disabled={this.state.soundName.length === 0}
            onPress={() => {
              this.props.onSaved({
                name: this.state.soundName,
                uri: this.props.soundUri,
              });
            }}
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