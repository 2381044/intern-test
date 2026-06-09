<template>
  <MainLayout>
    <div
      class="max-w-2xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center"
    >
      <Transition name="fade-up">
        <h1
          v-if="showTitle"
          class="text-xs md:text-4xl font-serif max-w-3xl leading-tight tracking-tight mb-12"
        >
          Amoor – Creative Agency <br />
          <span class="italic font-normal text-gray-300">&amp;</span>
          Portfolio Theme
        </h1>
      </Transition>

      <div
        class="w-full max-w-4xl bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 relative group"
      >
        <img
          src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/img1-landing.jpg"
          alt="firstpic"
          class="w-full h-auto rounded-2xl object-cover shadow-lg"
        />
        <p class="mt-3 text-xs text-gray-400">Main Demo</p>
      </div>

      <div
        class="w-full max-w-4xl bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 relative group mt-6"
      >
        <img
          src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/Style-2.jpg"
          alt="firstpic"
          class="w-full h-auto rounded-2xl object-cover shadow-lg"
        />
        <p class="mt-3 text-xs text-gray-400">Bouncing Spheres</p>
      </div>

      <div
        class="w-full max-w-4xl bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 relative group mt-6"
      >
        <img
          src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/landing-dark.jpg"
          alt="firstpic"
          class="w-full h-auto rounded-2xl object-cover shadow-lg"
        />
        <p class="mt-3 text-xs text-gray-400">Solid Background</p>
      </div>
    </div>
  </MainLayout>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { ElMessage } from "element-plus";

definePageMeta({
  layout: "public",
});

// State untuk mengontrol kapan judul harus muncul
const showTitle = ref(false);
const isSubmitting = ref(false);
const formRef = ref();

// Menggunakan reactive untuk objek formulir agar selaras dengan v-model
const form = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

// Aturan validasi input (Wajib diisi)
const rules = reactive({
  name: [{ required: true, message: "Required", trigger: "blur" }],
  email: [
    { required: true, message: "Required", trigger: "blur" },
    { type: "email", message: "Required", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Required", trigger: "blur" }],
});

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
});

// Fungsi untuk submit dan memvalidasi formulir
const submitForm = async (formEl) => {
  if (!formEl) return;

  await formEl.validate((valid) => {
    if (valid) {
      isSubmitting.value = true;

      // Simulasi loading kirim data selama 2 detik
      setTimeout(() => {
        isSubmitting.value = false;
        ElMessage.success("Pesan Anda berhasil dikirim!");

        // Reset form setelah sukses
        formEl.resetFields();
      }, 2000);
    } else {
      ElMessage.error("Mohon lengkapi kolom yang wajib diisi.");
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

/* Kustomisasi CSS agar Element Plus mendukung Tema Gelap (Dark Mode) */
.custom-dark-form :deep(.el-form-item__label) {
  color: #e5e7eb !important; /* Warna teks label abu-abu terang */
  font-weight: 500;
}

.custom-dark-form :deep(.el-input__wrapper),
.custom-dark-form :deep(.el-textarea__inner) {
  background-color: #2a2a2a !important; /* Latar belakang input gelap */
  box-shadow: 0 0 0 1px #4b5563 inset !important; /* Border abu-abu */
}

.custom-dark-form :deep(.el-input__inner),
.custom-dark-form :deep(.el-textarea__inner) {
  color: #ffffff !important; /* Warna teks yang diketik menjadi putih */
}

.custom-dark-form :deep(.el-input__wrapper.is-focus),
.custom-dark-form :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #ff6b00 inset !important; /* Efek border oranye saat diklik */
}
</style>
