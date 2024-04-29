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
    const [description, setDescription] = useState("");
    const [newDescription, setNewDescription] = useState("");
    const [addingDescription, setAddingDescription] = useState(false);

    const handleDescriptionChange = (newDescription: string) => {
        setDescription(newDescription);
    };

    const handleAddDescription = () => {
        if (!addingDescription) {
            setAddingDescription(true);
        } else {
            if (newDescription.trim() !== "") {
                setDescription(newDescription);
                setAddingDescription(false);
                setNewDescription("");
            }
        }
    };

    return (
        <div>
            <Container size="xl" style={{ padding: 'md', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                <Stack gap="md">
                    <Text style={{
                        fontFamily: 'Inter',
                        fontSize: '60px',
                        color: '#e3ddc5',
                        textAlign: 'center'
                    }}>Activity 1</Text>
                    <div className="description-container-dark">
                        {addingDescription ? (
                            <textarea
                                value={newDescription}
                                onChange={(e) => setNewDescription(e.target.value)}
                                placeholder="Enter new description..."
                                style={{ width: '100%', minHeight: '100px', padding: '8px', boxSizing: 'border-box' }}
                            />
                        ) : (
                            <Description description={description} onDescriptionChange={handleDescriptionChange} />
                        )}
                        <Button
                            variant="outline"
                            color="blue"
                            style={{ marginTop: '20px' }}
                            onClick={handleAddDescription}
                        >
                            {addingDescription ? "Add" : "Add Description"}
                        </Button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center' }}>
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
