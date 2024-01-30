import React from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';
import { ChartData, ChartOptions } from 'chart.js';
import { LinksFunction } from '@remix-run/node';
import styles from '~/components/Charts/Charts.css';

export const links: LinksFunction = () => {
    return [{ rel: 'stylesheet', href: styles }];
};
// Specify the type for 'data' as ChartData for a bar chart
interface BarChartProps {
    data: ChartData<'bar'>; // Specify 'bar' for bar chart
    options: ChartOptions<'bar'>; // Make sure options match the chart type
}

const BarChart: React.FC<BarChartProps> = ({ data, options }) => {
    return <Bar data={data} options={options} />;
};

export default BarChart;
