import { defineStore } from "pinia";
interface Utils {}

export const useUtilsStore = defineStore("UtilsStore", {
  state: (): Utils => {
    return {};
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
