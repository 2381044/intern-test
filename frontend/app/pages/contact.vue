<template>
  <MainLayout>
    <div
      class="max-w-4xl mx-auto px-6 pt-16 pb-24 text-center flex flex-col items-center"
    >
      <Transition name="fade-up">
        <h1
          v-if="showTitle"
          class="text-2xl md:text-4xl font-serif max-w-3xl leading-tight tracking-tight mb-12 text-white"
        >
          Amoor – Creative Agency <br />
          <span class="italic font-normal text-gray-400">&amp;</span>
          Get In Touch
        </h1>
      </Transition>

      <div
        id="inquiry-form"
        class="w-full max-w-4xl bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl text-left"
      >
        <div class="space-y-2 mb-6">
          <h2 class="text-xl font-semibold text-white">Inquiry Form</h2>
          <p class="text-sm text-gray-400">
            Fill out the form below to request a quotation or consultation.
          </p>
        </div>

        <el-form
          ref="formRef"
          :model="form"
          :rules="rules"
          label-position="top"
          class="custom-dark-form"
        >
          <div class="grid gap-4 md:grid-cols-2">
            <el-form-item label="Full Name" prop="name">
              <el-input
                v-model="form.name"
                placeholder="Enter your full name"
              />
            </el-form-item>
            <el-form-item label="Company Name" prop="company">
              <el-input v-model="form.company" placeholder="Your Company" />
            </el-form-item>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <el-form-item label="Business Email" prop="email">
              <el-input v-model="form.email" placeholder="name@company.com" />
            </el-form-item>
            <el-form-item label="Phone Number/ WhatsApp" prop="phone">
              <el-input v-model="form.phone" placeholder="+62-896-9837-9372" />
            </el-form-item>
          </div>

          <el-form-item label="Subject / Purpose" prop="subject">
            <el-input
              v-model="form.subject"
              placeholder="Contoh: Server Procurement request"
            />
          </el-form-item>

          <el-form-item label="Message / Project Details" prop="message">
            <el-input
              v-model="form.message"
              type="textarea"
              :rows="5"
              placeholder="Describe your required specifications or project details here..."
            />
          </el-form-item>

          <div class="flex items-center gap-4 mt-4">
            <el-button
              :loading="isSubmitting"
              @click="submitForm(formRef)"
              class="!rounded-full !px-6 font-semibold !bg-orange-500 !border-orange-500 hover:!bg-orange-600"
            >
              Send Message
            </el-button>
          </div>
        </el-form>
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

// State untuk memicu animasi judul saat halaman dimuat
const showTitle = ref(false);
const isSubmitting = ref(false);
const formRef = ref();

const form = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

const rules = reactive({
  name: [{ required: true, message: "Required", trigger: "blur" }],
  email: [
    { required: true, message: "Required", trigger: "blur" },
    { type: "email", message: "Format email tidak valid", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Required", trigger: "blur" }],
  message: [{ required: true, message: "Required", trigger: "blur" }], // Ditambahkan agar pesan tidak kosong
});

// Pemicu animasi mendatar/meluncur halus saat halaman contact dibuka
onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
});

// FUNGSI UTAMA YANG DIUBAH DAN DITAMBAH:
const submitForm = async (formEl) => {
  if (!formEl) return;

  try {
    // 1. Validasi form dengan gaya Element Plus yang benar
    await formEl.validate();

    // Jika lolos validasi, nyalakan loading
    isSubmitting.value = true;

    // 2. Tembak ke API backend Laravel Anda

    const response = await fetch("http://localhost:8000/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: form.name,
        company: form.company,
        email: form.email,
        phone: form.phone,
        subject: form.subject || "No Subject",
        message: form.message,
      }),
    });

    const result = await response.json();

    // 3. Cek respon dari Laravel
    if (response.ok) {
      ElMessage.success("Pesan Anda berhasil dikirim ke email!");
      formEl.resetFields(); // Kosongkan form kembali setelah sukses
    } else {
      ElMessage.error(result.message || "Gagal mengirim pesan ke server.");
    }
  } catch (error) {
    // Menangkap error jika validasi form gagal, atau terjadi error jaringan api
    if (error.fields) {
      ElMessage.error("Mohon lengkapi kolom yang wajib diisi.");
    } else {
      ElMessage.error("Terjadi kesalahan jaringan/server.");
      console.error("Error Detail:", error);
    }
  } finally {
    // Matikan loading tombol dalam kondisi apa pun
    isSubmitting.value = false;
  }
};
</script>
<style scoped>
/* Transisi Gerakan Judul Meluncur ke Atas */
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

/* Kustomisasi Tema Gelap Form Element Plus */
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
