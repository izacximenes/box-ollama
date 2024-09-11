<script setup lang="ts">
import { OllamaMessage } from "@/services/ollama";
import ChatMessage from "./ChatMessage.vue";
import { ref } from "vue";

interface Props {
  messages: OllamaMessage[];
}

defineProps<Props>();

const chatContainer = ref<HTMLDivElement>();

function scrollToBottom() {
  chatContainer.value!.scrollTop = chatContainer.value!.scrollHeight;
}

defineExpose({
  scrollToBottom,
});
</script>

<template>
  <div
    ref="chatContainer"
    class="flex-1 w-full overflow-y-auto"
    v-bind="$attrs"
  >
    <ChatMessage
      v-for="message in messages"
      :key="message.id"
      :message="message.content"
      :type="message.role === 'user' ? 'user' : 'assistant'"
    />
  </div>
</template>
