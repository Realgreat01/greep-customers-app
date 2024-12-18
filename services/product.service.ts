import ApiService from "./api-service.service";

export class ProductService {
  static getAllProducts = async (params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        where: JSON.stringify([{ field: "inStock", value: true }]),
        whereType: "and",
        ...params,
      },
    });
  };

  static getMostSoldProducts = async (params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        sort: JSON.stringify([{ field: "meta.orders", desc: true }]),
        ...params,
      },
    });
  };

  static getLatestProducts = async (params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        sort: JSON.stringify([{ field: "createdAt", desc: true }]),
        ...params,
      },
    });
  };

  static getVendorProducts = async (vendorId: string, params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        where: JSON.stringify([
          { field: "user.id", value: vendorId },
          { field: "inStock", value: true },
        ]),
        whereType: "and",
        ...params,
      },
    });
  };

  static getProductsByTag = async (tagId: string, params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        where: JSON.stringify([
          { field: "tagIds", value: tagId, conditon: "in" },
          { field: "inStock", value: true },
        ]),
        whereType: "and",
        ...params,
      },
    });
  };
}
