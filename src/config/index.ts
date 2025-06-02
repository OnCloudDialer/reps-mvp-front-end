import { UnitOfMeasure } from "../services/product/type";
import { VisitType } from "../services/visits/type";

export const Config = {
  baseApiUrl: import.meta.env.VITE_API_URL,
  googleMapApiKey: import.meta.env.VITE_GOOGLE_MAP_API_KEY,
};

export const contactRole = ["STORE_MANAGER", "BUYER", "OWNER", "OTHER"]; // enum values
export const UnitOfMeasureArray: Array<UnitOfMeasure> =
  Object.values(UnitOfMeasure);

export const VisitTypesArray: Array<VisitType> = Object.values(VisitType);
