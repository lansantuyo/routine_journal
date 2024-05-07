import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Text, Title, Container, List, Anchor } from '@mantine/core';
import api from '../api';

interface ActivityType {
    id: number;
    name: string;
    description?: string;
}

interface Activity {
    id: number;
    journal_entry: number;
    journal_entry_title: string;
    journal_entry_date: string; // Reflects the updated interface
}

const ActivityDetailsPage: React.FC = () => {
    const { pk } = useParams<{ pk: string }>();
    const [activityType, setActivityType] = useState<ActivityType | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetchActivityType();
        fetchActivities();
    }, [pk]);

    const fetchActivityType = async () => {
        try {
            const response = await api.get(`/api/activity_types/${pk}/`);
            setActivityType(response.data);
        } catch (error: any) {
            console.error("Failed to fetch activity type", error);
            setError("Failed to fetch activity type. Please try again later.");
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await api.get(`/api/activities/by-type/?activity_type_id=${pk}`);
            setActivities(response.data);
            setLoading(false);
        } catch (error) {
            console.error("Failed to fetch activities by type", error);
            setError("Failed to fetch activities. Please try again later.");
            setLoading(false);
        }
    };

    if (loading) {
        return <Container><Text>Loading...</Text></Container>;
    }

    if (error) {
        return <Container><Text>Error: {error}</Text></Container>;
    }

    return (
        <Container>
            <Title order={1}>{activityType?.name || "Activity Type Details"}</Title>
            <Text size="sm">{activityType?.description || "No description available."}</Text>

            <Title order={2}>Activities</Title>
            {activities.length > 0 ? (
                <List>
                    {activities.map((activity) => (
                        <List.Item key={activity.id}>
                            <Card shadow="sm" padding="lg">
                                <Text>Activity ID: {activity.id}</Text>
                                <Text>Journal Entry Date: {activity.journal_entry_date}</Text>
                                <Anchor href={`/journal/${activity.journal_entry}`} target="_blank">
                                    View Journal Entry: {activity.journal_entry_title}
                                </Anchor>
                            </Card>
                        </List.Item>
                    ))}
                </List>
            ) : (
                <Text>No activities found for this type.</Text>
            )}
        </Container>
    );
};

export default ActivityDetailsPage;
