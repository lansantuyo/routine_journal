// JournalEntry.tsx
import React from 'react';
import Header from '../components/Header';
import { TextInput, Button } from '@mantine/core'; 
import TextComponent from '../components/Text';

const JournalEntry = () => {
    return (
        <Header> 
            <div className="journal-entry">
                <h1>{new Date().toLocaleDateString()} Journal</h1>
                <div>
                    <h2>Today I did:</h2>
                    <TextInput
                        placeholder="Enter journal here..."
                        style={{ marginBottom: '10px' }}
                    />
                    <ul>
                        <li>[activity]</li>
                        <li>[activity]</li>
                    </ul>
                    <TextComponent /> 
                </div>
            </div>
        </Header>
    );
};

export default JournalEntry;
