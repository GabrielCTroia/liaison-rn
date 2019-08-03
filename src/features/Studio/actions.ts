import { AudioRecord, StudioState, AudioRecordCreation } from './types';
import { createAction, createReducer } from 'deox';

const initialState: StudioState = {
  audioRecords: [],
}

export const fetchAudioRecordsRequest = createAction('[Studio] REQUEST: Fetch Audio Records');
export const fetchAudioRecordsSuccess = createAction('[Studio] SUCCESS: Fetch Audio Records', (resolve) => (p: AudioRecord[]) => resolve(p));
export const fetchAudioRecordsFailure = createAction('[Studio] FAILURE: Fetch Audio Records ', (resolve) => (p: Error) => resolve(p));

export const saveAudioRecordRequest = createAction('[Studio] REQUEST: Save Audio Record', (resolve) => (p: AudioRecordCreation) => resolve(p));
export const saveAudioRecordSuccess = createAction('[Studio] SUCCESS: Save Audio Record', (resolve) => (p: AudioRecord) => resolve(p));
export const saveAudioRecordFailure = createAction('[Studio] FAILURE: Save Audio Record', (resolve) => (p: Error) => resolve(p));

export const deleteAudioRecordRequest = createAction('[Studio] REQUEST: Delete Audio Record', (resolve) => (p: AudioRecord) => resolve(p));
export const deleteAudioRecordSuccess = createAction('[Studio] SUCCESS: Delete Audio Record', (resolve) => (p: AudioRecord) => resolve(p));
export const deleteAudioRecordFailure = createAction('[Studio] FAILURE: Delete Audio Record', (resolve) => (p: Error) => resolve(p));

export const reducer = createReducer(initialState, (handleAction) => [
  handleAction(fetchAudioRecordsSuccess, (state, { payload }) => ({
    ...state,
    audioRecords: payload,
  })),
  handleAction(saveAudioRecordSuccess, (state, { payload }) => ({
    ...state,
    audioRecords: [payload].concat(state.audioRecords),
  })),
  handleAction(deleteAudioRecordSuccess, (state, { payload }) => ({
    ...state,
    audioRecords: state.audioRecords.filter((r) => r.id !== payload.id),
  })),
]) 