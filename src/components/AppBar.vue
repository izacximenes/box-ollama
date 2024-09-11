<script setup lang="ts">
import { Cross1Icon } from "@radix-icons/vue";
import AppSettingsDialog from "./AppSettingsDialog.vue";
import { appWindow } from '@tauri-apps/api/window';

function close() {
  appWindow.close();
}
</script>

<template>
  <div
    data-tauri-drag-region
    class="bg-background h-10 flex items-center justify-between text-white w-full border-b-white border-b-[1px] border-opacity-25 cursor-move"
  >
    <AppSettingsDialog />
    <span class="font-semibold text-white pointer-events-none">Box ollama</span>
    <Cross1Icon class="cursor-pointer" @click="close" />
  </div>
</template>
