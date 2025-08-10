<script setup lang="ts">
const hours = Object.freeze(
  Array.from({ length: 24 }, (_, i) => i)
) as readonly number[];
</script>

<template>
  <div class="select-none text-xs text-gray-600">
    <div
      class="grid w-full"
      style="grid-template-columns: repeat(24, minmax(0, 1fr))"
    >
      <div
        v-for="h in hours"
        :key="h"
        class="border-l first:border-l-0 pl-1 tabular-nums"
      >
        {{ String(h).padStart(2, "0") }}:00
      </div>
    </div>
  </div>
</template>
