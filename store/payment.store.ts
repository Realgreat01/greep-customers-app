import { defineStore } from "pinia";
import { PaymentService } from "~/services/payment.service";
import { UtilsService } from "~/services/utils.service.service";
import type { Price } from "~/types/product";
interface PaymentStore {
  ExchangeRate: { TRY: number; NGN: number; USD: number };
}

export const usePaymentStore = defineStore("PaymentStore", {
  state: (): PaymentStore => {
    return {
      ExchangeRate: { TRY: 1, NGN: 1, USD: 1 },
    };
  },

  getters: {
    exchangeRates(state: PaymentStore): PaymentStore["ExchangeRate"] {
      return state.ExchangeRate;
    },
  },

  actions: {
    async getExchangeRate() {
      const res = await PaymentService.getExchangeRates();
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
