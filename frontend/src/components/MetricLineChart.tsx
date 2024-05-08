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

    activities.forEach(activity => {
        const { date } = activity;
        // Ensure there's an object for this date
        if (!dataByDate[date]) {
            dataByDate[date] = {};
        }

        activity.metrics.forEach(metric => {
            // Add each metric value under its name at the current date
            dataByDate[date][metric.metric_type.name] = parseFloat(metric.value);
        });
    });

    // Convert dataByDate into the array format expected by LineChart
    const chartData = Object.entries(dataByDate).map(([date, metrics]) => ({
        date,
        ...metrics
    }));

    console.log(chartData);  // Logging the final structure to see the result

    return (
        <div>
            <h3>Metrics Over Time</h3>
            <LineChart
                data={chartData}
                dataKey="date"
                h={200}
                series={[
                    { name: 'Miles ran', color: 'blue' },
                    { name: 'Time spent', color: 'red' }  // You can add more series as needed
                ]}
                curveType="linear"
                // xScaleType="time"
            />
        </div>
    );
};

export default MetricsLineCharts;
