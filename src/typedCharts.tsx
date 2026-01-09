import { Component } from 'solid-js';

import { DefaultChart } from './chart';
import type { ChartProps } from './types';

// Omit 'type' from props since these components define the type themselves
export type TypedChartProps = Omit<ChartProps, 'type'>;
type TypedChart = Component<TypedChartProps>;

export const Line: TypedChart = (props) => <DefaultChart {...props} type="line" />;
export const Bar: TypedChart = (props) => <DefaultChart {...props} type="bar" />;
export const Radar: TypedChart = (props) => <DefaultChart {...props} type="radar" />;
export const Doughnut: TypedChart = (props) => <DefaultChart {...props} type="doughnut" />;
export const PolarArea: TypedChart = (props) => <DefaultChart {...props} type="polarArea" />;
export const Bubble: TypedChart = (props) => <DefaultChart {...props} type="bubble" />;
export const Pie: TypedChart = (props) => <DefaultChart {...props} type="pie" />;
export const Scatter: TypedChart = (props) => <DefaultChart {...props} type="scatter" />;
