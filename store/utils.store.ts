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
  ExchangeRate: { TRY: number; NGN: number; USD: number };
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
      ExchangeRate: { TRY: 1, NGN: 1, USD: 1 },
    };
  },

  getters: {
    getGreetings() {
      const hour = new Date().getHours();
      if (hour <= 12) return "Good Morning";
      if (hour > 12 && hour < 15) return "Good Afternoon";
      if (hour > 15) return "Good Evening";
    },
    exchangeRates(state: UtilsStore): UtilsStore["ExchangeRate"] {
      return state.ExchangeRate;
    },
  },

  actions: {
    async getExchangeRate() {
      const res = await UtilsService.getExchangeRate();
      if (res.success) {
        this.ExchangeRate = res.data;
      }
    },

    getTotalProductCost(prices: Price[]): Price {
      const totalInBaseCurrency = prices.reduce(
        (accum: number, price: Price) => {
          const rate = this.exchangeRates[price.currency] || 1;
          const convertedPrice = price.amount * rate;
          return accum + convertedPrice;
        },
        0,
      );

      return {
        amount: parseFloat(totalInBaseCurrency.toFixed(2)),
        currency: "TRY",
      };
    },
  },
});
