import React, { useState } from 'react';
import { Stack, Container, Text, Button } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import Graph from '../components/Graph';
import Association from '../components/Association';
import Description from '../components/Description';
import '../styles/ActivityDetailPage.css';

export default function ActivityDetailPage() {
    const [opened, { toggle: toggleDesktop }] = useDisclosure();
    const [description, setDescription] = useState("click to add a description");

    const handleDescriptionChange = (newDescription: string) => {
        setDescription(newDescription);
    };

    return (
        <div>
            <Container size="xl" style={{ padding: 'md' }}>
            <Stack gap="md">
                <Text style={{
                    'font-family': 'Inter',
                    'font-size': '60px',
                    color: '#e3ddc5'
                }}>Activity 1</Text>
                <div style={{
                    display: 'flex',
                    margin: '0 5px',
                    alignItems: 'center'
                    }}
                >
                    <Description 
                        description={description} 
                        onDescriptionChange={handleDescriptionChange} 
                    />
                </div>
                <div style={{
                    display: 'flex',
                    alignItems: 'center'
                    }}>
                    <div style={{ marginRight: '60px' }}>
                        <Graph />   
                    </div>
                        <Association />
                    </div>
                </Stack>
            </Container>
        </div>
    );
}
