import type { PackEntity, Price, ProductEntity } from "./product";
import type { LocationDetails, UserEntity } from "./user";

export interface OrderDeliveryEntity {
  apartmentName: string | undefined;
  doorNumber: number | undefined;
  location: string | undefined;
  notes?: string;
}

interface Fee {
  vatPercentage: number;
  vat: number;
  preFee: number;
  fee: number;
  preSubTotal: number;
  subTotal: number;
  total: number;
  payable: number;
  currency: string;
  promotions: Array<any>;
}

// A reusable interface for status events in the order's lifecycle.
interface StatusEvent {
  at: number;
  message?: string;
  done: boolean;
}

// A reusable interface for the order timeline with status.
interface TimelineEvent {
  status: string;
  title: string;
  at: number;
  done: boolean;
}

// A reusable interface for cart details in the order (packs and cart ID).
interface CartData {
  type: string;
  cartId: string;
  vendorId: string;
  vendorType: string;
  packs: Array<Array<Pack>>;
}

interface Pack extends PackEntity {
  price: Price;
}

// The main interface for an order, using the reusable components.
interface OrderEntity {
  id: string;
  userId: string;
  driverId: string | null;
  status: {
    created: StatusEvent;
    paid: StatusEvent | null;
    accepted: StatusEvent;
    rejected: StatusEvent | null;
    driverAssigned: StatusEvent | null;
    shipped: StatusEvent | null;
    cancelled: StatusEvent | null;
    completed: StatusEvent | null;
    refunded: StatusEvent | null;
  };
  from: LocationDetails;
  to: LocationDetails;
  dropoffNote: string;
  time: number;
  discount: number;
  payment: string;
  data: CartData;
  fee: Fee;
  done: boolean;
  promotionIds: string[];
  createdAt: number;
  updatedAt: number;
  __hash: string;
  __type: string;
  users: {
    [key: string]: Partial<UserEntity>;
  };
  products: {
    [key: string]: Partial<ProductEntity>;
  };
  timeline: Array<TimelineEvent>;
  activeStatus: string;
}
