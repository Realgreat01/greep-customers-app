import { defineStore } from "pinia";
import { InteractionService } from "~/services/interactions.service";
import type { TagEntity } from "~/types/product";

interface InteractionStore {
  ProductTags: TagEntity[];
  ProductFoodsTags: TagEntity[];
  ProductItemsTags: TagEntity[];
  interactionLoadingState: {
    loadingTags: boolean;
  };
}

export const useInteractionStore = defineStore("InteractionStore", {
  state: (): InteractionStore => {
    return {
      ProductTags: [],
      ProductFoodsTags: [],
      ProductItemsTags: [],

      interactionLoadingState: {
        loadingTags: false,
      },
    };
  },

  getters: {
    productTags(state: InteractionStore) {
      return state.ProductTags;
    },
    productFoodsTags(state: InteractionStore) {
      return state.ProductFoodsTags;
    },
    productItemsTags(state: InteractionStore) {
      return state.ProductItemsTags;
    },
  },

  actions: {
    async getProductTags() {
      this.interactionLoadingState.loadingTags = true;
      const res = await InteractionService.getProductTags();
      if (res.success) this.ProductTags = res.data.results;
      this.interactionLoadingState.loadingTags = false;
    },
    async getProductFoodsTags() {
      this.interactionLoadingState.loadingTags = true;
      const res = await InteractionService.getProductFoodsTags();
      if (res.success) this.ProductFoodsTags = res.data.results;
      this.interactionLoadingState.loadingTags = false;
    },
    async getProductItemsTags() {
      this.interactionLoadingState.loadingTags = true;
      const res = await InteractionService.getProductItemsTags();
      if (res.success) this.ProductItemsTags = res.data.results;
      this.interactionLoadingState.loadingTags = false;
    },
  },
  persist: true,
});
