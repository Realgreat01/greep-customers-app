import { defineStore } from "pinia";
import { OrderService } from "~/services/orders.service";
import type { OrderEntity } from "~/types/orders";

const toast = useToast();

interface OrderStore {
  Orders: OrderEntity[];
}

export const useOrderStore = defineStore("OrderStore", {
  state: (): OrderStore => ({
    Orders: [],
  }),
  getters: {
    orders: (state: OrderStore) => state.Orders,
  },
  actions: {
    async getOrders() {
      const res = await OrderService.getOrders();
      if (res.success) {
        this.Orders = res.data.results;
      }
    },
  },
});
