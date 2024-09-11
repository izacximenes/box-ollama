import { getOllamaHost } from "@/lib/utils";
import { Ollama, Message } from "ollama/browser";

const ollama = new Ollama({ host: getOllamaHost() });

export interface OllamaMessage extends Message {
    id: string;
}

export default {
  models() {
    return ollama.list();
  },
  chat(messages: Message[], model: string) {
    return ollama.chat({
      model: model,
      messages: messages,
      stream: true
    });
  },
};
