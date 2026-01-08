import { mergeRefs } from '@solid-primitives/refs';
import { Chart, ChartData, ChartItem, ChartOptions, Plugin } from 'chart.js';
import { Component, createEffect, mergeProps, on, onCleanup, onMount } from 'solid-js';
import { unwrap } from 'solid-js/store';

import { ChartProps } from './types';

export const DefaultChart: Component<ChartProps> = (props) => {
  let canvasRef: HTMLCanvasElement | null;
  let chart: Chart | undefined;

  const merged = mergeProps(
    {
      width: 512,
      height: 512,
      type: 'line' as const,
      data: {} as ChartData,
      options: { responsive: true } as ChartOptions,
      plugins: [] as Plugin[],
    },
    props,
  );

  const init = () => {
    if (!canvasRef) return;
    const ctx = canvasRef.getContext('2d') as ChartItem;

    // Clean unwrap and a safe copy of options
    const rawOptions = unwrap(merged.options);
    const configOptions = { ...rawOptions };

    // Handle the radar scale issue without mutating props
    if (merged.type !== 'radar' && configOptions.scales?.r) {
      const { r: _, ...otherScales } = configOptions.scales;
      configOptions.scales = otherScales;
    }

    chart = new Chart(ctx, {
      type: merged.type,
      data: unwrap(merged.data), // unwrap stores before passing to external libs
      options: configOptions,
      plugins: merged.plugins,
    });
  };

  onMount(() => init());

  createEffect(
    on(
      () => merged.data,
      (newData) => {
        if (chart) {
          chart.data = unwrap(newData);
          chart.update('none'); // Use 'none' for better performance on data updates
        }
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      () => merged.options,
      (newOptions) => {
        if (chart) {
          chart.options = unwrap(newOptions);
          chart.update();
        }
      },
      { defer: true },
    ),
  );

  createEffect(
    on(
      [() => merged.width, () => merged.height],
      () => chart?.resize(merged.width, merged.height),
      { defer: true },
    ),
  );

  createEffect(
    on(
      () => merged.type,
      () => {
        if (chart) {
          chart.destroy();
          init();
        }
      },
      { defer: true },
    ),
  );

  onCleanup(() => {
    chart?.destroy();
    // Standard cleanup for the ref
    mergeRefs(props.ref, null);
  });

  return (
    <canvas
      ref={mergeRefs(props.ref, (el) => (canvasRef = el))}
      height={merged.height}
      width={merged.width}
    >
      {merged.fallback}
    </canvas>
  );
};
