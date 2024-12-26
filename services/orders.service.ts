import type { PackEntity } from "~/types/product";
import ApiService from "./api-service.service";

export class OrderService {
  static getOrders = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/marketplace/orders",
      params: {
        sort: JSON.stringify([{ field: "createdAt", desc: true }]),
      },
    });
  };

  static getOrderById = async (orderId: string) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/marketplace/orders/${orderId}`,
    });
  };

  static createOrder = async (data: PackEntity) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/marketplace/orders",
      data,
    });
  };

  static updateOrder = async (orderId: string, data: Partial<PackEntity>) => {
    return await ApiService.run({
      method: ApiService.PUT,
      url: `/marketplace/orders/${orderId}`,
      data,
    });
  };

  static deleteOrder = async (orderId: string) => {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/marketplace/orders/${orderId}`,
    });
  };
}
