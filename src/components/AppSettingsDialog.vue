<script setup lang="ts">
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GearIcon } from "@radix-icons/vue";
import Button from "./ui/button/Button.vue";
import Input from "./ui/input/Input.vue";
import { reactive, ref } from "vue";
import { getAlwaysOnTop, getOllamaHost, setAlwaysOnTop, setOllamaHost } from "@/lib/utils";
import { Label } from "radix-vue";
import { toast } from "./ui/toast";
import Checkbox from "./ui/checkbox/Checkbox.vue";

const show = ref(false);

const form = reactive({
  host: "",
  always_on_top: false,
});

function handleSave() {
  setOllamaHost(form.host);
  setAlwaysOnTop(form.always_on_top)
  show.value = false;
  toast({
    title: "Settings saved",
    description: "Your settings have been saved.",
  });
  window.location.reload();
}

function fetchSettings() {
  form.host = getOllamaHost();
  form.always_on_top = getAlwaysOnTop();
}
</script>

<template>
  <Dialog v-model:open="show" @update:open="fetchSettings">
    <DialogTrigger>
      <GearIcon class="cursor-pointer" />
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Settings</DialogTitle>
        <DialogDescription>
          <form class="py-5">
            <div class="grid w-full gap-1.5">
              <Label for="host" class="text-white">Host</Label>
              <Input
                id="host"
                type="url"
                placeholder="host"
                class="bg-[#313131] text-white"
                v-model="form.host"
              />
            </div>
            <div class="grid w-full gap-1.5 mt-5">
              <Label for="host" class="text-white">Window</Label>
              <div class="flex items-center space-x-2">
                <Checkbox id="AlwaysOnTop" v-model:checked="form.always_on_top" />
                <label
                  for="AlwaysOnTop"
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Always On Top
                </label>
              </div>
            </div>
          </form>
        </DialogDescription>
      </DialogHeader>

      <DialogFooter>
        <Button @click="handleSave">Save</Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
