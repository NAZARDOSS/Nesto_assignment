<script setup lang="ts">
import StoreTimeAxis from "@/components/TimeAxis.vue";
import EmployeeRow from "@/components/EmployeeRow.vue";
import type { Store, Shift } from "@/types/task4";

const props = defineProps<{
  store: Store;
  shiftsByEmployee: Readonly<Record<string, ReadonlyArray<Shift>>>;
}>();

</script>

<template>
  <div class="w-full">
    <div class="sticky top-0 z-10 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/70 border-b border-gray-200">
      <div class="px-0 py-2">
        <StoreTimeAxis />
      </div>
    </div>

    <div class="divide-y divide-gray-100 mt-3">
      <div v-for="e in store.employees" :key="e" class="py-4">
        <EmployeeRow :name="e" :shifts="shiftsByEmployee[e] ?? []" />
      </div>
    </div>
  </div>
</template>
