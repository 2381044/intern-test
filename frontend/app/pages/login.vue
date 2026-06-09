<template>
  <div class="bg-black">
    <div class="w-full flex flex-col items-center px-6 pt-16 pb-24">
      <Transition name="fade-up">
        <h1
          v-if="showTitle"
          class="text-2xl md:text-4xl font-serif max-w-3xl leading-tight tracking-tight mb-12 text-white text-center mx-auto"
        >
          Amoor – Creative Agency <br />
          <span class="italic font-normal text-white">&amp;</span>
          Get In Touch
        </h1>
      </Transition>

      <!-- Box Login -->
      <div class="w-full max-w-md rounded-3xl bg-[#333] p-8 shadow-xl">
        <div class="text-center">
          <p
            class="text-xs font-semibold uppercase tracking-[0.35em] text-white"
          >
            Admin Access
          </p>
          <h1 class="mt-3 text-3xl font-semibold text-white">Sign In</h1>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="mt-8"
        >
          <el-form-item label="Email" prop="email">
            <el-input
              @keydown.enter="submitForm"
              v-model="form.email"
              placeholder="admin@lamsolusi.com"
            />
          </el-form-item>
          <el-form-item label="Password" prop="password">
            <el-input
              @keydown.enter="submitForm"
              v-model="form.password"
              type="password"
              show-password
              placeholder="Masukkan password"
            />
          </el-form-item>

          <div class="mb-6 flex items-center justify-between text-sm">
            <el-checkbox v-model="form.remember">Remember me</el-checkbox>
            <span class="text-slate-400">Secure access</span>
          </div>

          <el-button
            type="info"
            class="w-full"
            :loading="isSubmitting"
            @click="submitForm"
          >
            Masuk
          </el-button>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ElMessage, ElNotification } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { reactive, ref, onMounted } from "vue"; // PERBAIKAN 1: Tambahkan onMounted di sini
import { useRouter } from "vue-router";
import { useApi } from "~/composables/useApi";

definePageMeta({
  layout: "public",
});

// PERBAIKAN 2: Definisikan variabel showTitle agar bisa dibaca oleh v-if
const showTitle = ref(false);

type LoginForm = {
  email: string;
  password: string;
  remember: boolean;
};

const formRef = ref<FormInstance>();
const form = reactive<LoginForm>({
  email: "",
  password: "",
  remember: false,
});

const rules = reactive<FormRules<LoginForm>>({
  email: [
    { required: true, message: "Email wajib diisi", trigger: "change" },
    {
      type: "email" as const,
      message: "Format email tidak valid",
      trigger: "change",
    },
  ],
  password: [
    { required: true, message: "Password wajib diisi", trigger: "change" },
  ],
});

const isSubmitting = ref(false);
const router = useRouter();
const { apiFetch, getErrorMessage } = useApi();

// Sekarang onMounted ini akan berjalan dengan aman karena fungsinya sudah di-import
onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
});

const submitForm = async () => {
  const formEl = formRef.value;
  if (!formEl) return;

  await formEl.validate(async (valid) => {
    if (valid) {
      isSubmitting.value = true;
      try {
        await apiFetch("/auth/login", {
          method: "POST",
          body: {
            email: form.email,
            password: form.password,
            remember: form.remember,
          },
        });
        ElMessage.success("Login berhasil");
        await router.push("/admin/dashboard");
      } catch (error) {
        ElMessage.error(getErrorMessage(error, "Login gagal."));
      } finally {
        isSubmitting.value = false;
      }
    } else {
      ElNotification({
        title: "Error",
        message: "Email dan Password wajib diisi dengan benar",
        type: "error",
      });
    }
  });
};
</script>

<style scoped>
/* Transisi Vue */
.fade-up-enter-active {
  transition: all 1s ease-out;
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(15px);
}
.fade-up-enter-to {
  opacity: 1;
  transform: translateY(0);
}

/* Kustomisasi CSS Element Plus */
.custom-dark-form :deep(.el-form-item__label) {
  color: #e5e7eb !important;
  font-weight: 500;
}
.custom-dark-form :deep(.el-input__wrapper),
.custom-dark-form :deep(.el-textarea__inner) {
  background-color: #2a2a2a !important;
  box-shadow: 0 0 0 1px #4b5563 inset !important;
}
.custom-dark-form :deep(.el-input__inner),
.custom-dark-form :deep(.el-textarea__inner) {
  color: #ffffff !important;
}
.custom-dark-form :deep(.el-input__wrapper.is-focus),
.custom-dark-form :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #ff6b00 inset !important;
}
</style>
