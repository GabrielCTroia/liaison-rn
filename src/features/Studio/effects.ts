import { AudioRecord, AudioRecordCreation } from './types';
import { Dispatch } from 'redux';
import * as FileSystem from 'expo-file-system';
import { db } from '../../db';

import {
  fetchAudioRecordsRequest,
  fetchAudioRecordsFailure,
  fetchAudioRecordsSuccess,
  saveAudioRecordRequest,
  saveAudioRecordFailure,
  saveAudioRecordSuccess,
  deleteAudioRecordRequest,
  deleteAudioRecordFailure,
  deleteAudioRecordSuccess,
} from './actions';

export const fetchAudioRecords = () => async (dispatch: Dispatch) => {
  dispatch(fetchAudioRecordsRequest());

  try {
    const allItems = await db.allDocs({ include_docs: true });
    const asAudioRecords = allItems.rows.map((r: any) => ({
      ...r.doc,
      createdAt: new Date(r.doc.createdAt),
    }) as AudioRecord);

    dispatch(fetchAudioRecordsSuccess(asAudioRecords));
  } catch (e) {
    dispatch(fetchAudioRecordsFailure(e));
  }
}

export const saveAudioRecord = (record: AudioRecordCreation) => async (dispatch: Dispatch) => {
  dispatch(saveAudioRecordRequest(record));

  try {
    const fileName = record.uri.split('/').slice(-1)[0];
    const nextUri = `${FileSystem.documentDirectory}${fileName}`;

    // TODO: Try to save it in the DB instead of the file system
    await FileSystem.copyAsync({
      from: record.uri,
      to: nextUri,
    });

    const audioRecord = {
      userId: 0, // This is hardcoded as me for now. Just here to allow me to think of users
      name: record.name,
      uri: nextUri,
      createdAt: new Date().getTime(),
    }

    const entryStatus = await db.post(audioRecord);

    if (entryStatus.ok) {
      dispatch(saveAudioRecordSuccess({
        ...audioRecord,
        id: entryStatus.id,
        createdAt: new Date(audioRecord.createdAt),
      }));
    } else {
      throw entryStatus;
    }
  } catch (e) {
    dispatch(saveAudioRecordFailure(e));
  }
}

export const deleteAudioRecord = (record: AudioRecord) => async (dispatch: Dispatch) => {
  dispatch(deleteAudioRecordRequest(record));

  try {
    // TODO: This fetches the Record before deleting, but I think that's OK!
    // It needs to be this way simply because pouchdb does a lookup on
    //  _id and _rev properties and I don't store those in the view for now!
    const status = await db.remove(await db.get(record.id));

    if (status.ok) {
      dispatch(deleteAudioRecordSuccess(record));
    } else {
      throw status;
    }
  } catch (e) {
    dispatch(deleteAudioRecordFailure(e));
  }
}