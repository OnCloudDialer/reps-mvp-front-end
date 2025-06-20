export interface Product {
  id: string;
  name: string;
  description: string;
  default_price: number;
  unit_of_measure: UnitOfMeasure;
  regular_price: number;
  special_price: number;
  announcements: string;
  shareable_info: string;
  ProductPromotion: ProductPromotion[];
  created_at: Date;
  updated_at: Date;
  organizationId: string;
  imageUrls: ImageUrl[];
  userId: string;
}

export interface ProductPromotion {
  id: string;
  created_at: Date;
  productId: string;
  promotionId: string;
  promotion: Promotion;
}

export interface ProductForm {
  id?: string;
  name: string;
  description: string;
  default_price: number;
  unit_of_measure: UnitOfMeasure;
  regular_price: number;
  special_price: number;
  promotion_id: string;
  announcements: string;
  shareable_info: string;
  imageUrls?: string[];
}

export interface ProductQueryParam {
  name?: string;
  promotion?: string;
}

export enum UnitOfMeasure {
  PIECE = "PIECE", // INDIVIDUAL ITEM
  BOX = "BOX", // A BOX OF ITEMS
  CASE = "CASE", // A LARGER GROUPING, OFTEN MULTIPLE BOXES
  PACK = "PACK", // SMALL COLLECTION, LIKE A 6-PACK
  BOTTLE = "BOTTLE", // FOR LIQUIDS
  LITER = "LITER", // METRIC VOLUME
  GALLON = "GALLON", // IMPERIAL VOLUME
  KILOGRAM = "KILOGRAM", // METRIC WEIGHT
  GRAM = "GRAM", // SMALLER METRIC WEIGHT
  POUND = "POUND", // IMPERIAL WEIGHT
  OUNCE = "OUNCE", // SMALLER IMPERIAL WEIGHT
  TUB = "TUB", // LIKE FOR DAIRY, DELI ITEMS
  BAG = "BAG", // E.G. PRODUCE, SNACKS
  JAR = "JAR", // E.G. PRESERVES, SAUCES
  TRAY = "TRAY", // E.G. BAKERY OR MEAT
  PALLET = "PALLET", // BULK SHIPPING
  ROLL = "ROLL", // PAPER, PLASTIC
  DOZEN = "DOZEN", // SETS OF 12
  UNIT = "UNIT", // CATCH-ALL FALLBACK
}

export interface ImageUrl {
  id: number;
  url: string;
  productId: string;
}

export interface PromotionForm {
  id?: string;
  name: string;
  description: string;
  type: PromotionType;
  value?: Value;
  valid_from: Date;
  valid_to: Date;
  is_active: boolean;
  notes_for_rep: string;
}

export interface Promotion {
  id: string;
  name: string;
  description: string;
  type: PromotionType;
  value: Value;
  valid_from: Date;
  valid_to: Date;
  is_active: boolean;
  notes_for_rep: string;
  userId: string;
  created_at: Date;
  updated_at: Date;
}

export enum PromotionType {
  FLAT_DISCOUNT = "FLAT_DISCOUNT",
  BUY_X_GET_Y = "BUY_X_GET_Y",
  BUNDLE = "BUNDLE",
  FREE_GIFT = "FREE_GIFT",
}

export interface Value {}
