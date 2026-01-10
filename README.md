# solid-chart

---

A lightweight, reactive [SolidJS](https://www.solidjs.com/) wrapper for [Chart.js 4.5+](https://www.chartjs.org/).

This library provides a thin, high-performance layer over **Chart.js**, ensuring
that chart instances stay in sync with Solid's fine-grained reactivity without
the "Wrapper Tax" of older implementations.

---

> 💡 **Important**: This project is based on the original work by [s0ftik3/solid-chartjs](https://github.com/s0ftik3/solid-chartjs). It has been modernised to fix race conditions related to DOM rendering and updated for compatibility with the latest **Chart.js**.

---

> ⚠️ **Warning**: This library is **not thoroughly tested** in production environments. Please use it with caution and report any issues.

---

## Features

- **Zero-Signal Architecture**: Uses synchronous `onMount` ref handling to
  prevent `getComputedStyle` errors.
- **Prop Protection**: Automatically unwraps Solid Stores before passing them to
  Chart.js to prevent Proxy-related crashes.
- **Typed Components**: Includes pre-defined components for `Line`, `Bar`,
  `Doughnut`,...
- **Registration Utilities**: Built-in helpers to register only what you need,
  keeping your bundle small.
- **ESM-First**: Optimised for modern bundlers like Vite and Rspack.

## Installation

```bash
pnpm add @amad3v/solid-chart chart.js
# or
npm install @amad3v/solid-chart chart.js
```

## Setup (Registration)

To keep the bundle lean, `solid-chart` does not register Chart.js components
globally by default. We provide utilities to register exactly what you need in
your entry point (e.g., `index.tsx`):

```tsx
import { registerCoreExtra, registerLine, registerBar } from 'solid-chart';

// Registers Tooltip, Legend, Colors, Title, and SubTitle
registerCoreExtra();

// Registers specific chart requirements
registerLine();
registerBar();
```

If you have custom requirements or 3rd party plugins, use the exposed
`registerComponent` helper:

```tsx
import { registerComponent } from 'solid-chart';
import MyPlugin from 'chartjs-my-plugin';

registerComponent(MyPlugin);
```

## Usage

Using the library is straightforward. You can use the generic `DefaultChart` or
any of the typed exports.

```tsx
import { Line } from 'solid-chart';
import { createStore } from 'solid-js/store';

const App = () => {
  const [data, setData] = createStore({
    labels: ['January', 'February', 'March', 'April'],
    datasets: [
      {
        label: 'Sales',
        data: [12, 19, 3, 5],
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        tension: 0.4, // Smooth lines
      },
    ],
  });

  return (
    <div style={{ width: '600px', height: '400px' }}>
      <Line 
        data={data} 
        options={{ 
          responsive: true,
          maintainAspectRatio: false 
        }} 
      />
    </div>
  );
};
```

## API

### Components

All components accept standard Chart.js configuration objects as props.

`DefaultChart`: The base component (requires a `type` prop).

`Line`, `Bar`, `Radar`, `Doughnut`, `PolarArea`, `Bubble`, `Pie`, `Scatter`:
Type-safe shortcuts.

## Registration Utilities

| Function                          | Description                                             |
| --------------------------------- | ------------------------------------------------------- |
| registerComponent                 | Raw access to Chart.register(...args).                  |
| registerCore                      | Registers Tooltip and Legend.                           |
| registerCoreExtra                 | Registers Title, Tooltip, Legend, Colors, and SubTitle. |
| registerLine                      | Registers requirements for Line charts.                 |
| registerBar                       | Registers requirements for Bar charts.                  |
| registerPie / registerDoughnut    | Registers requirements for Arc-based charts.            |
| registerRadar / registerPolarArea | Registers requirements for Radial charts.               |

### Props

| Prop    | Type         | Description                                       |
| ------- | ------------ | ------------------------------------------------- |
| data    | ChartData    | The reactive data object (Solid Store supported). |
| options | ChartOptions | Chart.js configuration options.                   |
| width   | number       | Default is 512.                                   |
| height  | number       | Default is 512.                                   |
| ref     | Ref          | Access to the underlying HTMLCanvasElement.       |

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request
for any improvements, bug fixes, or new features. Be sure to follow best
practices and ensure all tests pass before submitting.

## License

This project is licensed under the MIT License - see the [LICENSE](./LICENSE)
file for details.

## Acknowledgements

This library is a modernised and refactored version of
[solid-chartjs](https://github.com/s0ftik3/solid-chartjs), tailored to support
modern SolidJS and Chart.js 4.5+ architectures. All credit for the original
[solid-chartjs](https://github.com/s0ftik3/solid-chartjs) library and its
initial implementation goes to the original
[authors](https://github.com/s0ftik3).

## Disclaimer

Please note: This library is by no means a professional or production-ready
solution. It was developed out of necessity for personal projects, and it may
not meet the quality or stability standards required for a fully-fledged
production environment. It is intended for personal use and experimentation, and
contributions are highly encouraged to improve its functionality and stability.

## Changelog

Detailed changes for each release are documented in the
[CHANGELOG.md](./CHANGELOG.md).
