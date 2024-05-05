import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextEditor from "../components/TextEditor";
import {Grid, Select, Button, Group, Autocomplete, Drawer, Accordion} from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import api from "../api";
import CreateActivityTypeModal from "../components/CreateActivityTypeModal";

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
    const [activities, setActivities] = useState<{ value: string; label: string }[]>([]);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [newActivityType, setNewActivityType] = useState('');
    const [drawerOpened, setDrawerOpened] = useState(false);


    useEffect(() => {
        const dateParam = query.get('date');
        if (dateParam) {
            setDate(dateParam);
            fetchJournalEntry(dateParam);
        }
        fetchActivityTypes();
    }, [query.get('date')]); // This ensures fetch is called whenever the date in the query changes

    const fetchJournalEntry = (date: string) => {
        api.get(`/api/journal_entries/by-date/?date=${date}`)
            .then(res => {
                if (res.data.length > 0) {
                    setContent(res.data[0].content);
                    setEntryId(res.data[0].id);
                } else {
                    setContent('');
                    setEntryId(null);
                }
            })
            .catch(err => console.error("Failed to fetch journal entry", err));
    };

    const fetchActivityTypes = () => {
        api.get('/api/activity_types/')
            .then(res => {
                const activitiesData = res.data.map((activity: any) => ({
                    value: activity.id.toString(),
                    label: activity.name
                }));
                setActivities(activitiesData);
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

    const handleInputChange = (value: string) => {
        setSelectedActivity(value);
    };

    const handleInputBlur = () => {
        // Check if the typed value matches any existing activities
        const match = activities.find(activity => activity.label === selectedActivity);
        if (!match) {
            // Optionally add code to handle new entries here
            console.log("New activity typed:", selectedActivity);
            // Add logic to create a new activity
        }
        setSelectedActivity(''); // Reset or keep the value according to your needs
    };

    const handleActivitySelect = async (value: string) => {
        const match = activities.find(activity => activity.label === value);
        if (match) {
            try {
                // API call to add activity to the journal entry
                const response = await api.post(`/api/journal_entries/${entryId}/add_activity/`, {
                    activityTypeId: match.value
                });
                if (response.status === 200) {
                    console.log('Activity added to Journal Entry:', response.data);
                    setSelectedActivities(prev => [...prev, match.value]); // Add activity to local state
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
            setSelectedActivity(''); // Ensure the field is cleared if empty
        }
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
                    data={activities.map(activity => activity.label)}
                    value={selectedActivity}
                    onChange={setSelectedActivity}
                    onBlur={() => handleActivitySelect(selectedActivity)}
                />
                <Accordion>
                    {activities.map((activity, index) => (
                        <Accordion.Item key={index} value={`activity_${index}`}>
                            <Accordion.Control>{activity.value}</Accordion.Control>
                            <Accordion.Panel>
                                insert metric adding here
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
                initialActivityName={selectedActivity}
            />
        </Grid>
    );
};

export default JournalEntryPage;
