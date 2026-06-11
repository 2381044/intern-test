<template>
  <MainLayout>
    <!-- Lebar max-w-2xl dikunci agar lurus simetris dengan artikel dan portofolio -->
    <div
      class="max-w-2xl mx-auto px-6 pt-16 pb-24 text-center flex flex-col items-center"
    >
      <Transition name="fade-up">
        <h1
          v-if="showTitle"
          class="text-2xl md:text-4xl font-serif max-w-3xl leading-tight tracking-tight mb-4 text-white"
        >
          Let’s Shape the Future <br />
          <span class="italic font-normal text-gray-400">with</span> Amoor
        </h1>
      </Transition>
      <span
        class="bg-white/10 px-3 py-1 rounded-full border border-white/35 text-[10px] tracking-widest uppercase text-gray-300 mb-6"
      >
        Get In Touch
      </span>

      <p
        class="text-xs md:text-sm text-gray-400 max-w-xl font-light leading-relaxed mb-12"
      >
        Whether you want to build a brand from scratch, redesign your digital
        experience, or simply say hello—our team is ready to listen. Your next
        creative chapter begins here.
      </p>

      <!-- Kotak Form dibuat border-gray-800/50 agar persis seperti kotak artikel -->
      <div
        id="inquiry-form"
        class="w-full bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 text-left"
      >
        <div class="space-y-1 mb-8">
          <h2 class="text-lg font-serif font-semibold text-white">
            Start a Conversation
          </h2>
          <p class="text-xs text-gray-400">
            Tell us about your vision, and let's create something extraordinary
            together.
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
            <el-form-item label="What should we call you?" prop="name">
              <el-input v-model="form.name" placeholder="Your full name" />
            </el-form-item>
            <el-form-item label="Company Name" prop="company">
              <el-input
                v-model="form.company"
                placeholder="Your Company (Optional)"
              />
            </el-form-item>
          </div>

          <div class="grid gap-4 md:grid-cols-2">
            <el-form-item label="Business Email" prop="email">
              <el-input v-model="form.email" placeholder="name@company.com" />
            </el-form-item>
            <el-form-item label="Phone Number / WhatsApp" prop="phone">
              <el-input v-model="form.phone" placeholder="+62..." />
            </el-form-item>
          </div>

          <el-form-item label="Subject / Purpose" prop="subject">
            <el-input
              v-model="form.subject"
              placeholder="e.g., Creative Branding / Web Design"
            />
          </el-form-item>

          <el-form-item label="Message / Project Details" prop="message">
            <el-input
              v-model="form.message"
              type="textarea"
              :rows="5"
              placeholder="Describe your required specifications, goals, or project details here..."
            />
          </el-form-item>

          <!-- Tombol diubah dari Orange menjadi Putih Monokrom khas Amoor Agency -->
          <div class="flex items-center gap-4 mt-6">
            <el-button
              :loading="isSubmitting"
              @click="submitForm(formRef)"
              class="!rounded-full !px-8 !py-5 font-semibold text-xs tracking-widest uppercase !bg-white !text-black !border-white hover:!bg-gray-200 transition-all duration-300 shadow-xl"
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
    { type: "email", message: "Invalid email format", trigger: "blur" },
  ],
  phone: [{ required: true, message: "Required", trigger: "blur" }],
  message: [{ required: true, message: "Required", trigger: "blur" }],
});

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
});

const submitForm = async (formEl) => {
  if (!formEl) return;

  try {
    await formEl.validate();
    isSubmitting.value = true;

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
        subject: form.subject || "General Inquiry",
        message: form.message,
      }),
    });

    const result = await response.json();

    if (response.ok) {
      ElMessage.success("Your message has been sent successfully!");
      formEl.resetFields();
    } else {
      ElMessage.error(
        result.message || "Failed to send message to the server."
      );
    }
  } catch (error) {
    if (error.fields) {
      ElMessage.error("Please fill in all required fields.");
    } else {
      ElMessage.error("Network or server error occurred.");
      console.error("Error Detail:", error);
    }
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<style scoped>
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

.custom-dark-form :deep(.el-form-item__label) {
  color: #9ca3af !important;
  font-weight: 500;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
.custom-dark-form :deep(.el-input__wrapper),
.custom-dark-form :deep(.el-textarea__inner) {
  background-color: #222222 !important;
  box-shadow: 0 0 0 1px #4b5563 inset !important;
  border-radius: 12px;
}
.custom-dark-form :deep(.el-input__inner),
.custom-dark-form :deep(.el-textarea__inner) {
  color: #ffffff !important;
  font-size: 13px;
}
.custom-dark-form :deep(.el-input__wrapper.is-focus),
.custom-dark-form :deep(.el-textarea__inner:focus) {
  box-shadow: 0 0 0 1px #ffffff inset !important;
}
</style>
