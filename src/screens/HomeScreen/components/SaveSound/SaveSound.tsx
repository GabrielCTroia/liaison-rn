import React from 'react';
import { StyleSheet, View, Button } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects, Colors, Layout } from '../../../../styles';
import { CircleButton } from '../../../../components/CircleButton';
import { Player } from '../../../../lib/Player';
import { SoundEntry } from '../SoundList/SoundList';
import * as FileSystem from 'expo-file-system';
import { db } from '../../../../db';
// import console = require('console');


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

  private async save() {
    const fileName = this.props.soundUri.split('/').slice(-1)[0];
    const nextUri = `${FileSystem.documentDirectory}${fileName}`;

    await FileSystem.copyAsync({
      from: this.props.soundUri,
      to: nextUri,
    });

    const resource = {
      userId: 0, // This is hardcoded as me for now. Just here to allow me to think of users
      name: this.state.soundName,
      uri: nextUri,
    }

    // TODO: this should not be here!
    await db.post(resource);

    this.props.onSaved(resource);
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
            onPress={() => this.save()}
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
