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

  static getFoodVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.vendorType", value: "foods" }]),
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

  static getNearByFoodVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      // url: "/users/my/vendors",
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.vendorType", value: "foods" }]),
        nearby: true,
      },
    });
  };

  static getNearByMarketVendors = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      // url: "/users/my/vendors",
      url: "/users/users",
      params: {
        where: JSON.stringify([{ field: "type.vendorType", value: "items" }]),
        nearby: true,
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
