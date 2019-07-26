import { AsyncStorage } from 'react-native';

export class Persist {
  private prefix = '@Liaison-';

  async create(key: string, value: string | Object) {
    const val = (typeof value === 'string')
      ? value
      : JSON.stringify(value);

    await AsyncStorage.setItem(this.prefix + key, val);
  }

  async get(key: string) {
    return await AsyncStorage.getItem(this.prefix + key);
  }

  async all() {
    const all = await AsyncStorage.multiGet(await AsyncStorage.getAllKeys());

    return all.map((r) => JSON.parse(r[1]));
  }

  async remove(key: string) {
    await AsyncStorage.removeItem(this.prefix + key);
  }
}