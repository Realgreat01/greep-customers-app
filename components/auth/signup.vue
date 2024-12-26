<template>
  <div>
    <UButton
      class="mb-6 gap-6 border-2 font-medium"
      block
      variant="ghost"
      label="Continue with Google"
      icon="i-icon-google"
    />
    <VeeForm v-slot="{ handleSubmit, isSubmitting }" class="h-fit p-2">
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-4 grid w-full gap-4"
        @submit.prevent="handleSubmit($event, registerUser)"
      >
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="state.email" placeholder="john.doe@gmail.com" />
        </UFormGroup>
        <UFormGroup name="password" label="Password">
          <UInput
            v-model="state.password"
            placeholder="********"
            required
            :type="showPassword ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                @click="showPassword = !showPassword"
              />
            </template>
          </UInput>
        </UFormGroup>
        <UFormGroup name="confirmPassword" label="Confirm Password">
          <UInput
            v-model="state.confirmPassword"
            placeholder="********"
            required
            :type="showConfirmPassword ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="
                  showConfirmPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'
                "
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </UInput>
        </UFormGroup>

        <UButton
          :loading="isSubmitting"
          type="submit"
          label="Get Started"
          block
          class="mb-2 h-12"
        />
      </UForm>
    </VeeForm>

    <p class="text-center text-sm">
      Already have an account?
      <NuxtLink
        :to="{ name: GP_ROUTES.LOGIN }"
        class="cursor-pointer text-blue-600"
        >Login</NuxtLink
      >
    </p>
  </div>
</template>

<script setup lang="ts">
import { Form as VeeForm } from "vee-validate";
import { object, string } from "yup";
import { GP_ROUTES } from "~/constants/routes";
import { useAuthStore } from "~/store/auth.store";

const authStore = useAuthStore();
const showPassword = ref(false);
const showConfirmPassword = ref(false);

const state = reactive({
  email: "",
  password: "",
  confirmPassword: undefined,
});

const registerUser = async (field: any) => {
  await authStore.registerUser(state);
};

const schema = object({
  email: string().email("Enter a valid email").required("Email is required"),

  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number"),

  confirmPassword: string()
    .required("Please confirm your password")
    .test("passwords-match", "Passwords does not match", function (value) {
      return state.password === value;
    }),
});
</script>

<style scoped></style>
