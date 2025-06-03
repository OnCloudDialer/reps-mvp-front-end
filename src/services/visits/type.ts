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

export interface VisitNoteQueryParams {
  startDate?: string;
  visitId?: string;
  endDate?: string;
}

export interface VisitNoteForm {
  visitId: string;
  note: string;
}

export interface VisitActivityForm {
  visitId: string;
  detail: string;
  type: ActivityType;
}
export enum ActivityType {
  CHECK_PRODUCTS = "CHECK_PRODUCTS",
  DISCUSS_PROMOTIONS = "DISCUSS_PROMOTIONS",
  PLACE_ORDER = "PLACE_ORDER",
  SCHEDULE_FOLLOW_UP = "SCHEDULE_FOLLOW_UP",
  ADD_CONTACT_INFO = "ADD_CONTACT_INFO",
  OTHER = "OTHER",
}
export interface VisitActivityType {
  id: string;
  visitId: string;
  type: ActivityType;
  details: string;
  createdAt: Date;
}
