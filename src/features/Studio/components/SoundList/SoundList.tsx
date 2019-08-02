import React, { Component } from 'react';
import { StyleSheet, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects, Colors } from '../../../../styles';
import { Player } from '../../../../lib/Player';
import Swipeout from 'react-native-swipeout';
import { AudioRecord } from '../../types';
import { deepfreeze } from '../../../../lib/deepfreeze';

type Props = typeof defaultProps;

const defaultProps = {
  ...deepfreeze({
    items: [] as AudioRecord[],
  }),
  onDelete: (_: AudioRecord) => { },
  onSearch: (_: string) => { },
};

export class SoundList extends Component<Props> {
  private player: Player = new Player();

  static defaultProps = defaultProps;

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
