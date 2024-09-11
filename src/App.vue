<script setup lang="ts">
import { onMounted, ref } from "vue";
import AppBar from "./components/AppBar.vue";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import ChatContainer from "./components/ChatContainer.vue";
import ollama, { OllamaMessage } from "./services/ollama";
import { ModelResponse } from "ollama";
import Toaster from '@/components/ui/toast/Toaster.vue'
import { toast } from "./components/ui/toast";

const model = ref("");
const loading = ref(false);
const prompt = ref("");
const models = ref<ModelResponse[]>([]);
const messages = ref<OllamaMessage[]>([]);

const chatContainer = ref();


async function fetchModels() {
  const response = await ollama.models();
  models.value = response.models;
}

async function handleChat() {
  if(!prompt.value.trim()) return;

  try {
    loading.value = true;

    messages.value.push({
      id: Date.now().toString(),
      role: "user",
      content: prompt.value,
    });

    prompt.value = "";

    const response = await ollama.chat(messages.value, model.value);

    messages.value.push({
      id: Date.now().toString(),
      role: "assistant",
      content: "",
    });

    const lastMessage = messages.value[messages.value.length - 1];
    
    for await (const part of response) {
      lastMessage.content += part.message.content;
      chatContainer.value.scrollToBottom();
    }
    
    loading.value = false;
  } catch (error) {
    loading.value = false;
    toast({
      title: "Error",
      description: "Something went wrong. Please try again.",
      variant: "destructive"
    });
  }

  
}

onMounted(async () => {
  await fetchModels();
});
</script>

<template>
  <Toaster />
  <div
    class="container flex flex-col justify-between w-screen h-screen overflow-x-hidden bg-background"
  >
    <div class="flex flex-col gap-1">
      <AppBar />
      <Select v-model="model" class="bg-white">
        <SelectTrigger class="w-full bg-[#313131]">
          <SelectValue placeholder="Select a model" />
        </SelectTrigger>
        <SelectContent class="bg-[#313131]">
          <SelectGroup>
            <SelectItem :value="m.name" v-for="m in models" :key="m.name">
              {{ m.name }}
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
    <ChatContainer ref="chatContainer"  :messages="messages" />
    <div class="grid w-full gap-2 pb-5" v-if="model">
      <Textarea
        placeholder="Type your message here."
        class="bg-[#313131]"
        v-model="prompt"
        @keyup.enter.prevent="handleChat"
      />
      <Button
        class="text-white bg-[#407ee9] hover:bg-[#407ee9] hover:bg-opacity-70"
        :loading="loading"
        @click="handleChat"
      >
        Send
      </Button>
    </div>
  </div>
</template>

<style scoped></style>
