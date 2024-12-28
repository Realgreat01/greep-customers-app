<template>
  <template
    v-if="(user && activeChat.length > 0) || (user && activeChatData.id !== '')"
  >
    <div
      class="hide-scrollbar relative flex h-[calc(100vh-80px)] w-full flex-col justify-between overflow-y-scroll"
    >
      <div
        class="bg-primary flex-center sticky top-0 z-[10] flex h-12 rounded text-gray-100"
      >
        <VendorName
          :name="activeChatData.name"
          class="mx-auto my-4 w-fit font-semibold"
        />
      </div>
      <div class="hide-scrollbar h-[90%] overflow-y-scroll pt-0" ref="chatBox">
        <div class="relative grid gap-2 p-4">
          <template
            v-for="(messages, date, index) in conversations"
            :key="date"
          >
            <div
              class="flex-center sticky top-1 flex w-full text-center text-xs text-gray-500"
            >
              <UBadge
                color="primary"
                variant="solid"
                class="flex w-32 items-center justify-center px-0 text-center"
              >
                {{ gpDates.getReadableDate(date as string) }}</UBadge
              >
            </div>
            <div class="flex" v-for="chat in messages">
              <div
                class="max-w-[85%] whitespace-break-spaces rounded-lg p-3 text-xs"
                :class="{
                  'ml-auto rounded-tr-none bg-green-500 pl-5 text-white':
                    chat.from === user.id || chat?.isNew,
                  'text-primary rounded-tl-none bg-gray-100 pr-5':
                    chat.from !== user.id,
                }"
              >
                {{ chat.body }}

                <span
                  class="mt-1 flex items-center justify-end text-[10px]"
                  :class="{
                    'text-end text-gray-300': chat.from === user.id,
                    'text-end text-gray-400': chat.from !== user.id,
                  }"
                >
                  {{ gpDates.getTime(new Date(chat.createdAt)) }}
                  <UIcon
                    :name="chat?.isNew ? 'i-icon-timer' : 'i-icon-double-check'"
                    class="h-3 w-3"
                  />
                </span>
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="absolute bottom-14 left-4" v-if="showEmojiPicker">
        <EmojiPicker
          :native="false"
          mode="append"
          hide-search
          display-recent
          disable-skin-tones
          :static-texts="{ placeholder: '' }"
          @select="onSelectEmoji"
        />
      </div>
      <div class="flex h-14 w-full items-center gap-x-2 px-2">
        <UInput
          class="text-primary m-2 mt-1 w-3/4 flex-1"
          color="gray"
          autofocus
          leading
          trailing
          v-model="message"
          @input="showEmojiPicker = false"
          @keyup.enter="sendMessage"
          :ui="{
            rounded: 'rounded-full',
            base: 'text-gray-500',
            icon: { leading: { pointer: '' }, trailing: { pointer: '' } },
          }"
          size="lg"
          autocomplete="off"
        >
          <template #leading>
            <UIcon
              name="i-icon-emoji"
              class="h-5 w-5 cursor-pointer"
              @click="showEmojiPicker = !showEmojiPicker"
            />
          </template>
          <template #trailing>
            <div class="flex">
              <UDropdown :items="items" :popper="{ placement: 'bottom-start' }">
                <UIcon name="i-icon-plus" class="h-5 w-5 cursor-pointer" />
              </UDropdown>
            </div>
          </template>
        </UInput>
        <UIcon
          name="i-icon-send"
          class="h-7 w-7 cursor-pointer"
          @click="sendMessage"
        />
      </div>
    </div>
  </template>
  <template v-else>
    <div
      class="flex h-full w-full flex-col items-center justify-center text-gray-400"
    >
      <UIcon
        name="i-icon-chat"
        block
        class="block h-20 w-20 text-center opacity-50"
      />
      <h1 class="text-sm">Select a converstion to continue</h1>
    </div>
  </template>
</template>

<script setup lang="ts">
import EmojiPicker from "vue3-emoji-picker";

import { useVendorStore } from "~/store/vendor.store";
import { useMessageStore } from "~/store/message.store";
import { useAuthStore } from "~/store/auth.store";

const emit = defineEmits(["close"]);

interface GroupedMessages {
  [date: string]: ChatEntity[]; // Keys are dates, values are arrays of ChatMessage
}

const { activeChat, ActiveChat, activeChatData } =
  storeToRefs(useMessageStore());
const messageStore = useMessageStore();

const { user } = storeToRefs(useAuthStore());
const conversations = ref<GroupedMessages>({});
const messageIsSorted = ref(false);
const message = ref("");
const showEmojiPicker = ref(false);
const chatBox = ref<HTMLElement | null>(null);

const onSelectEmoji = (emoji: any) => {
  message.value += emoji.i;
};

const items = ref([
  [
    {
      label: "Gallery",
      icon: "i-icon-gallery",
    },
    {
      label: "Camera",
      icon: "i-icon-camera-snap",
    },
    {
      label: "Location",
      icon: "i-icon-location-pin",
    },
    {
      label: "Voice Note",
      icon: "i-icon-voice",
    },
  ],
]);

watchEffect(() => {
  const groupedMessages: GroupedMessages = {};
  for (let i = 0; i < activeChat.value.length; i++) {
    const dateStr = new Date(activeChat.value[i].createdAt).toDateString();
    if (!groupedMessages[dateStr]) groupedMessages[dateStr] = [];
    groupedMessages[dateStr].push(activeChat.value[i]);
  }
  conversations.value = groupedMessages;
  if (Object.keys(groupedMessages).length === activeChat.value.length)
    messageIsSorted.value = true;
});

const sendMessage = () => {
  if (!message.value) return;

  if (activeChat.value.length > 0 && user.value !== null) {
    messageStore.setActiveChat(
      messageStore.findReceiverChatId(
        user.value.id,
        activeChat.value[activeChat.value.length - 1],
      ),
      activeChat.value[activeChat.value.length - 1].data.type,
      activeChatData.value.name,
    );
    ActiveChat.value.push({
      ...activeChat.value[activeChat.value.length - 1],
      to: messageStore.findReceiverChatId(
        user.value.id,
        activeChat.value[activeChat.value.length - 1],
      ),
      body: message.value,
      isNew: true,
      createdAt: new Date().getTime(),
    });
  }

  messageStore.sendMessage({
    to: activeChatData.value.id,
    body: message.value,
    type: activeChatData.value.type,
    receiverName: activeChatData.value.name,
  });

  message.value = "";
  showEmojiPicker.value = false;

  if (chatBox.value) {
    chatBox.value?.style.setProperty("padding-bottom", "96px");
    chatBox.value.scrollTo({
      top: chatBox?.value.scrollHeight,
      behavior: "smooth",
    });

    chatBox.value.addEventListener("scroll", () => {
      chatBox.value?.style.setProperty("padding-bottom", "0px");
    });
  }
};

watch(activeChat, () => {
  if (chatBox.value) {
    chatBox.value?.style.setProperty("padding-bottom", "96px");
    chatBox.value.scrollTo({
      top: chatBox?.value.scrollHeight,
      behavior: "smooth",
    });
  }
});

onMounted(() => {
  setTimeout(() => {
    if (chatBox.value) {
      chatBox.value.scrollTo({
        top: chatBox?.value.scrollHeight,
      });
      chatBox.value.addEventListener("scroll", () => {
        chatBox.value?.style.setProperty("padding-bottom", "0px");
      });
    }
  }, 500);
});
</script>

<style scoped></style>
