import type { LoginPayload, SignupPayload } from "~/types/auth";
import ApiService from "./api-service.service";

export class AuthService {
  static currentUser = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/auth/user",
    });
  };
  static login = async (data: LoginPayload) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/emails/signin",
      data,
    });
  };

  static register = async (data: LoginPayload) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/emails/signup",
      data,
    });
  };

  static logout = async () => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/auth/user/signout",
    });
  };
}
