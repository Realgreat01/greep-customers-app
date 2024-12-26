import type { Currency } from "./enums";

interface Price {
  amount: number;
  currency: Currency;
}

interface ImageDetails {
  name: string;
  type: string;
  size: number;
  duration: number;
  path: string;
  timestamp: number;
  link: string;
}

interface AddonItem {
  price: Price;
  inStock: boolean;
  quantity?: number;
}

interface AddOnProperty {
  minSelection: number;
  maxSelection: number;
  items: {
    [key: string]: AddonItem;
  };
}

interface AddOns {
  [key: string]: AddOnProperty;
}
interface SelectedAddOns {
  price: Price;
  quantity: number;
  groupName: string;
  itemName: string;
}

interface ProductData {
  type: string;
  prepTimeInMins: {
    from: number;
    to: number;
  };
}

interface UserBio {
  name: {
    first: string;
    last: string;
    full: string;
  };
  photo: ImageDetails;
  username: string;
}

interface UserRoles {
  isAdmin: boolean;
  isVendor: boolean;
  isVendorFoods: boolean;
}

interface User {
  id: string;
  bio: UserBio;
  roles: UserRoles;
  publicName: string;
}

interface Ratings {
  distribution: {
    [key: string]: number;
  };
  total: number;
  avg: number;
  count: number;
}

interface Meta {
  orders: number;
  total: number;
}

interface ProductEntity {
  id: string;
  title: string;
  description: string;
  banner: ImageDetails;
  price: Price;
  tagIds: string[];
  addOns: AddOns;
  selectedAddOns: SelectedAddOns[];
  inStock: boolean;
  data: ProductData;
  user: User;
  meta: Meta;
  ratings: Ratings;
  createdAt: number;
  updatedAt: number;
  __hash: string;
  __type: string;
  addOnsMap: {
    [key: string]: {
      minSelection: number;
      maxSelection: number;
      price: Price;
      inStock: boolean;
      groupName: string;
      itemName: string;
    };
  };
}

interface CartEntity {
  productId: string;
  product: ProductEntity;
  vendorId: string;
  vendor: User;
  quantity: number;
}

interface PackAddons {
  groupName: string;
  itemName: string;
  quantity: number;
}

export interface PackEntity {
  id: string;
  quantity: number;
  addOns: PackAddons[];
}

export interface CartLinkEntity {
  id: string;
  // packs: Pack[][];
  userId: string;
  vendorId: string;
  vendorType: string;
  active: boolean;
  createdAt: number;
  updatedAt: number;
  __hash: string;
  __type: string;
  products: Record<string, ProductEntity>;
}

interface VendorCartEntity {
  vendorId: CartEntity["vendorId"];
  vendor: CartEntity["vendor"];
  products: CartEntity[];
}

export interface TagEntity {
  id: string;
  type: "productsItems" | "productsFoods";
  title: string;
  parent: string | null;
  photo: ImageDetails | null;
  meta: {
    productsItems: number;
    productsFoods: number;
    orders: number;
    total: number;
  };
}
