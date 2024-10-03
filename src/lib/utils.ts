import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { ALWAYS_ON_TOP_KEY, OLLAMA_HOST_KEY } from "./constants";
import { appWindow } from '@tauri-apps/api/window';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getOllamaHost() {
  return localStorage.getItem(OLLAMA_HOST_KEY) || "http://127.0.0.1:11434";
}

export function getAlwaysOnTop() {
  return localStorage.getItem(ALWAYS_ON_TOP_KEY) === "true";
}

export function setOllamaHost(host: string) {
  localStorage.setItem(OLLAMA_HOST_KEY, host);
}

export function setAlwaysOnTop(alwaysOnTop: boolean) {
  localStorage.setItem(ALWAYS_ON_TOP_KEY, alwaysOnTop.toString());
}


export async function loadSettings() {
  const alwaysOnTop = getAlwaysOnTop();


  await appWindow.setAlwaysOnTop(alwaysOnTop);
}
