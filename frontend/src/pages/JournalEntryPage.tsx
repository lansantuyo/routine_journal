import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextEditor from "../components/TextEditor";
import {Grid, Button, Autocomplete, Drawer, Accordion, TextInput, Title, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
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
    const [title, setTitle] = useState<string>('');
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

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
                setTitle(entry.title);  // Set the title from the fetched data
                setEntryId(entry.id);
                const loadedActivities = await loadActivitiesWithMetrics(entry.activities || []);
                setActivities(loadedActivities);
            } else {
                setContent('');
                setTitle('');  // Reset the title if no entry is found
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

    // useEffect(() => {
    //     if (date && (debouncedContent || title) && entryId) {
    //         const url = `/api/journal_entries/${entryId}/`;
    //         const method = 'put';
    //         api[method](url, { date, content: debouncedContent, title })
    //             .then(() => console.log('Journal Entry updated'))
    //             .catch(err => console.error('Failed to update Journal Entry', err));
    //     }
    // }, [debouncedContent, date, entryId, title]);  // Include title in the dependency array



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
        // Determine the API method and URL based on whether an entryId is present
        if (date && (debouncedContent || title) && (entryId || date)) {
            const url = entryId ? `/api/journal_entries/${entryId}/` : '/api/journal_entries/';
            const method = entryId ? 'put' : 'post';
            api[method](url, { date, content: debouncedContent, title })
                .then(response => {
                    console.log(entryId ? 'Journal Entry updated' : 'Journal Entry created');
                    // If creating a new entry, update the entryId with the new one from the response
                    if (!entryId && response.data.id) {
                        setEntryId(response.data.id);
                    }
                })
                .catch(err => console.error('Failed to save Journal Entry', err));
        }
    }, [debouncedContent, date, entryId, title]);

    // useEffect(() => {
    //     // Ensure there is content and a date before trying to save.
    //     if (date && debouncedContent) {
    //         const url = entryId ? `/api/journal_entries/${entryId}/` : '/api/journal_entries/';
    //         const method = entryId ? 'put' : 'post';
    //         api[method](url, { date, content: debouncedContent })
    //             .then(() => console.log('Journal Entry saved'))
    //             .catch(err => console.error('Failed to save Journal Entry', err));
    //     }
    // }, [debouncedContent, date, entryId]); // This effect reacts to changes in the content, date, or entry ID.

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

    const handleMetricChange = async (
        activityId: number,
        metricTypeId: number,
        value: string,
        metricId?: number | null   // metricId can be optional and undefined initially for new metrics
    ) => {
        // Prepare the API URL and method based on the existence of metricId
        const apiUrl = metricId ? `/api/metrics/${metricId}/` : '/api/metrics/';
        const method = metricId ? 'put' : 'post';

        // Prepare the data object for the request
        const metricData = {
            activity: activityId,
            metric_type_id: metricTypeId,
            value: value
        };

        try {
            // Execute the API call
            const response = await api[method](apiUrl, metricData);
            console.log('Metric saved:', response.data);

            // Update the activities state to reflect the new or updated metric
            setActivities(prevActivities => prevActivities.map(activity => {
                if (activity.id === activityId) {
                    const metricsUpdated = activity.metrics ? [...activity.metrics] : [];
                    const metricIndex = metricsUpdated.findIndex(m => m.id === metricId);

                    if (metricIndex > -1) {
                        // Update existing metric
                        metricsUpdated[metricIndex] = { ...metricsUpdated[metricIndex], value: value };
                    } else {
                        // Add new metric with returned ID from the server
                        metricsUpdated.push({ ...metricData, id: response.data.id, metric_type: { id: metricTypeId, name: "", description: "" } });
                    }

                    // Return updated activity
                    return { ...activity, metrics: metricsUpdated };
                }
                return activity;
            }));
        } catch ( error) {
            console.error('Error saving metric:', error);
            // Handle error, potentially show an error message to the user
        }
    };


    return (
        <Grid 
            style={{ 
                backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#EAD8C2', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
            }}
        >
            <Grid.Col span={12}>
                <Title order={1}>{date}</Title>
                {/*<h2>Journal Entry for {date}</h2>*/}
                <TextInput
                    value={title}
                    onChange={(event) => setTitle(event.currentTarget.value)}
                    placeholder="Enter Journal Entry Title"
                    styles={{ 
                        input: { 
                            border: 'none', 
                            fontSize: '20px', 
                            fontWeight: 'bold',
                            color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                        }
                    }}
                    variant="unstyled"
                />

                <TextEditor initialContent={content} onContentChange={setContent} />
                <Button 
                    onClick={() => setDrawerOpened(true)}
                    style={{ 
                        backgroundColor: computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2', 
                        color: computedColorScheme === 'light' ? '#EAD8C2' : '#543F3F'
                    }}
                >
                    Manage Activities
                </Button>
            </Grid.Col>

            <Drawer
                opened={drawerOpened}
                onClose={() => setDrawerOpened(false)}
                title="Activity Management"
                padding="xl"
                size="lg"
                position="right"
                style={{ 
                    backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#EAD8C2', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                }}
            >
                <Button 
                    onClick={() => setModalOpened(true)}
                    style={{ 
                        backgroundColor: computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2', 
                        color: computedColorScheme === 'light' ? '#EAD8C2' : '#543F3F'
                    }}
                >
                    Add New Activity Type
                </Button>
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
                                    {activity.activity_type.metric_types?.map(metricType => {
                                        const existingMetric = activity.metrics?.find(m => m.metric_type.id === metricType.id);
                                        return (
                                            <TextInput
                                                key={metricType.id}
                                                label={metricType.name}
                                                description={metricType.description}
                                                value={existingMetric ? existingMetric.value : ''}
                                                onChange={(event) => handleMetricChange(
                                                    activity.id,
                                                    metricType.id,
                                                    event.currentTarget.value,
                                                    existingMetric ? existingMetric.id : null
                                                )}
                                            />
                                        );
                                    })}
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
