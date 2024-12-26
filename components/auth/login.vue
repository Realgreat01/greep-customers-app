<template>
  <div>
    <UButton
      class="mb-6 gap-6 border-2"
      block
      variant="ghost"
      label="Continue with Google"
      icon="i-icon-google"
    />
    <VeeForm v-slot="{ handleSubmit, isSubmitting, errors }" class="h-fit p-2">
      <UForm
        :schema="schema"
        :state="state"
        class="mx-auto mt-4 grid w-full gap-4"
        @submit.prevent="handleSubmit($event, Login)"
      >
        <UFormGroup label="Email" name="email" required>
          <UInput v-model="state.email" placeholder="john.doe@gmail.com" />
        </UFormGroup>
        <UFormGroup name="password" label="Password" required>
          <UInput
            v-model="state.password"
            placeholder="********"
            required
            :type="show ? 'text' : 'password'"
            :ui="{ icon: { trailing: { pointer: '' } } }"
          >
            <template #trailing>
              <UButton
                variant="link"
                size="sm"
                :icon="show ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                aria-label="show ? 'Hide password' : 'Show password'"
                :aria-pressed="show"
                aria-controls="password"
                @click="show = !show"
              />
            </template>
          </UInput>
        </UFormGroup>

        <UButton
          :loading="isSubmitting"
          type="submit"
          label="Login"
          block
          class="mb-2 h-12"
        />
      </UForm>
    </VeeForm>
    <p class="my-2 text-center text-sm text-blue-600">Forgot password?</p>
    <p class="text-center text-sm">
      Don't have an account?
      <NuxtLink
        :to="{ name: GP_ROUTES.REGISTER }"
        class="cursor-pointer text-blue-600"
        >Create Account</NuxtLink
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
const show = ref(false);

const state = reactive({
  email: "",
  password: "",
});

const router = useRouter();

const Login = async (field: any) => {
  await authStore.loginUser(state);
};

const schema = object({
  email: string().email("Enter a valid email").required("Email is required"),
  password: string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .matches(/(?=.*[0-9])/, "Password must contain at least one number"),
});
</script>

<style scoped></style>
