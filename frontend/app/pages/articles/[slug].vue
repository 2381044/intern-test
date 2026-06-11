<template>
  <div class="min-h-screen bg-[#111] text-white flex flex-col">
    <div v-if="loading" class="flex justify-center items-center h-screen">
      <div
        class="animate-spin rounded-full h-8 w-8 border-b-2 border-white"
      ></div>
    </div>

    <div
      v-else-if="error || !article"
      class="max-w-2xl mx-auto px-6 pt-32 pb-24 text-center flex flex-col items-center"
    >
      <Icon
        icon="solar:document-broken-outline"
        class="text-4xl text-gray-600 mb-4"
      />
      <h2 class="text-xl font-serif text-white mb-2">Article Not Found</h2>
      <p class="text-gray-400 text-xs max-w-xs mb-8">
        The article you are looking for might have been removed or the URL is
        invalid.
      </p>
      <NuxtLink to="/articles">
        <button
          class="px-6 py-2.5 bg-white text-black font-medium text-[10px] tracking-widest uppercase rounded-full hover:bg-gray-200 transition-all duration-300"
        >
          Back to Articles
        </button>
      </NuxtLink>
    </div>

    <template v-else>
      <div class="max-w-2xl w-full mx-auto px-6 pt-20 pb-32 flex flex-col">
        <NuxtLink
          to="/articles"
          class="inline-flex items-center text-[10px] uppercase tracking-widest text-gray-400 hover:text-white mb-8 transition-colors"
        >
          <Icon icon="tabler:arrow-left" class="mr-1.5 text-xs" /> Back to
          Articles
        </NuxtLink>

        <div
          class="text-[10px] tracking-widest uppercase text-gray-400 font-bold mb-3"
        >
          By {{ article.author?.name || article.author || "Amoor Team" }}
        </div>

        <h1
          class="text-2xl md:text-4xl font-serif text-white leading-tight tracking-tight mb-8"
        >
          {{ article.title }}
        </h1>

        <div
          v-if="article.thumbnail"
          class="w-full overflow-hidden rounded-2xl bg-[#222] mb-10"
        >
          <img
            :src="
              getImageUrl(
                article.thumbnail?.path ||
                  article.thumbnail?.url ||
                  article.thumbnail
              )
            "
            :alt="article.title"
            class="w-full h-auto object-cover"
          />
        </div>

        <article
          class="prose prose-invert max-w-none text-left font-light text-sm md:text-base leading-relaxed text-gray-300"
        >
          <div v-if="isHtmlContent" v-html="article.description"></div>
          <div v-else class="whitespace-pre-wrap">
            {{ article.description }}
          </div>
        </article>

        <div class="mt-16 pt-8 border-t border-gray-800">
          <RelatedArticles :exclude-slug="article.slug" />
        </div>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useArticleStore } from "~/stores/article";
import type { PublicArticle } from "~/stores/article";

definePageMeta({
  layout: "public",
});

const route = useRoute();
const articleStore = useArticleStore();
const article = ref<PublicArticle | null>(null);
const loading = ref(true);
const error = ref(false);

const isHtmlContent = computed(() => {
  if (!article.value?.description) return false;
  return /<[a-z][\s\S]*>/i.test(article.value.description);
});

onMounted(async () => {
  const slug = route.params.slug as string;
  try {
    const data = await articleStore.getArticle(slug);
    article.value = data;

    if (articleStore.getPopularArticles) {
      articleStore.getPopularArticles(slug);
    }

    useSeoMeta({
      title: `${data.title} | Amoor`,
      description: data.description
        ? data.description.substring(0, 160)
        : "Read article from Amoor.",
      ogTitle: data.title,
      ogDescription: data.description
        ? data.description.substring(0, 160)
        : "Read article from Amoor.",
    });
  } catch (err) {
    console.error("Error loading article:", err);
    error.value = true;
  } finally {
    loading.value = false;
  }
});

// 🛠️ FUNGSI BARU DIMASUKKAN DI SINI (Menghubungkan path Laravel ke Nuxt)
const getImageUrl = (path: string | undefined) => {
  if (!path) return "";

  // Jika path sudah berupa URL utuh (http:// atau https://), langsung gunakan
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  // URL host Backend Laravel Anda
  const backendUrl = "http://localhost:8000";

  // Menggabungkan domain backend dengan path asset tanpa merusak slash (/)
  return path.startsWith("/")
    ? `${backendUrl}${path}`
    : `${backendUrl}/${path}`;
};
</script>

<style scoped>
/* Pengaturan Konten Prose Tailwind Agar Bersih Tanpa Ornamen Berlebih */
:deep(.prose p) {
  margin-bottom: 1.5rem;
  color: #d1d5db; /* gray-300 */
}
:deep(.prose h2, .prose h3) {
  font-family: Georgia, Cambria, "Times New Roman", Times, serif;
  color: #ffffff;
  margin-top: 2rem;
  margin-bottom: 1rem;
}
:deep(.prose img) {
  width: 100%;
  height: auto;
  border-radius: 1rem;
  margin-top: 2rem;
  margin-bottom: 2rem;
}
</style>
