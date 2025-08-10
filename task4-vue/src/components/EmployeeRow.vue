<script setup lang="ts">
import ShiftBar from "@/components/ShiftBar.vue";
import type { Shift } from "@/types/task4";

const props = defineProps<{ name: string; shifts: ReadonlyArray<Shift> }>();
</script>

<template>
  <div class="space-y-2">
    <div class="text-sm font-medium text-gray-900">{{ props.name }}</div>

    <div class="relative h-12 rounded-lg border border-gray-200 bg-white transition-colors hover:bg-gray-50/40 w-full"
         style="
          background-image:
            repeating-linear-gradient(to right, rgba(31,41,55,0.10) 0 1px, transparent 1px calc(100%/24)),
            repeating-linear-gradient(to right, rgba(31,41,55,0.04) 0 1px, transparent 1px calc(100%/96));
         ">
      <ShiftBar
        v-for="s in props.shifts || []"
        :key="s.id ?? s.start + '-' + s.end + '-' + props.name"
        :start="s.start"
        :end="s.end"
        :employee="props.name"
      />
      <div class="absolute inset-y-0 right-0 w-px bg-gray-300/80"></div>
    </div>

    <div class="h-px bg-gray-100"></div>
  </div>
</template>
