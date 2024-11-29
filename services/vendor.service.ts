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

  static getSelectedVendor = async (vendorId: string) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/users/users/${vendorId}`,
    });
  };

  static getVendorProducts = async (vendorId: string, params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        where: JSON.stringify([{ field: "user.id", value: vendorId }]),
        ...params,
      },
    });
  };
}
