<template>
  <VeeForm v-slot="{ handleSubmit, isSubmitting }" class="h-fit">
    <UForm
      :schema="schema"
      :state="state"
      class="mx-auto mt-4 grid w-full gap-4 p-2"
      @submit.prevent="handleSubmit($event, updateUser)"
    >
      <UFormGroup label="Firstname" name="firstName" required>
        <UInput v-model="state.firstName" placeholder="John" />
      </UFormGroup>

      <UFormGroup label="Lastname" name="lastName" required>
        <UInput v-model="state.lastName" placeholder="Doe" />
      </UFormGroup>
      <UFormGroup label="Username" name="username" required>
        <UInput v-model="state.username" placeholder="john_doe" />
      </UFormGroup>

      <UFormGroup label="Phone" name="phone" required>
        <VueTelInput
          v-bind="telProps"
          v-model="state.phone"
          class="!focus-visible:outline-none !focus-visible:ring-2 !focus-within:border-[#000] !focus-visible:ring-ring !focus-visible:ring-offset-2 !border-input !ring-offset-background !rounded-md !border py-1 !shadow-none"
          @validate="showOptions"
        />
      </UFormGroup>

      <UFormGroup label="Photo" name="photo" required>
        <UButton
          type="button"
          block
          color="blue"
          label="Choose Photo"
          variant="soft"
          @click="open"
        >
          <template #trailing>
            <UAvatar :src="user?.photo.link" size="xs" v-if="!photo" />
            <UAvatar :src="getImageURL(photo)" size="xs" v-else />
          </template>
        </UButton>
      </UFormGroup>

      <UButton
        :loading="isSubmitting"
        type="submit"
        label="Update Profile"
        block
        class="mb-2 h-12"
      />
    </UForm>
  </VeeForm>
</template>

<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { object, string } from "yup";
import { VueTelInput } from "vue-tel-input";
import { useFileDialog } from "@vueuse/core";
import { useAuthStore } from "~/store/auth.store";
import type { UserProfilePayload } from "~/types/auth";

const authStore = useAuthStore();
const emits = defineEmits(["closeProfileUpdateModal"]);
const { user } = storeToRefs(useAuthStore());
const show = ref(false);
const phoneDetails = ref<any>(null);

const state: UserProfilePayload = reactive({
  firstName: user.value?.name.first ?? "",
  lastName: user.value?.name.last ?? "",
  username: user.value?.username ?? "",
  phone: `${user.value?.phone?.code}${user.value?.phone?.number}`,
});

const router = useRouter();
const toast = useToast();
const photo = ref<File | null>(null);

const { files, open, reset, onCancel, onChange } = useFileDialog({
  accept: "image/*",
});

const getImageURL = (image: File) => URL.createObjectURL(image);

onChange(() => {
  const maxFileSize = 1024 * 1024;
  if (files.value) {
    const validFiles = files.value[0].size <= maxFileSize;
    if (validFiles) {
      photo.value = files.value[0];
    } else {
      toast.add({ title: "Upload file less than 1MB" });
    }
  }
});

const showOptions = (opts: any) => {
  phoneDetails.value = opts;
};

const telProps = ref({
  preferredCountries: ["NG", "GB"],
  placeholder: "Enter your phone number",
  mode: "international",
  inputOptions: {
    showDialCode: true,
  },
  autoDefaultCountry: true,
  dropdownOptions: {
    showSearchBox: true,
    showFlags: true,
    searchBoxPlaceholder: "Search for country",
  },
});

const updateUser = async (field: any) => {
  if (phoneDetails.value !== null) {
    const formData = new FormData();
    formData.append("firstName", state.firstName);
    formData.append("lastName", state.lastName);
    formData.append("username", state.username);
    formData.append(
      "phone",
      JSON.stringify({
        code: `+${phoneDetails.value?.countryCallingCode}`,
        number: phoneDetails.value?.nationalNumber,
      }),
    );
    if (photo.value) {
      formData.append("photo", photo.value);
    }

    const data = await authStore.updateUser(formData);
    if (data === true) {
      emits("closeProfileUpdateModal");
    }
  }
};

const schema = object({
  firstName: string().required("Firstname is required"),
  lastName: string().required("Firstname is required"),
  username: string().required("Username is required"),
});
</script>

<style scoped></style>
