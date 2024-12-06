import ApiService from "./api-service.service";

export class UtilsService {
  static getExchangeRate = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/payment/transactions/rates",
    });
  };
}
