import ApiService from "./api-service.service";

export class VendorService {
  static getVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.type", value: "vendor" }]),
      },
    });
  };
  static getMarketVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.vendorType", value: "items" }]),
      },
    });
  };

  static getFoodVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.vendorType", value: "food" }]),
      },
    });
  };

  static getSelectedVendor = async (vendorId: string) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/users/users/${vendorId}`,
    });
  };
}
