import React from 'react';
import { StyleSheet, View, AsyncStorage } from 'react-native';
import { Colors } from '../../styles';
import { RecordButton } from './components/RecordButton';
import { SoundList, SoundEntry } from './components/SoundList/SoundList';
import { SaveSound } from './components/SaveSound/SaveSound';
import { Persist } from '../../lib/Persist';

const persist = new Persist();

export type HomeScreenProps = {
  // navigation: NavigationScreenProp<any, any>;
}

type State = {
  recordedSoundUri?: string;
  soundItems: SoundEntry[];
}

export class HomeScreen extends React.Component<HomeScreenProps, State> {

  static navigationOptions = {
    header: null,
  };

  constructor(props: HomeScreenProps) {
    super(props);

    this.state = {
      recordedSoundUri: undefined,
      soundItems: [],
    }
  }

  async componentDidMount() {
    this.setState({
      soundItems: await persist.all(),
    })
  }

  private renderSaveAsInput() {
    if (!this.state.recordedSoundUri) {
      return null;
    }

    return <SaveSound
      soundUri={this.state.recordedSoundUri}
      onSaved={async (soundItem) => {
        // TODO: A bit manual and hacky until we have redux
        await persist.create(soundItem.name, soundItem);

        this.setState({ recordedSoundUri: undefined });

        this.refreshSoundDerivedState();
      }}
    />
  }

  private async refreshSoundDerivedState() {
    const nextSounditems = await persist.all();

    this.setState({
      soundItems: nextSounditems,
    })
  }

  private renderList() {
    return <SoundList
      items={this.state.soundItems}
      onDelete={async (item) => {
        await persist.remove(item.name);

        this.refreshSoundDerivedState();
      }}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.content}>
          {this.renderList()}
        </View>
        <View style={styles.footer}>
          <RecordButton onRecorded={(recordedSoundUri) => {
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
    display: 'flex',

  },
  header: {
    flex: .2,
  },
  content: {
    // display: 'flex',
    flex: 1,
    // backgroundColor: 'yellow',
    width: '100%',
  },
  footer: {
    flex: .2,
    // alignSelf: 'center',
    position: 'relative',
    zIndex: 10,
  },
});
