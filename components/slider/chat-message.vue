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

    <ChatContainer />
  </UCard>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
</script>

<style scoped></style>
