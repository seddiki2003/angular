export interface Conference {
  title: string;
  description: string;
  date: Date;
  place: string;
  maxParticipants: number;
  nbParticipants: number;
}

export type ConferenceList = Conference[];
