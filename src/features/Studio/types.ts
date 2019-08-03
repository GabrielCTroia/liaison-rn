import { DeepReadonly } from '../../lib/deepfreeze';

export type AudioRecord = DeepReadonly<{
  id: string;
  uri: string;
  name: string;
  createdAt: Date;
}>;

export type AudioRecordCreation = DeepReadonly<{
  uri: string;
  name: string;
}>;

export type StudioState = DeepReadonly<{
  audioRecords: AudioRecord[];
}>;
