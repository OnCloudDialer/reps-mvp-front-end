import { Store } from "../store/type";

export interface Tag {
  id: string;
  name: string;
  organizationId: string;
  userId: string;
  stores: TagStore[];
}

export interface TagStore {
  id: string;
  tagId: string;
  storeId: string;
  store: Store;
}
export interface TagForm {
  name: string;
  id?: string;
}
