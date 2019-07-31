import { SQLite } from 'expo-sqlite';
import PouchDB from 'pouchdb-react-native';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';

PouchDB.plugin(SQLiteAdapterFactory(SQLite));

const db = new PouchDB('liaison', { adapter: 'react-native-sqlite' });

export default db;
