<script setup lang="ts">
import { computed } from "vue";

type ZeitHHMM = `${number}${number}:${number}${number}`;

const props = defineProps<{
  start: ZeitHHMM;
  end: ZeitHHMM;
  employee?: string;
}>();

const DAY_MIN = 24 * 60;

function toMinutes(t: string): number {
  const [hhRaw, mmRaw] = t.split(":");
  const hh = Number.parseInt(hhRaw ?? "0", 10);
  const mm = Number.parseInt(mmRaw ?? "0", 10);
  const h = Number.isFinite(hh) ? Math.min(Math.max(hh, 0), 23) : 0;
  const m = Number.isFinite(mm) ? Math.min(Math.max(mm, 0), 59) : 0;
  return h * 60 + m;
}
function formatHHMM(t: string): string {
  const [hh = "0", mm = "0"] = t.split(":");
  return `${String(Number(hh)).padStart(2, "0")}:${String(Number(mm)).padStart(
    2,
    "0"
  )}`;
}
function durationLabel(a: string, b: string): string {
  const A = toMinutes(a);
  const B = toMinutes(b);
  const d = B >= A ? B - A : DAY_MIN - A + B; // midnight crossing
  const h = Math.floor(d / 60);
  const m = d % 60;
  return m ? `${h}h ${m}m` : `${h}h`;
}

const startMin = computed(() => toMinutes(props.start));
const endMin = computed(() => toMinutes(props.end));

const label = computed(() => {
  const head = props.employee ? props.employee + " · " : "";
  return `${head}${formatHHMM(props.start)}–${formatHHMM(
    props.end
  )} · ${durationLabel(props.start, props.end)}`;
});

// segments for midnight crossing
const segments = computed(() => {
  const s = startMin.value;
  const e = endMin.value;
  return e >= s
    ? [{ a: s, b: e }]
    : [
        { a: s, b: DAY_MIN },
        { a: 0, b: e },
      ];
});
</script>

<template>
  <div
    v-for="seg in segments"
    :key="`${seg.a}-${seg.b}`"
    class="absolute top-1/2 -translate-y-1/2 h-8 rounded-full bg-indigo-500/15 ring-1 ring-inset ring-indigo-500/35 shadow-sm hover:bg-indigo-500/20 hover:ring-indigo-500/60 transition"
    :style="{
      left: (seg.a / 1440) * 100 + '%',
      width: Math.max(((seg.b - seg.a) / 1440) * 100, 0.6) + '%',
    }"
    :title="label"
    role="button"
    tabindex="0"
    :aria-label="label"
  >
    <div
      class="pointer-events-none px-2 text-[11px] leading-8 whitespace-nowrap overflow-hidden text-ellipsis text-indigo-900/90"
    >
      {{ label }}
    </div>
  </div>
</template>
