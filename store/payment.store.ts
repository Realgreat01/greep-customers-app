import { useStorage } from "@vueuse/core";
import { defineStore } from "pinia";
import { PaymentService } from "~/services/payment.service";
import { Currency } from "~/types/enums";
import type { WalletCardEntity, WalletEntity } from "~/types/payment";
import { type Price } from "~/types/product";

const cardStorage = useStorage<{
  WalletCard: WalletCardEntity[];
  SelectedCard: WalletCardEntity | null;
}>("Card", {
  WalletCard: [],
  SelectedCard: null,
});
interface PaymentStore {
  ExchangeRate: { TRY: number; NGN: number; USD: number };
  Wallet: WalletEntity;
  TransactionsHistory: any;
}

export const usePaymentStore = defineStore("PaymentStore", {
  state: (): PaymentStore => {
    return {
      ExchangeRate: { TRY: 1, NGN: 1, USD: 1 },
      Wallet: {
        balance: { amount: 0, currency: Currency.TRY },
        hasPin: false,
      },
      TransactionsHistory: [],
    };
  },

  getters: {
    exchangeRates: (state: PaymentStore) => state.ExchangeRate,
    wallet: (state: PaymentStore) => state.Wallet,
    transactionsHistory: (state: PaymentStore) => state.TransactionsHistory,
    walletCards: () => cardStorage.value.WalletCard,
    isCardAdded: () => cardStorage.value.WalletCard.length > 0,
    selectedCard: () => cardStorage.value.SelectedCard,
    supportedCurrencies: () => [
      {
        currency: Currency.TRY,
        flag: "i-icon-flag-try",
      },
      {
        currency: Currency.NGN,
        flag: "i-icon-flag-ngn",
      },
    ],
  },

  actions: {
    async getExchangeRate() {
      const res = await PaymentService.getExchangeRates();
      if (res.success) {
        this.ExchangeRate = res.data;
      }
    },
    async getUserWallet() {
      const res = await PaymentService.getUserWallet();
      if (res.success) {
        this.Wallet = res.data;
      }
    },

    addUserCard(card: WalletCardEntity) {
      cardStorage.value.WalletCard.push(card);
    },

    selectCard(card: WalletCardEntity) {
      cardStorage.value.SelectedCard = card;
    },

    async getUserTransactions() {
      const res = await PaymentService.getUserTransactions();
      if (res.success) {
        this.TransactionsHistory = res.data.results;
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
        currency: Currency.TRY,
      };
    },

    maskCardNumber: (cardNumber: string) => {
      const masked = cardNumber
        .split("")
        .map((i, index) => (index < 10 ? (i = "*") : i));
      return {
        masked: masked.join(""),
        actual: cardNumber,
      };
    },
  },
});
