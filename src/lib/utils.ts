import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { OLLAMA_HOST_KEY } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOllamaHost() {
  return localStorage.getItem(OLLAMA_HOST_KEY) || "http://127.0.0.1:11434";
}

export function setOllamaHost(host: string) {
  localStorage.setItem(OLLAMA_HOST_KEY, host);
}
