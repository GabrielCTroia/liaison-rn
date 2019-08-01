import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Colors } from '../../styles';
import { RecordButton } from './components/RecordButton';
import { SoundList, SoundEntry } from './components/SoundList/SoundList';
import { SaveSound } from './components/SaveSound/SaveSound';
import { db } from '../../db';

export type HomeScreenProps = {
  // navigation: NavigationScreenProp<any, any>;
}

type State = {
  recordedSoundUri?: string;
  soundItems: SoundEntry[];
  queriedItems?: SoundEntry[];
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
      queriedItems: undefined,
    }
  }

  private async refreshAllRecordings() {
    const allRecordings = await db.allDocs({ include_docs: true });

    this.setState({
      soundItems: allRecordings.rows.map((r: any) => r.doc as SoundEntry),
    });
  }

  componentWillMount() {
    db.changes({
      since: 'now',
      live: true,
      include_docs: true
    }).on('change', () => {
      // Here we could optimize but there's no need as of now!

      this.refreshAllRecordings();
    });
  }

  componentDidMount() {
    this.refreshAllRecordings();
  }

  private renderSaveAsInput() {
    if (!this.state.recordedSoundUri) {
      return null;
    }

    return <SaveSound
      soundUri={this.state.recordedSoundUri}
      onSaved={async () => {
        this.setState({ recordedSoundUri: undefined });
      }}
    />
  }

  private renderList() {

    return <SoundList
      items={this.state.queriedItems || this.state.soundItems}
      onDelete={(item: any) => {
        db.remove(item);
      }}
      onSearch={(query) => {
        if (!query) {
          this.setState({
            queriedItems: undefined,
          });

          return;
        }

        const normalizedQuery = query.toLowerCase();

        const nextQueriedItems = this.state.soundItems
          .filter((item) => item.name.slice(0, query.length).toLowerCase() === normalizedQuery);

        this.setState({
          queriedItems: nextQueriedItems,
        });
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
