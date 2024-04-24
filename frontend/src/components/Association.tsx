import React, { useState } from 'react';
import { Text } from '@mantine/core';

function Association() {
    // Placeholder journal entries
    const journalEntries = [
        { date: '01/01', content: 'Today, I overslept' },
        { date: '01/02', content: 'Today, I slept' },
        { date: '01/03', content: 'Today, I was productive' },
    ];

    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    // pls remove if its resolved
    const handleClick = (entry: { date: string; content: string }) => {
        alert('Hehe oops!');
    };    

    const handleMouseEnter = (index: number) => {
        setHoveredIndex(index);
    };

    const handleMouseLeave = () => {
        setHoveredIndex(null);
    };

    const renderedEntries = journalEntries.map((entry, index) => (
        <div 
            key={index} 
            onClick={() => handleClick(entry)} 
            style={{ cursor: 'pointer', textDecoration: hoveredIndex === index ? 'underline' : 'none' }}
            onMouseEnter={() => handleMouseEnter(index)}
            onMouseLeave={handleMouseLeave}
        >
            <Text 
                style={{ 
                    fontSize: '25px',
                    fontWeight: 'bold',
                    transition: 'text-decoration 0.3s ease-in-out'
                }}
            >
                {entry.date} - {entry.content}
            </Text>
        </div>
    ));

    return (
        <div>
            {renderedEntries.length ? (
                renderedEntries
            ) : (
                <Text>No journal entries yet</Text>
            )}
        </div>
    );
}

export default Association;
