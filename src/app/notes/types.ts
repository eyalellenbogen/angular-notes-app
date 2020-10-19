export interface Note {
  id?: string;
  author: string;
  content: string;
  dateCreated?: Date;
}

export type NotePatch = Omit<Note, 'dateCreated'>;

