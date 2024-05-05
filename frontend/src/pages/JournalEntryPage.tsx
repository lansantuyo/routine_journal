import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextEditor from "../components/TextEditor";
import {Grid, Button, Autocomplete, Drawer, Accordion} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import api from "../api";
import CreateActivityTypeModal from "../components/CreateActivityTypeModal";


interface ActivityType {
    id: number;
    name: string;
    description?: string;
    metric_types?: MetricType[];
}

interface Activity {
    id: number;
    journal_entry: number;  // Assuming this is how you reference the journal entry
    activity_type: ActivityType;
    metrics?: Metric[];  // Optional, depends on if you include metrics
}

interface Metric {
    id: number;
    metric_type: MetricType;
    value: string;
}

interface MetricType {
    id: number;
    name: string;
    description?: string;
}


function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}

const JournalEntryPage: React.FC = () => {
    let query = useQuery();
    const [entryId, setEntryId] = useState<string | null>(null);
    const [date, setDate] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [debouncedContent] = useDebouncedValue(content, 200);
    const [modalOpened, setModalOpened] = useState(false);
    const [selectedActivity, setSelectedActivity] = useState<string>('');
    const [activityTypes, setActivityTypes] = useState<{ value: string; label: string }[]>([]);
    const [newActivityType, setNewActivityType] = useState('');
    const [drawerOpened, setDrawerOpened] = useState(false);
    const [activities, setActivities] = useState<Activity[]>([]);

    useEffect(() => {
        const dateParam = query.get('date');
        if (dateParam) {
            setDate(dateParam);
            fetchJournalEntry(dateParam);
        }
        fetchActivityTypes();
    }, [query.get('date')]); // This ensures fetch is called whenever the date in the query changes

    const fetchJournalEntry = async (date: string) => {
        try {
            const response = await api.get(`/api/journal_entries/by-date/?date=${date}`);
            if (response.data.length > 0) {
                const entry = response.data[0];
                setContent(entry.content);
                setEntryId(entry.id);
                const loadedActivities = await loadActivitiesWithMetrics(entry.activities || []);
                setActivities(loadedActivities);
            } else {
                setContent('');
                setEntryId(null);
                setActivities([]);
            }
        } catch (error) {
            console.error("Failed to fetch journal entry", error);
        }
    };

    const fetchMetrics = async (activityId: number) => {
        try {
            const response = await api.get(`/api/activities/${activityId}/metrics/`);
            console.log("Metrics fetch result:", response.data);
            return response.data; // This returns the list of metrics for the activity
        } catch (err) {
            console.error("Failed to fetch metrics", err);
            return []; // Return an empty array in case of error
        }
    };

    const loadActivitiesWithMetrics = async (activities: Activity[]) => {
        return Promise.all(activities.map(async (activity) => {
            const metrics = await fetchMetrics(activity.id);
            return { ...activity, metrics };
        }));
    };

    // const updateActivitiesWithMetrics = async () => {
    //     const updatedActivities = await Promise.all(activities.map(activity => loadActivitiesWithMetrics(activity)));
    //     setActivities(updatedActivities);
    // };


    const fetchActivityTypes = () => {
        api.get('/api/activity_types/')
            .then(res => {
                console.log("Activity types fetch result:", res.data);
                const activitiesData = res.data.map((activity: any) => ({
                    value: activity.id.toString(),
                    label: activity.name
                }));
                setActivityTypes(activitiesData);
            })
            .catch(err => console.error("Failed to fetch activities", err));
    };

    useEffect(() => {
        // Ensure there is content and a date before trying to save.
        if (date && debouncedContent) {
            const url = entryId ? `/api/journal_entries/${entryId}/` : '/api/journal_entries/';
            const method = entryId ? 'put' : 'post';
            api[method](url, { date, content: debouncedContent })
                .then(() => console.log('Journal Entry saved'))
                .catch(err => console.error('Failed to save Journal Entry', err));
        }
    }, [debouncedContent, date, entryId]); // This effect reacts to changes in the content, date, or entry ID.

    const handleActivitySelect = async (value: string) => {
        const match = activityTypes.find(activity => activity.label === value);
        if (match) {
            try {
                const response = await api.post(`/api/journal_entries/${entryId}/add_activity/`, {
                    activityTypeId: match.value
                });
                if (response.status === 200 || response.status === 201) {
                    console.log('Activity added to Journal Entry:', response.data);
                    // Update the activities state to include the new activity
                    setActivities(prevActivities => [...prevActivities, response.data]);
                    console.log("Current activities:", activities);
                    setSelectedActivity(''); // Clear the input field
                } else {
                    console.error('Failed to add activity to Journal Entry');
                }
            } catch (error) {
                console.error('Error adding activity to Journal Entry:', error);
            }
        } else if (value.trim() !== '') {
            // Handle new activity type creation
            setNewActivityType(value);
            setModalOpened(true);
        } else {
            setSelectedActivity(''); // Clear the field
        }
    };

    const handleNewActivityType = (newActivityType: ActivityType) => {
        setActivityTypes(prevTypes => [...prevTypes, {
            value: newActivityType.id.toString(),
            label: newActivityType.name
        }]);
    };


    return (
        <Grid>
            <Grid.Col span={12}>
                <h2>Journal Entry for {date}</h2>
                <TextEditor initialContent={content} onContentChange={setContent} />
                <Button onClick={() => setDrawerOpened(true)}>Manage Activities</Button>
            </Grid.Col>

            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title="Activity Management"
                padding="xl"
                size="lg"
                position="right"
            >
                <Button onClick={() => setModalOpened(true)}>Add New Activity Type</Button>
                <Autocomplete
                    label="Choose activities"
                    placeholder="Select or type an Activity"
                    data={activityTypes.map(activity => activity.label)}
                    value={selectedActivity}
                    onChange={setSelectedActivity}
                    onBlur={() => handleActivitySelect(selectedActivity)}
                />
                <Accordion>
                    {activities.map((activity, index) => (
                        <Accordion.Item key={activity.id} value={`activity_${index}`}>
                            <Accordion.Control>{activity.activity_type.name}</Accordion.Control>
                            <Accordion.Panel>
                                <div>Description: {activity.activity_type.description || "No description"}</div>
                                <div>
                                    Metrics:
                                    <ul>
                                        {activity.metrics?.map(metric => (
                                            <li key={metric.id}>{metric.metric_type.name}: {metric.value}</li>
                                        ))}
                                    </ul>
                                </div>
                            </Accordion.Panel>
                        </Accordion.Item>
                    ))}
                </Accordion>
            </Drawer>

            <CreateActivityTypeModal
                opened={modalOpened}
                onClose={() => {
                    setModalOpened(false);
                    setSelectedActivity(''); // Reset the activity selection when closing the modal
                }}
                initialActivityName={newActivityType}
                onAddActivityType={handleNewActivityType}
            />
        </Grid>
    );
};

export default JournalEntryPage;
