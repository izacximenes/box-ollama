<script setup lang="ts">
import OllamaIcon from '@/assets/images/ollama.png';
import hljs from 'highlight.js';
import { Marked } from 'marked';
import { markedHighlight } from 'marked-highlight';
import { computed } from 'vue';

interface Props {
  message: string
  type: 'user' | 'assistant'
}

const props = defineProps<Props>()


const marked = new Marked(
  markedHighlight({
    langPrefix: 'hljs language-',
    highlight(code, lang) {
      const language = hljs.getLanguage(lang) ? lang : 'plaintext';
      return hljs.highlight(code, { language }).value;
    }
  })
);

const makdown = computed(() => {
  return marked.parse(props.message)
})


</script>

<template>
  <div class="px-4 py-3 mx-auto my-4">
    <div class="flex" :class="type === 'user' ? 'justify-end' : 'justify-start'">
      <img
        v-if="type === 'assistant'"
        :src="OllamaIcon"
        alt="Avatar"
        class="w-6 h-6 mr-4 rounded-full"
      />
      <div >
        <p class="text-white" v-html="makdown" />
      </div>
    </div>
  </div>
</template>
