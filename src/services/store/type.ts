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
  tag: TagTag;
}

export interface TagTag {
  id: string;
  name: string;
  organizationId: string;
  userId: string;
}

export interface StoreContact {
  id: string;
  storeId: string;
  contactId: string;
  tagId: null;
  contact: Contact;
}

export interface Contact {
  id: string;
  name: string;
  phone: string;
  email: string;
  profilePicture: null | string;
  role: string;
  organizationId: string;
  userId: string;
}
