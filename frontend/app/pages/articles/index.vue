<template>
  <div class="flex flex-col">
    <div
      class="relative py-16 max-w-3xl mx-auto px-6 pt-16 pb-24 flex flex-col items-center text-center"
    >
      <div
        class="flex flex-col items-center text-center space-y-5 px-4 sm:px-6 relative z-10 w-full"
      >
        <Transition name="fade-up">
          <h1
            v-if="showTitle"
            class="text-3xl md:text-5xl font-serif max-w-3xl leading-tight tracking-tight mb-12 text-white"
          >
            Amoor – Articles <br />
            <span class="italic font-normal text-gray-400">&amp;</span>
            News
          </h1>
        </Transition>

        <p
          class="text-sm md:text-base text-gray-400 max-w-2xl font-light leading-relaxed py-2"
        >
          We don't just design. We build digital monuments that capture
          attention, evoke emotion, and drive meaningful growth for
          forward-thinking brands.
        </p>

        <!-- Loading State -->
        <div
          v-if="loadingArticles"
          class="text-gray-500 py-12 text-sm tracking-widest uppercase"
        >
          Loading Insightful Content...
        </div>

        <!-- Jika Data Kosong -->
        <div
          v-else-if="!articles || articles.length === 0"
          class="text-gray-400 py-12 text-sm"
        >
          No articles found. Add some from admin panel.
        </div>

        <!-- Area Data Dinamis -->
        <div v-else class="w-full space-y-6">
          <div
            v-for="(article, index) in articles"
            :key="article.id || index"
            class="w-full bg-[#333] rounded-3xl p-6 md:p-10 shadow-2xl border border-gray-800/50 relative group transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] hover:border-gray-700 text-left"
          >
            <!-- 📸 BAGIAN GAMBAR YANG SUDAH DIPERBAIKI -->
            <div
              class="overflow-hidden rounded-2xl shadow-lg aspect-[16/9] md:aspect-[21/9] bg-[#222]"
            >
              <img
                v-if="article.thumbnail"
                :src="
                  getImageUrl(
                    article.thumbnail?.path ||
                      article.thumbnail?.url ||
                      article.thumbnail
                  )
                "
                :alt="article.title"
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div
                v-else
                class="w-full h-full flex items-center justify-center text-gray-600 text-xs uppercase tracking-wider"
              >
                No Image Available
              </div>
            </div>

            <!-- Konten Teks -->
            <div class="mt-6">
              <span
                class="text-[10px] tracking-widest uppercase text-gray-400 font-bold block mb-1"
              >
                {{ article.category?.name || "Inspiration" }}
              </span>

              <h2
                class="text-xl md:text-2xl font-serif font-bold text-white transition-colors duration-300 group-hover:text-gray-300"
              >
                {{ article.title }}
              </h2>

              <p
                class="mt-3 text-xs text-gray-400 font-light leading-relaxed transition-colors duration-300 group-hover:text-white"
              >
                {{ stripHtml(article.description || "").substring(0, 160) }}...
              </p>

              <NuxtLink
                :to="`/articles/${article.slug}`"
                class="inline-flex items-center text-[11px] uppercase tracking-wider text-white mt-6 border-b border-white/20 pb-1 hover:border-white transition-all"
              >
                Read Article
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sidebar -->
    <div class="w-full lg:w-80 shrink-0 mx-auto px-6 lg:px-0">
      <PopularArticles />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { onMounted, ref } from "vue";
import { useArticleStore } from "~/stores/article";
import { stripHtml } from "~/utils/string";

definePageMeta({
  layout: "public",
});

const showTitle = ref(false);

const articleStore = useArticleStore();
const { articles, loadingArticles } = storeToRefs(articleStore);

useSeoMeta({
  title: "Artikel & Wawasan | Amoor",
  description:
    "Wawasan terkini seputar kreativitas, teknologi, dan desain dari Amoor Agency.",
});

onMounted(() => {
  showTitle.value = true;
  articleStore.getArticles();
});

// 🛠️ FUNGSI BARU DIMASUKKAN DI SINI (Sebelum tag tutup script)
const getImageUrl = (path: string | undefined) => {
  if (!path) return "";

  // Jika sudah berwujud URL penuh (berawalan http/https), langsung pakai
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // URL host Laravel Anda (ganti portnya jika berbeda, misal 8000 atau 80)
  const backendUrl = "http://localhost:8000";

  // Otomatis merapikan backslash/slash ganda jika ada
  return path.startsWith("/")
    ? `${backendUrl}${path}`
    : `${backendUrl}/${path}`;
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
</style>
