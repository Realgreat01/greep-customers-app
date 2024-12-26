import type { PackEntity } from "~/types/product";
import ApiService from "./api-service.service";

export class MessageService {
  static getChatHistory = async () => {
    return await ApiService.run({
      method: ApiService.GET,
      url: "/messaging/chatMetas",
      params: {
        sort: JSON.stringify([{ field: "last.createdAt", desc: true }]),
      },
    });
  };

  static deleteChatHistory = async (chatId: string) => {
    return await ApiService.run({
      method: ApiService.DELETE,
      url: `/messaging/chatMetas/${chatId}`,
    });
  };

  static sendMessage = async (data: ChatPayload) => {
    return await ApiService.run({
      method: ApiService.POST,
      url: "/messaging/chats",
      data,
      headers: {
        "Content-type": "multipart/form-data",
      },
    });
  };

  static getActiveChat = async (chatId: string) => {
    return await ApiService.run({
      method: ApiService.GET,
      url: `/messaging/chats/`,
      params: {
        where: JSON.stringify([{ field: "to", value: chatId }]),
        // whereType: "and",
      },
    });
  };
}
