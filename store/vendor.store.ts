import { defineStore } from "pinia";
import { VendorService } from "~/services/vendor.service";
import type { UserEntity, Vendor } from "~/types/user";

interface VendorStore {
  Vendors: UserEntity[];
  FoodVendors: UserEntity[];
  MarketVendors: UserEntity[];
  NearByFoodVendors: UserEntity[];
  NearByMarketVendors: UserEntity[];

  SelectedVendor: UserEntity | null;
  vendorLoadingStates: {
    loadingVendors: boolean;
  };
}

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => {
    return {
      Vendors: [],
      FoodVendors: [],
      MarketVendors: [],
      NearByFoodVendors: [],
      NearByMarketVendors: [],
      SelectedVendor: null,
      vendorLoadingStates: {
        loadingVendors: false,
      },
    };
  },

  getters: {
    vendors(state: VendorStore): VendorStore["Vendors"] {
      return state.Vendors;
    },
    foodVendors(state: VendorStore): VendorStore["Vendors"] {
      return state.FoodVendors;
    },
    nearbyFoodVendors(state: VendorStore): VendorStore["Vendors"] {
      return state.NearByFoodVendors;
    },
    marketVendors(state: VendorStore): VendorStore["Vendors"] {
      return state.MarketVendors;
    },
    nearbyMarketVendors(state: VendorStore): VendorStore["Vendors"] {
      return state.NearByMarketVendors;
    },

    selectedVendor(state: VendorStore): VendorStore["SelectedVendor"] {
      return state.SelectedVendor;
    },
  },

  actions: {
    async getVendors() {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getVendors();
      this.Vendors = res.data.results;
      this.vendorLoadingStates.loadingVendors = false;
    },

    async getMarketVendors() {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getMarketVendors();
      this.MarketVendors = res.data.results;
      this.vendorLoadingStates.loadingVendors = false;
    },

    async getFoodVendors() {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getFoodVendors();
      this.FoodVendors = res.data.results;
      this.vendorLoadingStates.loadingVendors = false;
    },

    async getNearByFoodVendors() {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getNearByFoodVendors();
      this.NearByFoodVendors = res.data.results;
      this.vendorLoadingStates.loadingVendors = false;
    },

    async getNearByMarketVendors() {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getNearByMarketVendors();
      this.NearByMarketVendors = res.data.results;
      this.vendorLoadingStates.loadingVendors = false;
    },

    async getSelectedVendor(vendorId: string) {
      this.vendorLoadingStates.loadingVendors = true;
      const res = await VendorService.getSelectedVendor(vendorId);
      this.SelectedVendor = res.data;
      this.vendorLoadingStates.loadingVendors = false;
    },

    isStoreOpen(schedule: Vendor["schedule"]) {
      if (schedule === null) return false;
      // Get the current date and time in the specified timezone

      const currentDate = new Date();
      const timeZone = schedule.timezone;

      // Set the current day of the week (0: Sunday, 1: Monday, ..., 6: Saturday)
      const currentDay = currentDate.getDay();
      const dayName = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"][
        currentDay
      ];

      // Get the store's schedule for the current day
      const daySchedule = schedule.schedule[dayName];

      // If there's no opening hours for today, the store is closed
      if (!daySchedule || !daySchedule.from || !daySchedule.to) {
        return false;
      }

      // Get the store's opening and closing times for today
      const openingTime = daySchedule.from;
      const closingTime = daySchedule.to;

      // Convert the opening and closing times to Date objects on the current date
      const openingDate = new Date(
        currentDate.setHours(openingTime.hr, openingTime.min, 0, 0),
      );
      const closingDate = new Date(
        currentDate.setHours(closingTime.hr, closingTime.min, 0, 0),
      );

      // Check if the current time is within the store's opening hours
      const currentTime = new Date();

      // Return true if the store is open, false otherwise
      return currentTime >= openingDate && currentTime <= closingDate;
    },
  },
  persist: true,
});
