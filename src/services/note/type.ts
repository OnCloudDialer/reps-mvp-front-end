export interface Note {
  id: string;
  content: string;
  type: string;
  createdAt: Date;
}

export interface NoteForm {
  contactId?: string;
  storeId: string;
  note: string;
}
