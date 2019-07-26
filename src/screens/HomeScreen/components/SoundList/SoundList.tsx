import React, { FunctionComponent } from 'react';
import { StyleSheet, ViewProps, View, FlatList, Text } from 'react-native';
import { InputField } from '../../../../components/InputField';
import { Effects } from '../../../../styles';

export type SoundEntry = {
  uri: string;
  name: string;
}

type SoundListProps = ViewProps & {
  items: SoundEntry[];
}

export class SoundList extends React.Component<SoundListProps> {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <InputField style={styles.input} placeholder="Search"/>
        </View>
        <FlatList
          style={styles.list}
          data={this.props.items}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemText}>{item.name}</Text>
            </View>
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
  itemContainer: {
    backgroundColor: 'white',
    padding: 20,
    marginBottom: 1,
  },
  itemText: {
    fontSize: 20,
    fontWeight: 'bold',
  }
});
