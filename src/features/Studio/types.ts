export type AudioRecord = {
  id: string;
  uri: string;
  name: string;
}

export type StudioState = Readonly<{
  audioRecords: ReadonlyArray<AudioRecord>;
}>;
