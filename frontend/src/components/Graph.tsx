import React from 'react';
import { Text } from '@mantine/core';

function Graph() {
    // Placeholder data for the graph
    const data = [
        { month: 'S', count: 10 },
        { month: 'M', count: 15 },
        { month: 'T', count: 8 },
        { month: 'W', count: 20 },
        { month: 'T', count: 12 },
        { month: 'F', count: 18 },
        { month: 'S', count: 25 },
    ];

    const maxCount = Math.max(...data.map(item => item.count));

    return (
        <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            {data.map(item => (
                <div key={item.month} style={{ marginRight: '10px' }}>
                    <div
                        style={{
                            backgroundColor: '#007BFF',
                            width: '30px',
                            height: `${(item.count / maxCount) * 100}%`,
                        }}
                    />
                    <Text style={{ textAlign: 'center', fontSize: '25px', fontWeight: 'bold' }}>{item.month}</Text>
                </div>
            ))}
        </div>
    );
}

export default Graph;
