import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppShell, Burger, Container, Space, Stack, TextInput, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import '../styles/JournalEntryPage.css';

export default function JournalEntryPage() {
    const [entry, setEntry] = useState('');
    const [currentDate, setCurrentDate] = useState(new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }));
    const [opened, { toggle: toggleDesktop }] = useDisclosure();

    const handleSubmit = () => {
        console.log('Journal Entry:', entry);
        setEntry('');
    };

    return (
        <AppShell
            layout="alt"
            header={{ height: 60 }}
            padding="md"
        >
            <AppShell.Main>
                <Container size="lg" className="journal-container">
                    <h1 className="journal-title">{currentDate} Journal Entry</h1>
                    <Space h="lg" />

                    <TextInput
                        placeholder="Enter your journal entry here..."
                        value={entry}
                        onChange={(event) => setEntry(event.target.value)}
                        className="journal-input"
                    />

                   {/* Button to submit journal entry */}
                    <Button onClick={handleSubmit} className="journal-submit-button">Submit</Button>
                </Container>
            </AppShell.Main>

            {/* Sidebar */}
            <AppShell.Aside p="md">
                <Stack align='center' justify='center' gap='xl'>
                    <Burger
                        opened={opened} 
                        onClick={toggleDesktop} 
                        visibleFrom="sm" 
                        size="md" 
                        color='white' 
                        mt= '10' 
                        ml='240'
                        bg={'coffee.5'}
                    />
                    <Link to ="/" className='link'>Homepage</Link>
                    <Link to ="/" className='link'>Journal Entry</Link>
                    <Link to ="/" className='link'>Activity</Link>
                    <Link to ="/" className='link'>Timer</Link>
                    <Link to ="/" className='link'>Activity Creation</Link>
                    <Link to ="/" className='link'>Summary</Link>
                </Stack>
            </AppShell.Aside>
        </AppShell>
    );
}