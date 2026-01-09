import type { ChartComponent } from 'chart.js';

import {
  ArcElement,
  BarController,
  BarElement,
  BubbleController,
  CategoryScale,
  Chart,
  Colors,
  DoughnutController,
  Legend,
  LinearScale,
  LineController,
  LineElement,
  PieController,
  PointElement,
  PolarAreaController,
  RadarController,
  RadialLinearScale,
  ScatterController,
  SubTitle,
  Title,
  Tooltip,
} from 'chart.js';

/**
 * Global registration helper for custom components and plugins.
 * Use this to register 3rd party plugins or custom scales.
 */
export const registerComponent = (...args: ChartComponent[]) => Chart.register(...args);

/**
 * Essential plugins most charts need.
 */
export const registerCore = () => registerComponent(Tooltip, Legend);

/**
 * Extra standard plugins for titles and automatic color palettes.
 */
export const registerCoreExtra = () => registerComponent(Title, Tooltip, Legend, Colors, SubTitle);

/**
 * Essential for Line chart.
 */
export const registerLine = () =>
  registerComponent(LineController, CategoryScale, LinearScale, PointElement, LineElement);

/**
 * Essential for Bar chart.
 */
export const registerBar = () =>
  registerComponent(BarController, CategoryScale, LinearScale, BarElement);

/**
 * Essential for Radar chart.
 */
export const registerRadar = () =>
  registerComponent(RadarController, RadialLinearScale, PointElement, LineElement);

/**
 * Essential for Doughnut chart.
 */
export const registerDoughnut = () => registerComponent(DoughnutController, ArcElement);

/**
 * Essential for Pie chart.
 */
export const registerPie = () => registerComponent(PieController, ArcElement);

/**
 * Essential for PolarArea chart.
 */
export const registerPolarArea = () =>
  registerComponent(PolarAreaController, RadialLinearScale, ArcElement);

/**
 * Essential for Bubble chart.
 */
export const registerBubble = () => registerComponent(BubbleController, LinearScale, PointElement);

/**
 * Essential for Scatter chart.
 */
export const registerScatter = () =>
  registerComponent(ScatterController, LinearScale, PointElement);
