<template>
  <div class="flex h-[calc(100vh-76px)] pr-0">
    <div class="flex max-h-[90vh] w-[520px] flex-col gap-4 overflow-auto p-5">
      <h1 class="text-2xl font-bold">Chat History</h1>
      <TransitionGroup
        name="fade"
        tag="div"
        class="relative grid gap-4"
        v-if="chatHistory.length > 0 && user"
      >
        <div
          class="flex w-72 cursor-pointer items-center gap-x-3 rounded-xl border p-2"
          v-for="chat in chatHistory"
          :key="chat.id"
          :class="{
            'bg-primary-500':
              activeChatData.id ===
              messageStore.findReceiverChatId(user.id, chat.last),
          }"
          @click="
            messageStore.setActiveChat(
              messageStore.findReceiverChatId(user.id, chat.last),
              chat.data.type,
              chat.data.type === 'personal'
                ? chat.users[
                    messageStore.findReceiverChatId(user.id, chat.last)
                  ].publicName
                : 'Greep Support',
            )
          "
        >
          <UAvatar
            :src="
              chat.data.type === 'personal'
                ? chat.users[
                    messageStore.findReceiverChatId(user.id, chat.last)
                  ].bio?.photo?.link
                : '/greep.svg'
            "
            :alt="
              chat.users[messageStore.findReceiverChatId(user.id, chat.last)]
                ?.publicName
            "
            size="lg"
          />
          <div class="w-full flex-1">
            <div class="flex w-full items-center justify-between">
              <VendorName
                class="text-sm font-semibold"
                :class="{
                  'text-gray-300':
                    activeChatData.id ===
                    messageStore.findReceiverChatId(user.id, chat.last),
                }"
                :name="
                  chat.data.type === 'personal'
                    ? gpHelpers.sliceWords(
                        chat.users[
                          messageStore.findReceiverChatId(user.id, chat.last)
                        ]?.publicName,
                        14,
                      )
                    : 'Greep Support'
                "
              />
              <h2
                class="text-xs text-gray-700"
                :class="{
                  '!text-gray-400':
                    activeChatData.id ===
                    messageStore.findReceiverChatId(user.id, chat.last),
                }"
              >
                {{ gpDates.getChatsTime(new Date(chat.last.createdAt)) }}
              </h2>
            </div>
            <h2
              class="flex items-end gap-x-1 text-xs text-gray-500"
              :class="{
                '!text-gray-400':
                  activeChatData.id ===
                  messageStore.findReceiverChatId(user.id, chat.last),
              }"
            >
              <UIcon
                name="i-icon-double-check"
                class="h-4 w-4 text-green-500"
              />
              {{ chat.last.body }}
            </h2>
          </div>
        </div>
      </TransitionGroup>
    </div>

    <UDivider orientation="vertical" class="ml-5" />
    <ChatContainer />
  </div>
</template>

<script setup lang="ts">
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";
import { useMessageStore } from "~/store/message.store";

definePageMeta({
  name: GP_ROUTES.MESSAGES.OVERVIEW,
});

const { user } = storeToRefs(useAuthStore());
const { chatHistory, activeChat, activeChatData } =
  storeToRefs(useMessageStore());
const messageStore = useMessageStore();

const chat = {
  id: "666e2a82fb5d2ce8e56f13e5",
  last: {
    id: "676c3cadd98a47945b43295a",
    from: "66486da2ed911ba0869cecfb",
    to: "666e2a82fb5d2ce8e56f13e5",
    body: "Good afternoon",
    links: [],
    media: null,
    data: { type: "support", members: ["66486da2ed911ba0869cecfb"] },
    createdAt: 1735146669443,
    updatedAt: 1735146669443,
    readAt: { "66486da2ed911ba0869cecfb": 1735146669443 },
    __hash: "8fa6f25b37489bc00e51",
    __type: "ChatEntity",
  },
  data: {
    sub: { type: "orders", orderId: "666da2d8ab22e6af9c5de383" },
    type: "support",
  },
  members: ["66486da2ed911ba0869cecfb"],
  createdAt: 1718495874967,
  updatedAt: 1735146669445,
  readAt: { "66486da2ed911ba0869cecfb": 1735146669443 },
  __hash: "d1884637db6126f66059",
  __type: "ChatMetaEntity",
  users: {
    "66486da2ed911ba0869cecfb": {
      id: "66486da2ed911ba0869cecfb",
      bio: {
        username: "dindu569",
        name: { first: "Dindu", last: "Chukwuka", full: "Dindu Chukwuka" },
        photo: {
          name: "rectangle.png",
          type: "image/png",
          size: 7974,
          duration: 0,
          path: "storage/development/profiles/1727519394211-rectangle.png",
          timestamp: 1727519394211,
          link: "https://development.apis.greep.io/api/storage/development/profiles/1727519394211-rectangle.png",
        },
      },
      publicName: "Dindu Stores",
      roles: { isAdmin: true, isVendor: true, isVendorItems: true },
    },
  },
};

const currentChat = {
  id: "666e302cb7d7af6ef12e7641",
  last: {
    id: "676c3ca2d98a47945b43294f",
    from: "66486da2ed911ba0869cecfb",
    to: "666e302cb7d7af6ef12e7641",
    body: "hello",
    links: [],
    media: null,
    data: { type: "support", members: ["66486da2ed911ba0869cecfb"] },
    createdAt: 1735146658014,
    updatedAt: 1735146658014,
    readAt: { "66486da2ed911ba0869cecfb": 1735146658014 },
    __hash: "5a742941235052ecc620",
    __type: "ChatEntity",
  },
  data: {
    sub: { type: "orders", orderId: "6665b3dc630fe47ad23ce4b7" },
    type: "support",
  },
  members: ["66486da2ed911ba0869cecfb"],
  createdAt: 1718497324220,
  updatedAt: 1735146658017,
  readAt: { "66486da2ed911ba0869cecfb": 1735146658014 },
  __hash: "30eb71e0b36f3f502fb6",
  __type: "ChatMetaEntity",
  users: {
    "66486da2ed911ba0869cecfb": {
      id: "66486da2ed911ba0869cecfb",
      bio: {
        username: "dindu569",
        name: { first: "Dindu", last: "Chukwuka", full: "Dindu Chukwuka" },
        photo: {
          name: "rectangle.png",
          type: "image/png",
          size: 7974,
          duration: 0,
          path: "storage/development/profiles/1727519394211-rectangle.png",
          timestamp: 1727519394211,
          link: "https://development.apis.greep.io/api/storage/development/profiles/1727519394211-rectangle.png",
        },
      },
      publicName: "Dindu Stores",
      roles: { isAdmin: true, isVendor: true, isVendorItems: true },
    },
  },
};
</script>

<style scoped>
/* Add your styles here */
</style>
