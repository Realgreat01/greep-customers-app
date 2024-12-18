import type { TagEntity } from "~/types/product";
import ApiService from "./api-service.service";

export class InteractionService {
  static getProductTags = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/interactions/tags",
    });
  };
}
