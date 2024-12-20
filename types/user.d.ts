type Coordinates = [number, number];

interface ImageDetails {
  name: string;
  type: string;
  size: number;
  duration: number;
  path: string;
  timestamp: number;
  link: string;
}

interface LocationDetails {
  location: string;
  description: string;
  coords: Coordinates;
  hash: string;
}

interface Ratings {
  avg: number;
  count: number;
  distribution: {
    [key: string]: number;
  };
  total: number;
}

interface Ranking {
  value: number;
  lastUpdatedAt: number;
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

interface Dates {
  createdAt: number;
  deletedAt: number | null;
}

interface UserRoles {
  isAdmin: boolean;
  isVendor: boolean;
  isVendorFoods: boolean;
}

interface UserStatus {
  connections: any[];
  lastUpdatedAt: number;
}

interface AccountMeta {
  referrals: number;
  total: number;
  trips: number;
  customerOrders: number;
  vendorOrders: number;
  driverOrders: number;
}

interface AccountRankings {
  daily: Ranking;
  monthly: Ranking;
  overall: Ranking;
  weekly: Ranking;
}

interface AccountSettings {
  driverAvailable: boolean;
  notifications: boolean;
}

interface AccountApplication {
  accepted: boolean;
  message: string;
}

interface AccountLocation {
  coords: Coordinates;
  location: string;
  description: string;
  hash: string;
}

interface Account {
  application: AccountApplication;
  location: AccountLocation;
  meta: AccountMeta;
  rankings: AccountRankings;
  savedLocations: any[];
  settings: AccountSettings;
  trips: any;
  vendorLocation: null | LocationDetails;
  ratings: Ratings;
}

interface VendorLocation extends LocationDetails {}
export interface VendorSchedule {
  from: { hr: number; min: number };
  to: { hr: number; min: number };
}

interface Vendor {
  name: string;
  email: string;
  website: string;
  location: LocationDetails;
  tags: {
    [key: string]: number;
  };
  averagePrepTimeInMins: {
    from: number;
    to: number;
  };
  schedule: {
    schedule: {
      mon: VendorSchedule | null;
      tue: VendorSchedule | null;
      wed: VendorSchedule | null;
      thu: VendorSchedule | null;
      fri: VendorSchedule | null;
      sat: VendorSchedule | null;
      sun: VendorSchedule | null;
    };
    timezone: string;
  } | null;
}

interface UserType {
  type: string;
  vendorType: string;
  name: string;
  email: string;
  website: string;
  location: LocationDetails;
  banner: ImageDetails;
  passport: ImageDetails;
  residentPermit: ImageDetails;
}

export interface UserEntity {
  id: string;
  bio: UserBio;
  dates: Dates;
  roles: UserRoles;
  status: UserStatus;
  account: Account;
  type: UserType;
  vendor: Vendor;
  __hash: string;
  __type: string;
  publicName: string;
}

// Auth User
interface Photo {
  name: string;
  type: string;
  size: number;
  duration: number;
  path: string;
  timestamp: number;
  link: string;
}

interface Phone {
  code: string;
  number: string;
}

interface Roles {
  isAdmin: boolean;
  isVendor: boolean;
  isVendorFoods: boolean;
}

interface AllNames {
  first: string;
  last: string;
  full: string;
}

export interface AuthUserEntity {
  id: string;
  username: string;
  email: string;
  password: string;
  roles: Roles;
  name: { first: string; last: string };
  photo: Photo;
  phone: Phone;
  isVerified: boolean;
  authTypes: string[];
  referrer: string | null;
  lastSignedInAt: number;
  signedUpAt: number;
  __hash: string;
  __type: string;
  allNames: AllNames;
}
