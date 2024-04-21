import React from 'react';
import { Text } from '@mantine/core';

interface DescriptionProps {
    description: string;
}
function DescriptionComponent({ description }: DescriptionProps) {
    // description of the activity
    return (
        <div>
            <Text>Activity Description:</Text>
            <Text>{description}</Text>
        </div>
    );
}

export default DescriptionComponent;
