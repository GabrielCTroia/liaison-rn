import { AudioRecord, StudioState } from './types';
import { Dispatch } from 'redux';
import db from '../../db/pouchdb';
import { createAction, createReducer, Action } from 'deox';

const fetchAudioRecordsRequest = createAction('[Studio] Fetch Audio Records');
const fetchAudioRecordsSuccess = createAction('[Studio] Fetch Audio Success', (resolve) => (p: AudioRecord[]) => resolve(p));
const fetchAudioRecordsFailure = createAction('[Studio] Fetch Audio Records Failure', (resolve) => (p: Error) => resolve(p));

export const fetchAudioRecords = async (dispatch: Dispatch) => {
  dispatch(fetchAudioRecordsRequest());

  try {
    const allItems = await db.allDocs({ include_docs: true });
    const asAudioRecords = allItems.rows.map((r: any) => r.doc as AudioRecord);

    dispatch(fetchAudioRecordsSuccess(asAudioRecords));
  } catch (e) {
    fetchAudioRecordsFailure(e);
  }
}

const initialState: StudioState = {
  audioRecords: [],
}

export const reducer = createReducer(initialState, (handleAction) => [
  handleAction(fetchAudioRecordsSuccess, (state, { payload }) => ({
    ...state,
    audioRecords: payload,
  })),
]) 