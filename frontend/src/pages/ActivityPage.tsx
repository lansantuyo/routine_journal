import React, { useState, useEffect } from 'react';
import api from '../api'; // Import your API utility that configures axios
import {Card, Text, Grid, Button, useMantineColorScheme, useComputedColorScheme, Title} from '@mantine/core';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

// Define an interface for ActivityType if not already defined
interface ActivityType {
    id: number;
    name: string;
    description?: string;
}

const ActivityTypesPage: React.FC = () => {
    const [activityTypes, setActivityTypes] = useState<ActivityType[]>([]);
    const navigate = useNavigate(); // Initialize the navigate function
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    useEffect(() => {
        fetchActivityTypes();
    }, []);

    const fetchActivityTypes = async () => {
        try {
            const response = await api.get('/api/activity_types/'); // Adjust the endpoint as necessary
            setActivityTypes(response.data);
        } catch (error) {
            console.error("Failed to fetch activity types", error);
        }
    };

    // Function to handle navigation
    const handleNavigate = (id: number) => {
        navigate(`/Activities/${id}`); // Navigate to the Activity details page
    };

    return (
        <>
            <Title order={1}>Activity Types</Title>
            <Grid>
                {activityTypes.map((activityType) => (
                    <Grid.Col key={activityType.id} >
                        <Card shadow="sm" padding="lg">
                            <Text>{activityType.name}</Text>
                            <Text size="sm">{activityType.description || "No description provided."}</Text>
                            {/* Button to navigate to activity detail page */}
                            <Button
                                onClick={() => handleNavigate(activityType.id)}
                                style = {{
                                    backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#EAD8C2',
                                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                                }}
                            >
                                View Details
                            </Button>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid></>

    );
};

export default ActivityTypesPage;
