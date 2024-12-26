import { defineStore } from "pinia";
import { MessageService } from "~/services/message.service";

const toast = useToast();

interface MessageStore {
  ChatHistory: ChatHistoryEntity[];
  ActiveChat: ChatEntity[];
  ActiveChatData: { type: "personal" | "support"; id: string; name: string };
}

export const useMessageStore = defineStore("MessageStore", {
  state: (): MessageStore => ({
    ChatHistory: [],
    ActiveChat: [],
    ActiveChatData: { type: "personal", id: "", name: "" },
  }),

  getters: {
    chatHistory: (state: MessageStore) => state.ChatHistory,
    activeChat: (state: MessageStore) => state.ActiveChat,
    activeChatData: (state: MessageStore) => state.ActiveChatData,
  },
  actions: {
    async getChatHistory() {
      const res = await MessageService.getChatHistory();
      if (res.success) {
        this.ChatHistory = res.data.results;
      }
    },
    async deleteChatHistory(chatId: string) {
      const res = await MessageService.deleteChatHistory(chatId);
      if (res.success) {
        this.getChatHistory();
        toast.add({
          title: "Chat history deleted successfully",
          color: "red",
        });
      }
    },

    async setActiveChat(
      chatId: string,
      type: "personal" | "support" = "support",
      name: string = "",
    ) {
      this.ActiveChatData = { type, id: chatId, name };
      const res = await MessageService.getActiveChat(chatId);
      if (res.success) {
        this.ActiveChat = res.data.results;
      }
    },

    async sendMessage(data: ChatPayload) {
      const res = await MessageService.sendMessage(data);
      if (res.success) {
        this.setActiveChat(data.to, data.type, data.receiverName);
        this.getChatHistory();
      }
    },

    findReceiverChatId(searchString: string, searchedObject: ChatEntity) {
      let result = "";
      if (searchedObject.from !== searchString) {
        result = searchedObject.from;
      }
      if (searchedObject.to !== searchString) {
        result = searchedObject.to;
      }
      return result;
    },
  },
});
