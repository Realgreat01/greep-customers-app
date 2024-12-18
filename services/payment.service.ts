import ApiService from "./api-service.service";

export class PaymentService {
  getUserWallet = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/payment/wallets",
    });
  };

  getUserTransactions = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/payment/transactions",
    });
  };

  getExchangeRates = async () => {
    {
      return await ApiService.run({
        method: ApiService.GET,
        url: "/payment/transactions/rates",
      });
    }
  };
}
