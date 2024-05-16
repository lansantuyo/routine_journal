import React from 'react';
import { LineChart } from '@mantine/charts';

interface MetricType {
    id: number;
    name: string;
    description?: string;
}

interface Metric {
    id: number;
    metric_type: MetricType;
    value: string;
}

interface Activity {
    id: number;
    date: string;
    metrics: Metric[];
}

interface Props {
    activities: Activity[];
}

const MetricsLineCharts: React.FC<Props> = ({ activities }) => {
    // This map will hold dates as keys and an object of metric names to values as the value
    const dataByDate: Record<string, Record<string, number>> = {};
    const metricNames = new Set<string>();

    activities.forEach(activity => {
        const { date } = activity;
        // Ensure there's an object for this date
        if (!dataByDate[date]) {
            dataByDate[date] = {};
        }

        activity.metrics.forEach(metric => {
            // Add each metric value under its name at the current date
            dataByDate[date][metric.metric_type.name] = parseFloat(metric.value);
            // Collect unique metric names
            metricNames.add(metric.metric_type.name);
        });
    });

    // Convert dataByDate into the array format expected by LineChart
    const chartData = Object.entries(dataByDate).map(([date, metrics]) => ({
        date,
        ...metrics
    }));

    const series = Array.from(metricNames).map((name, index) => ({
        name,
        color: `hsl(${(index * 360) / metricNames.size}, 100%, 50%)`
    }));

    console.log(chartData);  // Logging the final structure to see the result

    return (
        <div>
            <h3>Metrics Over Time</h3>
            <LineChart
                data={chartData}
                dataKey="date"
                h={200}
                series={series}
                curveType="linear"
                // xScaleType="time"
            />
        </div>
    );
};

export default MetricsLineCharts;
