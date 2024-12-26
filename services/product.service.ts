import type { PackEntity } from "~/types/product";
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

  static getFoodProducts = async (params?: any) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/products",
      params: {
        where: JSON.stringify([
          { field: "data.type", value: "foods" },
          { field: "inStock", value: true },
        ]),
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

  static createCartLink = async (data: PackEntity[]) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/marketplace/cartLinks",
      data,
    });
  };

  static getCartLink = async (cartId: string) => {
    return ApiService.run({
      method: ApiService.GET,
      url: `/marketplace/cartLinks${cartId}`,
    });
  };

  static getUserCartLinks = async (userId: string) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/cartLinks",
      params: {
        where: JSON.stringify([
          { field: "userId", value: userId, conditon: "eq" },
          { field: "active", value: true },
        ]),
        whereType: "and",
        sort: JSON.stringify([{ field: "createdAt", desc: true }]),
      },
    });
  };
}
