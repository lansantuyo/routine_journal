import { useState } from 'react';
import { Container, useMantineColorScheme, useComputedColorScheme } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { useNavigate } from 'react-router-dom';
import '@mantine/core/styles.css';
import '@mantine/dates/styles.css';

export default function Calendar() {
    const [value, setValue] = useState<Date | null>(null);
    const [opened, { toggle: toggleDesktop }] = useDisclosure();
    const navigate = useNavigate(); // Hook for navigation
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

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
        <Container 
            style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center'
        }}>
            <div>
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
                            borderRadius: '4%',
                            padding: '5px',
                            margin: '10px',
                            fontFamily: 'Inter',
                            fontWeight: '500',
                            fontSize: '32px',
                            height: '70px',
                            width: '70px',
                            backgroundColor: computedColorScheme === 'light' ? '#543F3F' : '#EAD8C2', 
                            color: computedColorScheme === 'light' ? '#EAD8C2' : '#543F3F'
                             
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
            </div>
            <div style={{ marginLeft: '150px' }}>
                <h2>Journal of</h2>
                <h1>USERNAME :D</h1>
            </div>
        </Container>
    );
}