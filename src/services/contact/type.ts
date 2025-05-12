import { Store } from "../store/type";

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  profilePicture: null | string;
  role: string;
  organizationId: string;
  userId: string;
  StoreContact?: StoreContact[];
}

export interface StoreContact {
  id: string;
  storeId: string;
  contactId: string;
  store: Store;
}

export interface ContactForm {
  id?: string;
  name: string;
  phone: string;
  email: string;
  profilePicture: null | string;
  role: string;
  storeIds: string[];
}

export interface ContactNoteForm {
  contactId: string;
  note: string;
}

export interface ContactQueryParams {
  name?: string;
  role?: string;
}

export interface ContactNoteQueryParams {
  startDate?: string;
  contactId?: string;
  storeId?: string;
  endDate?: string;
}
