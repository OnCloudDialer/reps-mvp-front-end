import { Contact } from "../contact/type";
import { Store } from "../store/type";

export interface VisitForm {
  id?: string;
  storeId: string;
  contactId: string;
  scheduledAt: Date;
}

export interface Visit {
  id: string;
  storeId: string;
  store: Store;
  contactId: string;
  contact: Contact;
  scheduledAt: Date;
  startedAt: null;
  endedAt: null;
  visitType: VisitType;
  followUpDate: null;
  createdAt: Date;
  updatedAt: Date;
  organizationId: string;
  userId: string;
}
export enum VisitType {
  SALES = "SALES",
  AUDIT = "AUDIT",
  SUPPORT = "SUPPORT",
  MERCHANDISING = "MERCHANDISING",
  OTHER = "OTHER",
}

export interface VisitQueryParams {
  contactId?: string;
  tags?: string;
  name?: string;
}
