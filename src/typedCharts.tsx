import { Component } from 'solid-js';

import { DefaultChart } from './chart';
import type { ChartProps } from './types';

// Omit 'type' from props since these components define the type themselves
export type TypedChartProps = Omit<ChartProps, 'type'>;
type TypedChart = Component<TypedChartProps>;

export const Line: TypedChart = (props) => <DefaultChart type="line" {...props} />;
export const Bar: TypedChart = (props) => <DefaultChart type="bar" {...props} />;
export const Radar: TypedChart = (props) => <DefaultChart type="radar" {...props} />;
export const Doughnut: TypedChart = (props) => <DefaultChart type="doughnut" {...props} />;
export const PolarArea: TypedChart = (props) => <DefaultChart type="polarArea" {...props} />;
export const Bubble: TypedChart = (props) => <DefaultChart type="bubble" {...props} />;
export const Pie: TypedChart = (props) => <DefaultChart type="pie" {...props} />;
export const Scatter: TypedChart = (props) => <DefaultChart type="scatter" {...props} />;
