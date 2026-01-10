import type { ChartData, ChartItem, ChartOptions, Plugin } from 'chart.js';
import type { Component } from 'solid-js';
import type { ChartProps } from './types';

import { createEffect, mergeProps, on, onCleanup, onMount } from 'solid-js';
import { unwrap } from 'solid-js/store';

import { mergeRefs } from '@solid-primitives/refs';
import { Chart } from 'chart.js';

const MAX_RETRIES = 300; // ~5 seconds of trying

export const DefaultChart: Component<ChartProps> = (props) => {
  let retryCount = 0;
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

    // Is the canvas actually in the document?
    if (!canvasRef.isConnected) {
      retryCount++;

      // Warns every ~2 second if it's still failing
      // Assuming ~60fps, 60 retries is roughly 1 second.
      if (retryCount % 120 === 0) {
        // eslint-disable-next-line no-console
        console.warn('Solid-Chart: Canvas layout is delayed. Still retrying...');
      }

      if (retryCount >= MAX_RETRIES) {
        // eslint-disable-next-line no-console
        console.error('Solid-Chart: Initialisation failed. Canvas never connected to DOM.');
        return; // Stop retrying
      }

      requestAnimationFrame(init);
      return;
    }

    // Success! Reset counter and proceed
    retryCount = 0;

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
