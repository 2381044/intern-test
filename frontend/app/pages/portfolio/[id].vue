<template>
  <div class="flex flex-col bg-slate-50">
    <div class="relative py-16 bg-slate-900 text-white">
      <div
        class="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-slate-800/40 blur-3xl"
      ></div>
      <div
        class="pointer-events-none absolute -bottom-10 left-0 h-80 w-80 rounded-full bg-slate-800/60 blur-3xl"
      ></div>

      <div
        class="flex flex-col items-center text-center space-y-5 px-4 sm:px-6"
      >
        <span
          class="bg-white/10 px-3 py-1 rounded-full border border-white/35 text-xs"
          >{{ portfolio?.category?.name || "Portofolio" }}</span
        >
        <h1
          class="text-3xl sm:text-4xl md:text-5xl font-bold max-w-5xl w-full mx-auto leading-snug"
        >
          {{ portfolio?.title || "Portofolio Detail" }}
        </h1>
      </div>
    </div>

    <section class="bg-gradient-to-b from-white via-slate-50 to-white">
      <div class="mx-auto max-w-6xl px-6 py-12 sm:py-16">
        <div
          v-if="loadingPortfolios && !portfolio"
          class="text-sm text-slate-500"
        >
          Memuat portofolio...
        </div>
        <div
          v-else-if="!portfolio"
          class="rounded-2xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-500"
        >
          Portofolio tidak ditemukan.
        </div>
        <div v-else class="grid gap-8 lg:grid-cols-[2fr_1fr]">
          <div class="space-y-6">
            <div
              class="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
            >
              <div class="aspect-[16/9] overflow-hidden bg-slate-100">
                <img
                  v-if="heroImage"
                  :src="heroImage"
                  :alt="portfolio.title"
                  class="h-full w-full object-cover"
                />
                <div
                  v-else
                  class="flex h-full w-full flex-col items-center justify-center gap-2 text-slate-400"
                >
                  <Icon icon="tabler:photo" class="h-10 w-10" />
                  <p class="text-xs uppercase tracking-[0.4em]">Lamjaya</p>
                </div>
              </div>
              <div v-if="portfolio.description" class="p-6 md:p-8">
                <p
                  class="whitespace-pre-wrap text-sm leading-relaxed text-slate-600 sm:text-base"
                >
                  {{ portfolio.description }}
                </p>
              </div>
            </div>
          </div>

          <div class="space-y-6">
            <div
              class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 class="text-lg font-semibold text-slate-900">
                Ringkasan Proyek
              </h2>
              <div class="mt-4 space-y-4 text-sm text-slate-600">
                <div class="flex flex-col gap-1">
                  <span
                    class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
                    >Kategori</span
                  >
                  <span>{{ portfolio.category?.name || "-" }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
                    >Klien</span
                  >
                  <span>{{ portfolio.client_name || "-" }}</span>
                </div>
                <div class="flex flex-col gap-1">
                  <span
                    class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
                    >Tahun</span
                  >
                  <span>{{ portfolio.year || "-" }}</span>
                </div>
                <div class="flex flex-col gap-2">
                  <span
                    class="text-xs font-semibold uppercase tracking-[0.25em] text-slate-400"
                    >Area</span
                  >
                  <div class="flex flex-wrap gap-2">
                    <span
                      v-for="area in portfolio.areas || []"
                      :key="area"
                      class="inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-slate-500"
                    >
                      {{ area }}
                    </span>
                    <span
                      v-if="!portfolio.areas?.length"
                      class="text-sm text-slate-500"
                      >-</span
                    >
                  </div>
                </div>
              </div>
            </div>

            <div
              class="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
            >
              <h2 class="text-lg font-semibold text-slate-900">Dokumentasi</h2>
              <p class="mt-2 text-sm text-slate-500">
                Galeri dokumentasi proyek untuk memberikan gambaran detail hasil
                pekerjaan.
              </p>

              <div
                v-if="galleryImages.length"
                class="mt-6 grid gap-4 sm:grid-cols-2"
              >
                <div
                  v-for="image in galleryImages"
                  :key="image"
                  class="aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100"
                >
                  <img
                    v-lazy-src="image"
                    :alt="portfolio.title"
                    class="h-full w-full object-cover"
                  />
                </div>
              </div>
              <div v-else class="mt-6 text-sm text-slate-500">
                Belum ada dokumentasi tambahan.
              </div>
            </div>

            <div
              class="rounded-3xl border border-blue-900/10 bg-blue-900/5 p-6"
            >
              <h3 class="text-base font-semibold text-blue-900">
                Need similar solution?
              </h3>
              <p class="mt-2 text-sm text-slate-600">
                Hubungi tim kami untuk konsultasi solusi yang sesuai dengan
                kebutuhan bisnis Anda.
              </p>
              <NuxtLink
                to="/contact"
                class="mt-4 inline-flex items-center gap-2 rounded-full bg-blue-900 px-8 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-white"
              >
                Konsultasi
                <Icon icon="tabler:arrow-up-right" class="h-4 w-4" />
              </NuxtLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useAppStore } from "~/stores/app";

definePageMeta({
  layout: "public",
});

const route = useRoute();
const appStore = useAppStore();
const { portfolios, loadingPortfolios } = storeToRefs(appStore);

const portfolioId = computed(() => String(route.params.id ?? ""));

const portfolio = computed(
  () => portfolios.value.find((item) => item.id === portfolioId.value) ?? null
);

useSeoMeta({
  title: computed(() =>
    portfolio.value ? portfolio.value.title : "Portofolio Detail"
  ),
  description: computed(() =>
    portfolio.value?.description
      ? portfolio.value.description.length > 160
        ? portfolio.value.description.slice(0, 160) + "..."
        : portfolio.value.description
      : "Detail Proyek Lamjaya Global Solusi yang menunjukkan cara berpikir strategis dan hasil yang bisa diukur."
  ),
  ogTitle: computed(() =>
    portfolio.value ? portfolio.value.title : "Portofolio Detail"
  ),
  ogDescription: computed(() =>
    portfolio.value?.description
      ? portfolio.value.description.length > 160
        ? portfolio.value.description.slice(0, 160) + "..."
        : portfolio.value.description
      : "Detail Proyek Lamjaya Global Solusi yang menunjukkan cara berpikir strategis dan hasil yang bisa diukur."
  ),
  ogImage: computed(
    () =>
      portfolio.value?.thumbnail?.path ||
      portfolio.value?.photos?.[0]?.path ||
      "https://lamsolusi.com/images/logo.png"
  ),
});

const { addJsonLd } = useJsonLd();
addJsonLd(
  computed(() => {
    if (!portfolio.value) return {};
    return {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: portfolio.value.title,
      description: portfolio.value.description
        ? portfolio.value.description.length > 160
          ? portfolio.value.description.slice(0, 160) + "..."
          : portfolio.value.description
        : "",
      image:
        portfolio.value.thumbnail?.path ||
        portfolio.value.photos?.[0]?.path ||
        "https://lamsolusi.com/images/logo.png",
      author: {
        "@type": "Organization",
        name: "Lamjaya Global Solusi",
      },
      publisher: {
        "@type": "Organization",
        name: "Lamjaya Global Solusi",
        logo: {
          "@type": "ImageObject",
          url: "https://lamsolusi.com/images/logo.png",
        },
      },
    };
  })
);

const heroImage = computed(() => {
  if (!portfolio.value) return "";
  return (
    portfolio.value.thumbnail?.path || portfolio.value.photos?.[0]?.path || ""
  );
});

const galleryImages = computed(() => {
  if (!portfolio.value) return [] as string[];
  const images = [
    portfolio.value.thumbnail?.path,
    ...(portfolio.value.photos?.map((photo) => photo.path) ?? []),
  ].filter(Boolean) as string[];
  return Array.from(new Set(images));
});

onMounted(() => {
  appStore.getPortfolios();
});
</script>
