export type AudioRecord = {
  id: string;
  uri: string;
  name: string;
  createdAt: Date;
}

export type AudioRecordCreation = {
  uri: string;
  name: string;
}

export type StudioState = Readonly<{
  audioRecords: ReadonlyArray<AudioRecord>;
}>;
