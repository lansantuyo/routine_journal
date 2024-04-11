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
    );
}
