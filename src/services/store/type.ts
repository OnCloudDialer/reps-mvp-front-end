import { Contact } from "../contact/type";
import { Tag } from "../tag/type";

export interface Store {
  id: string;
  name: string;
  address: string;
  region: string;
  city: string;
  latitude: number;
  longitude: number;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  userId: string;
  tags: TagElement[];
}

export interface TagElement {
  id: string;
  storeId: string;
  tagId: string;
  tag: Tag;
}

export interface StoreContact {
  id: string;
  storeId: string;
  contactId: string;
  tagId: null;
  contact: Contact;
}

export interface StoreContactQueryParams {
  id: string;
  name?: string;
  roles?: string;
}

export interface StoreQueryParams {
  contactId?: string;
  tags?: string;
  name?: string;
}

export interface StoreForm {
  id?: string;
  name: string;
  address: string;
  city: string;
  region: string;
  latitude: number;
  longitude: number;
  tagIds: string[];
}
