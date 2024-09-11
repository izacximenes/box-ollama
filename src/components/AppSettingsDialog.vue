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
import { getOllamaHost, setOllamaHost } from "@/lib/utils";
import { Label } from "radix-vue";
import { toast } from "./ui/toast";

const show = ref(false);

const form =  reactive({
  host: ""
})

function handleSave() {
  setOllamaHost(form.host);
  show.value = false;
  toast({
    title: "Settings saved",
    description: "Your settings have been saved.",
  })
  window.location.reload();
}

function fetchSettings() {
  form.host = getOllamaHost();
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
            <div class="grid w-full items-center gap-1.5">
              <Label for="host" class="text-white">Host</Label>
              <Input id="host" type="url" placeholder="host" class="bg-[#313131] text-white" v-model="form.host" />
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
