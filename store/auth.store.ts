import { defineStore } from "pinia";
import PH_CONSTANTS from "~/constants";
import { GP_ROUTES } from "~/constants/routes";
import ApiService from "~/services/api-service.service";

import { AuthService } from "~/services/auth.service";

import type { LoginPayload, UserProfilePayload } from "~/types/auth";
import type { AuthUserEntity, UserEntity } from "~/types/user";
const toast = useToast();
interface UserAuth {
  User: AuthUserEntity | null;
  UserProfile: UserEntity | null;
  IsLoggedIn: boolean;
}

export const useAuthStore = defineStore("AuthStore", {
  state: (): UserAuth => {
    return {
      User: null,
      UserProfile: null,
      IsLoggedIn: false,
    };
  },

  getters: {
    user(): UserAuth["User"] {
      return this.User;
    },

    userProfile(): UserAuth["UserProfile"] {
      return this.UserProfile;
    },

    isLoggedIn(): boolean {
      if (this.user?.id) return true;
      else return this.IsLoggedIn;
    },
  },

  actions: {
    async loginUser(data: LoginPayload) {
      const route = useRoute();
      const router = useRouter();
      const res = await AuthService.login(data);
      if (res.success) {
        ApiService.setAccessToken(res.data.accessToken);
        ApiService.setRefreshToken(res.data.refreshToken);
        this.authUser();
        this.IsLoggedIn = true;
        toast.add({ title: "Login Successful", color: "green" });
        if (route.redirectedFrom) {
          router.replace({ path: route.redirectedFrom.fullPath });
        } else router.replace({ name: GP_ROUTES.DASHBOARD.HOME });
      } else
        toast.add({
          title: "Invalid Credentials",
          color: "red",
        });
    },

    async registerUser(data: LoginPayload) {
      const toast = useToast();

      const res = await AuthService.register(data);
      if (res.success) {
        this.loginUser(data);
      } else {
        console.log(res);
        toast.add({
          title: res.error[0].message ?? "Invalid Credentials",
          color: "red",
        });
      }
    },

    async getUserProfile(userId: string) {
      const res = await AuthService.getUserProfile(userId);
      if (res.success) {
        this.UserProfile = res.data;
      }
    },

    async authUser() {
      const res = await AuthService.currentUser();
      if (res.success) {
        this.User = res.data;
        await this.getUserProfile(res.data.id);
      } else {
        this.exchangeToken();
      }
    },

    async updateUser(data: any) {
      const res = await AuthService.updateUserProfile(data);
      if (res.success) {
        toast.add({
          title: "Details updated successfully !",
          color: "green",
        });
        await this.authUser();
        return true;
      }
    },

    async exchangeToken() {
      const res = await AuthService.exchangeToken();
      if (res.success) {
        ApiService.setAccessToken(res.data.accessToken);
        ApiService.setRefreshToken(res.data.refreshToken);
        this.authUser();
        this.IsLoggedIn = true;
      } else {
        if (res.code === 461) {
          this.logout();
          toast.add({
            title: "Session expired, Kindly login !",
            color: "red",
          });
        }
      }
    },

    async logout() {
      localStorage.clear();
      sessionStorage.clear();
      this.User = null;
      this.IsLoggedIn = false;
      this.$reset();
      await AuthService.logout();
    },
  },
  persist: true,
});
