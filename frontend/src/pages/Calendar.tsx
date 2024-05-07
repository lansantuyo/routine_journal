import { useState } from 'react';
import {AppShell, Burger, Container, Space, Group, Stack, Collapse, Select, Grid} from '@mantine/core';
import { DatePicker, DatePickerProps, Day  } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import '../styles/Calendar.css';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function Calendar() {
    const [value, setValue] = useState<Date | null>(null);
    const [opened, { toggle: toggleDesktop }] = useDisclosure();
    const navigate = useNavigate(); // Hook for navigation

    const handleDateChange = (selectedDate: Date | null) => {
        setValue(selectedDate);
        if (selectedDate) {
            // Get the timezone offset in minutes and convert it to milliseconds
            const timezoneOffset = selectedDate.getTimezoneOffset() * 60000;
            // Create a new Date object adjusted for the timezone offset
            const localDate = new Date(selectedDate.getTime() - timezoneOffset);
            // Format the adjusted date as 'YYYY-MM-DD'
            const formattedDate = localDate.toISOString().split('T')[0];
            navigate(`/Journal?date=${formattedDate}`);
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