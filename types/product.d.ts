interface Price {
  amount: number;
  currency: string;
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

interface ToppingsItem {
  price: Price;
  inStock: boolean;
}

interface Toppings {
  minSelection: number;
  maxSelection: number;
  items: {
    [key: string]: ToppingsItem;
  };
}

interface AddOns {
  toppings: Toppings;
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

interface VendorCartEntity {
  vendorId: CartEntity["vendorId"];
  vendor: CartEntity["vendor"];
  products: CartEntity[];
}

export interface OrderEntity {
  apartmentName: string | undefined;
  doorNumber: number | undefined;
  location: string | undefined;
  notes?: string;
}
