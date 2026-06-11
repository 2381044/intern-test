<template>
  <div
    class="min-h-screen bg-[#09090b] text-white font-sans selection:bg-orange-500 selection:text-white flex flex-col justify-between"
  >
    <header
      class="max-w-2xl mx-auto px-6 py-6 w-full flex items-center justify-between"
    >
      <div class="flex items-center space-x-2 cursor-pointer">
        <div
          class="w-6 h-6 bg-orange-500 rounded-md flex items-center justify-center text-xs font-bold"
        >
          ⌂
        </div>
        <span class="text-lg font-bold tracking-wide">Amoor</span>
      </div>

      <nav class="hidden md:flex items-center space-x-8 text-xs font-medium">
        <a href="/" class="hover:underline transition text-xs">Home</a>
        <a href="/articles" class="hover:underline transition text-xs"
          >Article</a
        >
        <a href="/portfolio" class="hover:underline transition text-xs"
          >Portfolio</a
        >
        <a href="/contact" class="hover:underline transition text-xs"
          >Contact</a
        >
      </nav>

      <div>
        <el-button
          tag="a"
          href="/login"
          type="plain"
          round
          size="small"
          plain
          class="!text-black"
        >
          Sign In
        </el-button>
      </div>
    </header>

    <main class="flex-1 w-full">
      <slot />
    </main>

    <footer class="w-full bg-black text-gray-100 font-sans border-t">
      <div
        class="max-w-6xl mx-auto px-8 grid grid-cols-1 md:grid-cols-4 gap-10 items-start my-6"
      >
        <div class="flex flex-col space-y-4">
          <h3 class="text-sm text-gray-300">Contact Us</h3>
          <p class="text-xs text-gray-300 leading-relaxed max-w-xs">
            We provides you with a full user management functionality that
            result in faster development.
          </p>

          <div>
            <el-button
              tag="a"
              href="/contact"
              type="plain"
              round
              size="small"
              plain
              class="!text-black"
            >
              Get in touch
            </el-button>
          </div>
        </div>

        <div class="flex flex-col space-y-3 text-sm">
          <h3 class="text-sm">Product</h3>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Meet our team
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Help center
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Terms of use
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Privacy
          </a>
        </div>

        <div class="flex flex-col space-y-3 text-sm">
          <h3 class="text-sm">Company</h3>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Purchase Amoor
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Templates
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            How it works
          </a>

          <a
            href="https://www.google.com"
            class="text-gray-400 hover:underline transition"
          >
            Sales
          </a>
        </div>

        <div class="flex flex-col space-y-3 text-sm">
          <h3 class="text-sm">Stay Connected</h3>

          <p class="text-gray-400">Find us in Social network</p>

          <div class="flex space-x-6">
            <a href="https://www.google.com" class="hover:underline transition">
              <FontAwesomeIcon :icon="faSquareFacebook" />
            </a>

            <a href="#" class="hover:text-[#1da1f2] transition">
              <FontAwesomeIcon :icon="faTwitter" />
            </a>

            <a href="#" class="hover:text-[#e1306c] transition">
              <el-icon><CameraFilled /></el-icon>
            </a>
          </div>
        </div>
      </div>

      <div class="text-center mt-8 mb-10">
        Amoor Copyright © 2021 PixFort All Rights Reserved
      </div>
    </footer>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "public",
});
import { CameraFilled } from "@element-plus/icons-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import {
  faSquareFacebook,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
</script>
