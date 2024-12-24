<template>
  <UCard
    class="hide-scrollbar h-full overflow-y-scroll"
    :ui="{
      base: 'overflow-hidden flex flex-col h-full ',
      body: {
        padding: 'px-0 py-0 sm:p-0',
      },
    }"
  >
    <template #header>
      <div class="flex items-center justify-between">
        <h3 class="invisible">.</h3>
        <UIcon
          size="3xl"
          class="h-6 w-6 cursor-pointer"
          name="i-icon-cancel"
          @click="emit('close')"
        />
      </div>
    </template>

    <div
      class="flex h-[80vh] flex-1 flex-col justify-between"
      v-if="selectedVendor !== null"
    >
      <VendorName
        :name="selectedVendor?.publicName"
        class="mx-auto my-4 w-fit font-semibold"
      />
      <div class="hide-scrollbar h-[90%] overflow-y-scroll pt-0" ref="chatBox">
        <div class="relative grid gap-2 p-4">
          <template v-for="(messages, date) in conversations">
            <UDivider class="sticky top-1 text-center text-xs text-gray-500">
              <UBadge color="primary" variant="solid">
                {{ gpDates.getReadableDate(date) }}</UBadge
              >
            </UDivider>
            <div class="flex" v-for="chat in messages">
              <div
                class="max-w-[85%] whitespace-break-spaces rounded-lg p-3 text-xs"
                :class="{
                  'ml-auto rounded-tr-none bg-green-500 pl-5 text-white':
                    chat.sender === 'User1',
                  'text-primary rounded-tl-none bg-gray-100 pr-5':
                    chat.sender === 'User2',
                }"
              >
                {{ chat.message }}

                <span
                  class="mt-1 block text-[10px]"
                  :class="{
                    'text-gray-300': chat.sender === 'User1',
                    'text-end text-gray-400': chat.sender === 'User2',
                  }"
                >
                  {{ gpDates.getTime(chat.timestamp) }}
                </span>
              </div>
            </div>
          </template>
        </div>
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
        v-model="message"
        @input="showEmojiPicker = false"
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
        class="h-5 w-5 cursor-pointer"
        @click="sendMessage"
      />
    </div>
  </UCard>
</template>

<script setup lang="ts">
import { useVendorStore } from "~/store/vendor.store";
import EmojiPicker from "vue3-emoji-picker";
import "vue3-emoji-picker/css";

const emit = defineEmits(["close"]);
const { selectedVendor } = storeToRefs(useVendorStore());

const conversations = ref({});
const messageIsSorted = ref(false);
const message = ref("");
const showEmojiPicker = ref(false);
const chatBox = ref<HTMLElement | null>(null);

const onSelectEmoji = (emoji: any) => {
  console.log(emoji);
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

const chats = ref([
  {
    sender: "User1",
    message: "Hi there! How are you doing?",
    timestamp: "2024-12-23T09:00:00Z",
  },
  {
    sender: "User2",
    message: "Hello! I'm doing well, thank you. How about you?",
    timestamp: "2024-12-23T09:01:15Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
  {
    sender: "User1",
    message:
      "I'm great, thanks for asking. Are we still on for the meeting later?",
    timestamp: "2024-12-23T09:02:30Z",
  },
  {
    sender: "User2",
    message: "Yes, absolutely. 2 PM works, right?",
    timestamp: "2024-12-23T09:03:00Z",
  },
  {
    sender: "User1",
    message: "Perfect. See you then!",
    timestamp: "2024-12-23T09:04:10Z",
  },
]);

watchEffect(() => {
  const groupedMessages: any = {};
  for (let i = 0; i < chats.value.length; i++) {
    const dateStr = new Date(chats.value[i].timestamp).toDateString();
    if (!groupedMessages[dateStr]) groupedMessages[dateStr] = [];
    groupedMessages[dateStr].push(chats.value[i]);
  }
  conversations.value = groupedMessages;
  if (Object.keys(groupedMessages).length === chats.value.length)
    messageIsSorted.value = true;
});

const sendMessage = () => {
  if (!message.value) return;

  chats.value.push({
    sender: "User1",
    message: message.value,
    timestamp: new Date().toISOString(),
  });

  message.value = "";
  if (chatBox.value) {
    chatBox.value?.style.setProperty("padding-bottom", "96px");

    chatBox.value.scrollTo({
      top: chatBox?.value.scrollHeight,
      behavior: "smooth",
    });

    setTimeout(() => {
      chatBox.value?.style.setProperty("padding-bottom", "0px");
    }, 50);

    showEmojiPicker.value = false;
  }
};

onMounted(() => {
  if (chatBox.value) {
    chatBox.value.scrollTo({
      top: chatBox?.value.scrollHeight,
    });
  }
});
</script>

<style scoped></style>
