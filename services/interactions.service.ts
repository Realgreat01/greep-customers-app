import type { TagEntity } from "~/types/product";
import ApiService from "./api-service.service";

export class InteractionService {
  static getProductTags = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/interactions/tags",
    });
  };

  static getProductFoodsTags = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/interactions/tags",
      params: {
        where: JSON.stringify([{ field: "type", value: "productsFoods" }]),
      },
    });
  };

  static getProductItemsTags = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/interactions/tags",
      params: {
        where: JSON.stringify([{ field: "type", value: "productsItems" }]),
      },
    });
  };
}
