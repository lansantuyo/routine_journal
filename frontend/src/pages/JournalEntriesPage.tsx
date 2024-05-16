import React, { useEffect, useState } from 'react';
import { Container, List, Title, Text, Loader } from '@mantine/core';
import { Link } from 'react-router-dom';
import api from '../api'; // Make sure to import your API module

interface JournalEntry {
    id: number;
    date: string;
    title: string;
}

const JournalEntriesPage: React.FC = () => {
    const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
    const [loading, setLoading] = useState(true);

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

    if (loading) {
        return <Loader />;
    }

    return (
        <Container>
            <Title order={1}>Journal Entries</Title>
            <List spacing="sm" size="sm" center>
                {journalEntries.map(entry => (
                    <List.Item key={entry.date}>
                        <Link to={`/Journal?date=${entry.date}`}>
                            <Text>{entry.date} - {entry.title}</Text>
                        </Link>
                    </List.Item>
                ))}
            </List>
        </Container>
    );
};

export default JournalEntriesPage;
