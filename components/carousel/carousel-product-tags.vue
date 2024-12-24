<template>
  <div class="ml-12 h-fit !max-w-[calc(100vw-380px)]">
    <UCarousel
      v-slot="{ item }"
      :items="productTags"
      class="rounded-lg"
      :ui="{
        item: 'mr-4',
        wrapper: '',
        container:
          'relative w-full flex overflow-x-scroll  snap-x snap-mandatory scroll-smooth',
        // container: 'rounded-lg p-2 ',
      }"
      :prev-button="{
        color: 'gray',
        icon: 'i-icon-carousel-left',
        class: '-start-12 -mt-2.5',
      }"
      :next-button="{
        color: 'gray',
        icon: 'i-icon-carousel-right',
        class: '-end-12 -mt-2.5',
      }"
      arrows
    >
      <div
        @click="selectTag(item?.id)"
        class="flex-center flex flex-col gap-y-2 text-center text-xs font-medium"
      >
        <UAvatar
          :src="item?.photo?.link ?? placeholderImage"
          :alt="item?.title"
          :class="[
            route.params.tagId === item?.id ? 'border-primary border' : '',
          ]"
          size="lg"
          color="primary"
        />
        <h2
          class="whitespace-nowrap first-letter:capitalize"
          :class="[
            route.params.tagId === item?.id
              ? 'text-sm font-semibold text-green-500'
              : '',
          ]"
        >
          {{ item?.title }}
        </h2>
      </div>
    </UCarousel>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";
import { GP_ROUTES } from "~/constants/routes";
import { useInteractionStore } from "~/store/interactions.store";
import type { TagEntity } from "~/types/product";

const router = useRouter();
const { interactionLoadingState } = storeToRefs(useInteractionStore());

const props = defineProps({
  productTags: {
    type: Object as PropType<TagEntity[]>,
    required: true,
  },
  route: {
    type: String,
    default: GP_ROUTES.DASHBOARD.PRODUCTS_TAG,
  },
});

const placeholderImage = ref(
  "https://development.apis.greep.io/api/storage/development/interactions/tags/1724521682213-frame%2010682%20(1).png",
);

const selectTag = (tagId: string) => {
  router.push({
    name: props.route,
    params: { tagId },
  });
};

const route = useRoute();
</script>

<style scoped></style>
