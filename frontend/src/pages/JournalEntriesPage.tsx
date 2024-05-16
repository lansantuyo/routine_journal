import React, { useEffect, useState } from 'react';
import {Container, Grid, Card, Text, Button, Loader, Title, useComputedColorScheme} from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import api from '../api'; // Make sure to import your API module

interface JournalEntry {
    id: number;
    date: string;
    title: string;
}

const JournalEntriesPage: React.FC = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const computedColorScheme = useComputedColorScheme('light');

    useEffect(() => {
        const fetchJournalEntries = async () => {
            try {
                const response = await api.get('/api/journal_entries/');
                const entries = response.data.sort((a: JournalEntry, b: JournalEntry) => new Date(b.date).getTime() - new Date(a.date).getTime());
                setJournalEntries(entries);
            } catch (error) {
                console.error('Failed to fetch journal entries', error);
            } finally {
                setLoading(false);
            }
        };

        fetchJournalEntries();
    }, []);

    const handleNavigate = (date: string) => {
        navigate(`/Journal?date=${date}`);
    };

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Title order={1}>Journal Entries</Title>
            <Grid>
                {journalEntries.map(entry => (
                    <Grid.Col key={entry.id} span={12}>
                        <Card shadow="sm" padding="lg">
                            <Text>{entry.title || "No Title"}</Text>
                            <Text size="sm" color="dimmed">{entry.date}</Text>
                            <Button
                                onClick={() => handleNavigate(entry.date)}
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
            </Grid>
        </Container>
    );
};

export default JournalEntriesPage;
