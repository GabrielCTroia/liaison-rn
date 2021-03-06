import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../../../styles';
import { RecordButton } from '../RecordButton';
import { SoundList } from '../SoundList/SoundList';
import { SaveSound } from '../SaveSound/SaveSound';
import { AudioRecord, AudioRecordCreation } from '../../types';
import { deepfreeze } from '../../../../lib/deepfreeze';
// import console = require('console');

// This pattern of typeing is inspired by this post
//  https://medium.com/@martin_hotell/10-typescript-pro-tips-patterns-with-or-without-react-5799488d6680
// Not sure I like 100%, but I do see the point behind: the implementation being the source of truth!

type Props = typeof defaultProps & {
  fetch: () => void;
  save: (r: AudioRecordCreation) => void;
  delete: (r: AudioRecord) => void;
};

type State = typeof defaultState;

const defaultProps = deepfreeze({
  audioRecords: [] as AudioRecord[],
});

const defaultState = deepfreeze({
  recordedSoundUri: '',
  queriedAudioRecords: undefined as undefined | AudioRecord[],
});

export class HomeScreen extends Component<Props, State> {

  static navigationOptions = {
    header: null,
  };

  static defaultProps = defaultProps;

  readonly state = defaultState;

  componentDidMount() {
    this.props.fetch();
  }

  private renderSaveAsInput() {
    if (!this.state.recordedSoundUri) {
      return null;
    }

    return <SaveSound
      soundUri={this.state.recordedSoundUri}
      onSave={async (record) => {
        this.setState({ recordedSoundUri: '' });

        this.props.save(record);
      }}
    />
  }

  private renderList() {
    const { queriedAudioRecords } = this.state;

    return <SoundList
      items={queriedAudioRecords ? queriedAudioRecords : this.props.audioRecords}
      onDelete={(record) => this.props.delete(record)}
    />
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}></View>
        <View style={styles.content}>
          {this.renderList()}
        </View>
        <RecordButton
          style={styles.footer}
          onRecorded={(recordedSoundUri) => {
            this.setState({ recordedSoundUri });
          }}
        />
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
    flex: 1,
    width: '100%',
  },
  footer: {
    bottom: 40,
    position: 'absolute',
    zIndex: 10,
  },
});
