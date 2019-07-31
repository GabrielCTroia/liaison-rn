import { SQLite } from 'expo-sqlite';
import PouchDB from 'pouchdb-react-native';
import SQLiteAdapterFactory from 'pouchdb-adapter-react-native-sqlite';
import PouchDBFindPlugin from 'pouchdb-find';

PouchDB.plugin(SQLiteAdapterFactory(SQLite));
PouchDB.plugin(PouchDBFindPlugin);

const db = new PouchDB('liaison', { adapter: 'react-native-sqlite' });

export default db;
