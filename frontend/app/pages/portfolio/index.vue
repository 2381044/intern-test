<template>
  <div class="min-h-screen bg-[#111] text-white flex flex-col">
    <!-- 1. Hero Section (Sinkron dengan Header Artikel) -->
    <div
      class="relative py-20 max-w-2xl mx-auto px-6 text-center flex flex-col items-center"
    >
      <Transition name="fade-up">
        <h1
          v-if="showTitle"
          class="text-3xl md:text-5xl font-serif max-w-3xl leading-tight tracking-tight mb-6 text-white"
        >
          Amoor – Selected Works <br />
          <span class="italic font-normal text-gray-400">&amp;</span>
          Digital Masterpieces
        </h1>
      </Transition>

      <span
        class="bg-white/10 px-4 py-1.5 rounded-full border border-white/25 text-[10px] tracking-widest uppercase text-gray-300 mb-8"
      >
        Our Portfolio
      </span>

      <p
        class="text-sm md:text-base text-gray-400 max-w-2xl font-light leading-relaxed"
      >
        We don't just design. We build digital monuments that capture attention,
        evoke emotion, and drive meaningful growth for forward-thinking brands.
      </p>

      <div
        class="flex flex-wrap justify-center gap-3 mt-12 text-xs font-medium tracking-wider uppercase"
      >
        <button
          class="px-5 py-2 rounded-full bg-white text-black transition-all"
        >
          All Projects
        </button>
        <button
          class="px-5 py-2 rounded-full bg-[#222] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
        >
          Branding
        </button>
        <button
          class="px-5 py-2 rounded-full bg-[#222] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
        >
          Digital Experience
        </button>
        <button
          class="px-5 py-2 rounded-full bg-[#222] border border-gray-800 text-gray-400 hover:text-white hover:border-gray-600 transition-all"
        >
          Photography
        </button>
      </div>
    </div>

    <!-- 2. Portfolio Showcase Area (Layout Asimetris & Efek Hover Nyambung) -->
    <div class="max-w-3xl w-full mx-auto px-6 pb-32">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
        <!-- PROYEK 1: Ukuran Penuh / Lebar (Makan 2 Kolom di Desktop) -->
        <div
          class="md:col-span-2 w-full bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-gray-700"
        >
          <div
            class="overflow-hidden rounded-2xl shadow-lg aspect-[16/9] md:aspect-[21/9]"
          >
            <img
              src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/Style-2.jpg"
              alt="Aura Luxury Brand"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-103"
            />
          </div>
          <div
            class="mt-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4"
          >
            <div>
              <span
                class="text-[10px] tracking-widest uppercase text-gray-400 font-bold"
                >Branding / Creative Direction</span
              >
              <h2
                class="text-xl md:text-2xl font-serif font-bold text-white mt-1 transition-colors duration-300 group-hover:text-gray-300"
              >
                Aura – Luxury Sustainable Fashion
              </h2>
            </div>
            <div
              class="text-xs text-gray-400 font-light max-w-md md:text-right group-hover:text-white transition-colors duration-300"
            >
              Reconceptualizing the visual identity and digital touchpoints for
              an eco-conscious luxury fashion house based in Paris.
            </div>
          </div>
        </div>

        <!-- PROYEK 2: Kolom Kiri -->
        <div
          class="w-full bg-[#333] rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-800/50 relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-gray-700"
        >
          <div class="overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
            <img
              src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/img1-landing.jpg"
              alt="Kinetix Platform"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div class="mt-6">
            <span
              class="text-[10px] tracking-widest uppercase text-gray-400 font-bold"
              >UI/UX Design / Web Development</span
            >
            <h2
              class="text-lg md:text-xl font-serif font-bold text-white mt-1 transition-colors duration-300 group-hover:text-gray-300"
            >
              Kinetix – Next-Gen AI Platform
            </h2>
            <p
              class="mt-3 text-xs text-gray-400 font-light leading-relaxed group-hover:text-white transition-colors duration-300"
            >
              Designing an immersive, cinema-grade interactive web experience
              for a global artificial intelligence powerhouse.
            </p>
          </div>
        </div>

        <!-- PROYEK 3: Kolom Kanan -->
        <div
          class="w-full bg-[#333] rounded-3xl p-6 md:p-8 shadow-2xl border border-gray-800/50 relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] hover:border-gray-700"
        >
          <div class="overflow-hidden rounded-2xl shadow-lg aspect-[4/3]">
            <img
              src="https://demo.7iquid.com/amoor/wp-content/uploads/2024/10/landing-dark.jpg"
              alt="Chronos Campaign"
              class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </div>
          <div class="mt-6">
            <span
              class="text-[10px] tracking-widest uppercase text-gray-400 font-bold"
              >Digital Campaign / Photography</span
            >
            <h2
              class="text-lg md:text-xl font-serif font-bold text-white mt-1 transition-colors duration-300 group-hover:text-gray-300"
            >
              Chronos – High-End Horology Campaign
            </h2>
            <p
              class="mt-3 text-xs text-gray-400 font-light leading-relaxed group-hover:text-white transition-colors duration-300"
            >
              A dark-themed, minimalist visual campaign executing the
              international launch of luxury timepiece collections.
            </p>
          </div>
        </div>
      </div>

      <!-- 3. Call to Action Penutup (Menghubungkan ke "Get In Touch") -->
      <div
        class="mt-32 w-full bg-gradient-to-b from-[#222] to-transparent rounded-3xl p-8 md:p-16 border border-gray-800 text-center flex flex-col items-center"
      >
        <h2 class="text-2xl md:text-4xl font-serif mb-4">
          Have an extraordinary idea?
        </h2>
        <p class="text-sm text-gray-400 max-w-md font-light mb-8">
          Let’s collaborate and transform your business vision into a
          captivating digital reality.
        </p>
        <NuxtLink
          to="/contact"
          class="px-8 py-3.5 bg-white text-black font-medium text-xs tracking-widest uppercase rounded-full hover:bg-gray-200 transition-all duration-300 shadow-xl"
        >
          Get In Touch
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue";

definePageMeta({
  layout: "public",
});

const showTitle = ref(false);

useSeoMeta({
  title: "Our Portfolio | Amoor – Creative Agency",
  description:
    "Explore selected works, branding case studies, and immersive digital experiences crafted by Amoor.",
  ogTitle: "Our Portfolio | Amoor – Creative Agency",
  ogDescription:
    "Explore selected works, branding case studies, and immersive digital experiences crafted by Amoor.",
});

onMounted(() => {
  setTimeout(() => {
    showTitle.value = true;
  }, 100);
});
</script>

<style scoped>
/* Transisi Fade Up Menyesuaikan Halaman Artikel */
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
</style>
