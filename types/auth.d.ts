export interface LoginPayload {
  email: string;
  password: string;
}
export interface SignupPayload {
  email: string;
  password: string;
}
export interface UserProfilePayload {
  firstName: string;
  lastName: string;
  username: string;
  phone?: { code: string; number: string };
  photo?: File | any;
}
