import { useState } from 'react';
import {AppShell, Burger, Container, Space, Group, Stack, Collapse, Select, Grid} from '@mantine/core';
import { DatePicker, DatePickerProps, Day  } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';

export default function Calendar() {
    const [value, setValue] = useState<Date | null>(null);
    const [opened, { toggle: toggleDesktop }] = useDisclosure();
    const navigate = useNavigate(); // Hook for navigation

    const handleDateChange = (selectedDate: Date | null) => {
        setValue(selectedDate);
        // Navigate to TestJournalEntry with the selected date as a query parameter
        if (selectedDate) {
            const formattedDate = selectedDate.toISOString().split('T')[0]; // Format date as 'YYYY-MM-DD'
            navigate(`/TestJournal?date=${formattedDate}`);
        }
    };

    return (
        <Grid>
            <Grid.Col span={6}>
                <DatePicker
                    allowDeselect={true}
                    value={value}
                    onChange={handleDateChange}
                    hasNextLevel={false}
                    maxLevel="month"
                    size='xl'
                    monthLabelFormat="MMMM"
                    styles={{
                        day: {
                            // color: '#543f3f',
                            backgroundColor: '#ead8c2',
                            borderRadius: '4%',
                            padding: '5px',
                            margin: '10px',
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            fontSize: '32px',
                            height: '70px',
                            width: '70px',
                        },
                        calendarHeaderLevel: {
                            fontFamily: 'Inter',
                            fontWeight: '300',
                            fontSize: '48px',
                            textAlign: 'center',
                        },
                        calendarHeader: {
                            width: '400px',
                            transform: 'translateX(32%)',
                        },
                    }}
                />
            </Grid.Col>
            <Grid.Col span={6}>
                <h2>Journal of</h2>
                <h1>USERNAME :D</h1>
            </Grid.Col>
        </Grid>
    );
}