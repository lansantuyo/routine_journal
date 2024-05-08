import React, { useEffect, useState } from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Card, Text, Title, Container, List, Anchor, Grid, Button, UnstyledButton, Loader} from '@mantine/core';
import api from '../api';
import MetricsLineCharts from "../components/MetricLineChart";

interface ActivityType {
    id: number;
    name: string;
    description?: string;
}

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
    journal_entry: number;
    metrics: Metric[]; // Ensure this is not optional if metrics are always expected
    date: string;

}

interface JournalEntry {
    id: number;
    title: string;
    date: string;
    content: string;
}

const ActivityDetailsPage: React.FC = () => {
    const { pk } = useParams<{ pk: string }>();
    const [activityType, setActivityType] = useState<ActivityType | null>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [journalEntries, setJournalEntries] = useState<Record<number, JournalEntry>>({});
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchActivityType();
        fetchActivities();
    }, [pk]);

    const fetchActivityType = async () => {
        try {
            const response = await api.get(`/api/activity_types/${pk}/`);
            setActivityType(response.data as ActivityType);
        } catch (error: any) {
            console.error("Failed to fetch activity type", error);
            setError("Failed to fetch activity type. Please try again later.");
        }
    };

    const fetchActivities = async () => {
        try {
            const response = await api.get(`/api/activities/by-type/?activity_type_id=${pk}`);
            console.log("Activities fetch result:", response.data);
            const fetchedActivities = response.data as Activity[];
            setActivities(fetchedActivities);
            const journalEntryIds = [...new Set(fetchedActivities.map(activity => activity.journal_entry))];
            fetchJournalEntries(journalEntryIds);
        } catch (error) {
            console.error("Failed to fetch activities by type", error);
            setError("Failed to fetch activities. Please try again later.");
            setLoading(false);
        }
    };

    const fetchJournalEntries = async (journalEntryIds: number[]) => {
        for (const id of journalEntryIds) {
            if (!journalEntries[id]) {
                try {
                    const response = await api.get(`/api/journal_entries/${id}/`);
                    setJournalEntries(prevEntries => ({
                        ...prevEntries,
                        [id]: response.data as JournalEntry
                    }));
                } catch (error) {
                    console.error(`Failed to fetch journal entry ${id}`, error);
                }
            }
        }
        setLoading(false);
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
                <Grid>
                    {activities.map((activity) => (
                        <Grid.Col key={activity.id} span={4}>
                            <Card shadow="sm" padding="lg">
                                {journalEntries[activity.journal_entry] ? (
                                    <Button
                                        onClick={() => navigate(`/Journal?date=${journalEntries[activity.journal_entry].date}`)}
                                        style={{ marginTop: '10px', backgroundColor: '#5c6ac4', color: 'white' }}
                                    >
                                        {journalEntries[activity.journal_entry].title ? `${journalEntries[activity.journal_entry].title} - ${journalEntries[activity.journal_entry].date}` : journalEntries[activity.journal_entry].date}
                                    </Button>
                                ) : (
                                    <Text style={{ marginTop: '10px' }}>
                                        <Loader size="sm" />
                                        Loading journal entry...
                                    </Text>
                                )}

                                <Text>Activity ID: {activity.id}</Text>
                                {activity.metrics && activity.metrics.length > 0 ? (
                                    activity.metrics.map((metric) => (
                                        <Text key={metric.id}>
                                            {metric.metric_type.name}: {metric.value}
                                        </Text>
                                    ))
                                ) : (
                                    <Text>No metrics found for this activity.</Text>
                                )}
                            </Card>
                        </Grid.Col>
                    ))}
                        <Grid.Col>
                            <MetricsLineCharts activities={activities} />
                        </Grid.Col>
                </Grid>
            ) : (
                <Text>No activities found for this type.</Text>
            )}

        </Container>
    );
};

export default ActivityDetailsPage;
