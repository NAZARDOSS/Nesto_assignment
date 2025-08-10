<script setup lang="ts">
import StoreSelector, {
  type Option as StoreOption,
} from "@/components/StoreSelector.vue";
import StoreSchedule from "@/components/StoreSchedule.vue";
import { stores as rawStores, shiftsByEmployee } from "@/data/derived";
import type { Store } from "@/types/task4";
import { ref, computed } from "vue";

const storeNodes: readonly Store[] = rawStores.map((s) => ({ // store objects
  ...s,
  kind: "store",
}));

type StoreId = Store["id"] | "all";

const selectedId = ref<StoreId>("all");

const selectorOptions: readonly StoreOption[] = [
  { id: "all", name: "Alle" },
  ...storeNodes.map(({ id, name }) => ({ id, name })),
];

const current = computed<Store | undefined>(() => {
  if (selectedId.value === "all") return undefined;
  return storeNodes.find((s) => s.id === selectedId.value);
});

</script>

<template>
  <header class="bg-white shadow">
    <div
      class="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">
        Time table
      </h1>
    </div>
  </header>

  <main class="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
    <StoreSelector
      v-model="selectedId"
      :options="selectorOptions"
      placeholder="Select a store"
    />
    <div class="rounded-lg bg-white p-6 shadow mt-6">
      <h2 class="mb-4 text-lg font-semibold">
        Store schedule
        <template v-if="selectedId === 'all'">Alle</template>
        <template v-else>{{ current?.name ?? "-" }}</template>
      </h2>

      <template v-if="selectedId === 'all'">
        <div
          v-for="store in storeNodes"
          :key="store.id"
          class="mb-6 p-4 rounded"
        >
          <h3 class="font-semibold mb-2">{{ store.name }}</h3>
          <StoreSchedule
            :store="store"
            :shifts-by-employee="shiftsByEmployee"
          />
        </div>
      </template>

      <StoreSchedule
        v-else-if="current"
        :store="current"
        :shifts-by-employee="shiftsByEmployee"
      />
      <p v-else class="text-sm text-gray-500">Select a store</p>
    </div>
  </main>
</template>
