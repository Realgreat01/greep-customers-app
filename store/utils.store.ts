import { defineStore } from "pinia";
import { UtilsService } from "~/services/utils.service.service";
import type { Price } from "~/types/product";
interface UtilsStore {
  cartModal: boolean;
  profileModal: boolean;
  checkOutModal: boolean;
  orderDetailsModal: boolean;
  productPreviewModal: boolean;
  remarksModal: boolean;
}

export const useUtilsStore = defineStore("UtilsStore", {
  state: (): UtilsStore => {
    return {
      cartModal: false,
      profileModal: false,
      checkOutModal: false,
      orderDetailsModal: false,
      productPreviewModal: false,
      remarksModal: false,
    };
  },

  getters: {},

  actions: {},
});
