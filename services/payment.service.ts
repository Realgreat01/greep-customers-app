import ApiService from "./api-service.service";

export class PaymentService {
  static getExchangeRates = async () => {
    {
      return await ApiService.run({
        method: ApiService.GET,
        url: "/payment/transactions/rates",
      });
    }
  };

  static getUserWallet = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/payment/wallets",
    });
  };

  static getUserTransactions = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/payment/transactions",
    });
  };
}
