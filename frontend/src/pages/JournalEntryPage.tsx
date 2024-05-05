import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import TextEditor from "../components/TextEditor";
import { Grid, Select, Button, Group } from '@mantine/core';
import { useDebouncedValue } from '@mantine/hooks';
import api from "../api";

function useQuery(): URLSearchParams {
    return new URLSearchParams(useLocation().search);
}

const JournalEntryPage: React.FC = () => {
    let query = useQuery();
    const [entryId, setEntryId] = useState<string | null>(null);
    const [date, setDate] = useState<string>('');
    const [content, setContent] = useState<string>('');
    const [debouncedContent] = useDebouncedValue(content, 200);
    const [selectedActivities, setSelectedActivities] = useState<string[]>([]);
    const [activities, setActivities] = useState<{ value: string; label: string }[]>([]);

    useEffect(() => {
        const dateParam = query.get('date');
        if (dateParam) {
            setDate(dateParam);
            fetchJournalEntry(dateParam);
        }
        fetchActivities();
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

    const fetchActivities = () => {
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


    return (
        <Grid>
            <Grid.Col span={6}>
                <h2>Journal Entry for {date}</h2>
                <TextEditor initialContent={content} onContentChange={setContent} />
            </Grid.Col>
            <Grid.Col span={6}>
                <h2>Today I did...</h2>
                <Select
                    label="Choose activities"
                    placeholder="Select an Activity"
                    data={activities}
                    searchable
                    onChange={(activity: string) => setSelectedActivities(prev => [...prev, activity])}
                />
                <Group mt={10}>
                    {selectedActivities.map((activity, index) => (
                        <Button key={index}>{activity}</Button>
                    ))}
                </Group>
            </Grid.Col>
        </Grid>
    );
};

export default JournalEntryPage;
