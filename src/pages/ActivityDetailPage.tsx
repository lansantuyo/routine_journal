import React, { useState } from 'react';
import { AppShell, Burger, Stack, Container, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';
import Association from '../components/Association';
import Description from '../components/Description';

export default function ActivityDetailPage() {
    const [opened, { toggle: toggleDesktop }] = useDisclosure();

    return (
        <AppShell
            layout='alt'
            header={{ height: 60 }}
            aside={{
                width: 500,
                breakpoint: 'md',
                collapsed: { desktop: !opened }
            }}
            padding="md"
        >
            {/* <AppShell.Header withBorder={false} bg='coffee.5'>
                <Stack align='center' justify='flex-end' gap='md'>
                    <Burger opened={opened} onClick={toggleDesktop} visibleFrom="sm" size="md" color='white' />
                </Stack>
            </AppShell.Header>

            <AppShell.Aside bg='coffee.3' p="md">
                <Stack align='center' justify='center' gap='xl'>
                    <Burger
                        opened={opened}
                        onClick={toggleDesktop}
                        visibleFrom="sm"
                        size="md"
                        color='white'
                        bg={'coffee.5'}
                    />
                    <Link to="/" className='link'>Homepage</Link>
                    <Link to="/journal-entry" className='link'>Journal Entry</Link>
                    <Link to="/activity" className='link'>Activity</Link>
                    <Link to="/timer" className='link'>Timer</Link>
                    <Link to="/activity-creation" className='link'>Activity Creation</Link>
                    <Link to="/summary" className='link'>Summary</Link>
                </Stack>
            </AppShell.Aside> */}

            <AppShell.Main>
                <Container size="xl" style={{ padding: 'md' }}>
                    <Stack gap="md">
                        <div style={{ 
                            display: 'flex', 
                            justifyContent: 'space-between', 
                            alignItems: 'center' 
                            }}>
                            <Text size="xl">Activity Detail</Text>
                            <Button variant="outline">Edit</Button>
                        </div>
                        <Description description="add a description" />
                        <Graph />
                        <Association />
                    </Stack>
                </Container>
            </AppShell.Main>
        </AppShell>
    );
}
