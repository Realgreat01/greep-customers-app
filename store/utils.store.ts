import { defineStore } from "pinia";
interface Utils {
  cartModal: boolean;
  profileModal: boolean;
  checkOutModal: boolean;
  orderDetailsModal: boolean;
  remarksModal: boolean;
}

export const useUtilsStore = defineStore("UtilsStore", {
  state: (): Utils => {
    return {
      cartModal: false,
      profileModal: false,
      checkOutModal: false,
      orderDetailsModal: false,
      remarksModal: false,
    };
  },

  getters: {
    getGreetings() {
      const hour = new Date().getHours();
      if (hour <= 12) return "Good Morning";
      if (hour > 12 && hour < 15) return "Good Afternoon";
      if (hour > 15) return "Good Evening";
    },
  },

  actions: {},
});
