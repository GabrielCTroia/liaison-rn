import { AudioRecord } from './types';

export const FETCH_AUDIO_RECORDS_REQUEST = 'FETCH_AUDIO_RECORDS_REQUEST';
export const FETCH_AUDIO_RECORDS_SUCCESS = 'FETCH_AUDIO_RECORDS_SUCCESS';
export const FETCH_AUDIO_RECORDS_FAILURE = 'FETCH_AUDIO_RECORDS_FAILURE';

type FetchAudioRecordsRequestAction = {
  type: typeof FETCH_AUDIO_RECORDS_REQUEST,
}

type FetchAudioRecordsSuccessAction = {
  type: typeof FETCH_AUDIO_RECORDS_SUCCESS,
  payload: AudioRecord[];
}

type FetchAudioRecordsFailureAction = {
  type: typeof FETCH_AUDIO_RECORDS_FAILURE,
  error: Error,
}

export type StudioActions =
  FetchAudioRecordsRequestAction |
  FetchAudioRecordsSuccessAction |
  FetchAudioRecordsFailureAction;

export const fetchAudioRecordsRequest = (): StudioActions => ({
  type: 'FETCH_AUDIO_RECORDS_REQUEST',
});

export const fetchAudioRecordsSuccess = (): StudioActions => ({
  type: 'FETCH_AUDIO_RECORDS_SUCCESS',
  payload: [],
});

export const fetchAudioRecordsFailure = (): StudioActions => ({
  type: 'FETCH_AUDIO_RECORDS_FAILURE',
  error: new Error(),
});

