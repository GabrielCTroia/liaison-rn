import React from 'react';
import { StyleSheet, ViewProps, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects, Colors } from '../../../../styles';
import { Player } from '../../../../lib/Player';
import Swipeout from 'react-native-swipeout';

export type SoundEntry = {
  uri: string;
  name: string;
}

type SoundListProps = ViewProps & {
  items: SoundEntry[];
  onDelete: (item: SoundEntry) => void;
  onSearch: (query: string) => void;
}


export class SoundList extends React.Component<SoundListProps> {
  private player: Player;

  constructor(props: SoundListProps) {
    super(props);

    this.player = new Player();
  }

  static defaultProps = {
    onDelete: () => { },
    onSearch: () => { },
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <InputField
            style={styles.input}
            placeholder="Search"
            onChangeText={(query) => {
              this.props.onSearch(query);
            }}
          />
        </View>
        <FlatList
          style={styles.list}
          data={this.props.items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <Swipeout style={styles.swipeOut} right={[
              {
                text: 'Delete',
                backgroundColor: Colors.red,
                onPress: () => this.props.onDelete(item),
              }
            ]}>
              <View style={styles.itemContainer}>
                <TouchableOpacity onPress={() => this.player.play(item.uri)}>
                  <Text style={styles.itemText}>{item.name}</Text>
                </TouchableOpacity>
              </View>
            </Swipeout>
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // backgroundColor: 'red',
    flex: 1,
    width: '100%',
  },
  searchContainer: {
    paddingHorizontal: 40,
    paddingBottom: 60,
  },
  input: {
    // flex: 1,
    width: '100%',
    ...Effects.shadow,
  },
  list: {
    // marginTop: 60,
  },
  swipeOut: {
    marginBottom: 1,
  },
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,

  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
