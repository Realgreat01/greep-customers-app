<template>
  <main class="hide-scrollbar relative h-screen overflow-hidden">
    <div
      class="relative h-screen w-screen lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[700px]"
    >
      <div
        style="
          background-image: url(&quot;/images/auth-bg.png&quot;);
          background-position: center;
          background-repeat: no-repeat;
          background-size: cover;
        "
        class="absolute !top-0 bottom-0 hidden max-h-screen w-screen overflow-y-hidden lg:block"
      ></div>
      <div
        class="hide-scrollbar absolute right-0 ml-auto flex h-screen w-full items-center justify-center overflow-y-scroll bg-white lg:w-[45vw] lg:bg-transparent"
      >
        <div
          class="hide-scrollbar right-0 flex w-full flex-col items-center justify-center gap-1 overflow-y-scroll rounded-lg pb-0 lg:w-[480px] lg:p-4 lg:pt-[40px]"
        >
          <img src="/greep.svg" alt="" class="h-12 w-12" />
          <h1 class="text-[22px] font-bold">
            {{ route.meta?.pageTitle }}
          </h1>
          <h2 class="text-sm font-light text-gray-500">
            {{ route.meta?.titleHint }}
          </h2>
          <div
            class="hide-scrollbar flex-1 overflow-y-scroll lg:h-[720px] lg:w-[460px] lg:p-4"
          >
            <slot />
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
</script>

<style></style>
