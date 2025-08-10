<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from "vue";

type Id = string;
type Name = string;
export type Option = Readonly<{ id: Id; name: Name }>;

const props = defineProps<{
  options: readonly Option[];
  placeholder?: string;
  clearable?: boolean;
}>();

const model = defineModel<Id>({ required: true });

const open = ref(false);
const rootRef = ref<HTMLDivElement | null>(null);

const currentLabel = computed(() => {
  const found = props.options.find((o) => o.id === model.value);
  return found?.name ?? props.placeholder ?? "Select…";
});

function toggle() {
  open.value = !open.value;
}
function close() {
  open.value = false;
}

function onOutsideClick(e: MouseEvent) {
  if (!open.value) return;
  const t = e.target as Node;
  if (rootRef.value && !rootRef.value.contains(t)) close();
}
function onKeydown(e: KeyboardEvent) {
  if (e.key === "Escape") close();
}

onMounted(() => {
  document.addEventListener("mousedown", onOutsideClick);
  document.addEventListener("keydown", onKeydown);
});

onBeforeUnmount(() => {
  document.removeEventListener("mousedown", onOutsideClick);
  document.removeEventListener("keydown", onKeydown);
});
</script>

<template>
  <div ref="rootRef" class="relative inline-block w-64">
    <button
      type="button"
      @click="toggle"
      :aria-expanded="open"
      class="inline-flex w-full items-center justify-between gap-2 rounded-md bg-white px-3 py-2 text-left text-sm ring-1 ring-inset ring-gray-300 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <span class="truncate text-gray-900">{{ currentLabel }}</span>
      <svg
        class="h-5 w-5 text-gray-400 transition-transform duration-200"
        :class="open ? 'rotate-180' : 'rotate-0'"
        viewBox="0 0 20 20"
        fill="currentColor"
        aria-hidden="true"
      >
        <path
          fill-rule="evenodd"
          d="M5.23 7.21a.75.75 0 011.06.02L10 10.939l3.71-3.71a.75.75 0 111.06 1.062l-4.24 4.24a.75.75 0 01-1.06 0L5.25 8.29a.75.75 0 01-.02-1.08z"
          clip-rule="evenodd"
        />
      </svg>
    </button>

    <transition
      enter-active-class="transition ease-out duration-150"
      enter-from-class="opacity-0 scale-95"
      enter-to-class="opacity-100 scale-100"
      leave-active-class="transition ease-in duration-100"
      leave-from-class="opacity-100 scale-100"
      leave-to-class="opacity-0 scale-95"
    >
      <div
        v-if="open"
        class="absolute z-20 mt-2 w-full origin-top-left rounded-md bg-white shadow-lg ring-1 ring-black/5"
      >
        <ul class="max-h-60 overflow-auto py-1 text-sm focus:outline-none">
          <li
            v-for="o in props.options"
            :key="o.id"
            class="flex cursor-pointer select-none items-center justify-between px-3 py-2 text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
            :class="o.id === model ? 'font-medium' : 'font-normal'"
            @click="
              model = o.id;
              close();
            "
          >
            <span class="truncate">{{ o.name }}</span>
            <svg
              v-if="o.id === model"
              class="h-4 w-4"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fill-rule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.415l-7.01 7.01a1 1 0 01-1.414 0l-3.29-3.29A1 1 0 016.705 9.01l2.583 2.584 6.303-6.303a1 1 0 011.113-.002z"
                clip-rule="evenodd"
              />
            </svg>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>
