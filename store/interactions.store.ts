import { defineStore } from "pinia";
import { InteractionService } from "~/services/interactions.service";
import type { TagEntity } from "~/types/product";

interface InteractionStore {
  ProductTags: TagEntity[];
  interactionLoadingState: {
    loadingTags: boolean;
  };
}

export const useInteractionStore = defineStore("InteractionStore", {
  state: (): InteractionStore => {
    return {
      ProductTags: [],
      interactionLoadingState: {
        loadingTags: false,
      },
    };
  },

  getters: {
    productTags(state: InteractionStore) {
      return state.ProductTags;
    },
  },

  actions: {
    async getProductTags() {
      this.interactionLoadingState.loadingTags = true;
      const res = await InteractionService.getProductTags();
      if (res.success) this.ProductTags = res.data.results;
      this.interactionLoadingState.loadingTags = false;
    },
  },
  persist: true,
});
