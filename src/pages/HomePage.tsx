//Source: https://mantine.dev/app-shell/?e=CollapseDesktop&s=code
import { useState } from 'react';
import { AppShell, Burger, Container, Space, Group, Stack, Collapse, Select } from '@mantine/core';
import { DatePicker, DatePickerProps, Day  } from '@mantine/dates';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css';


export default function HomePage() {
    const [value, setValue] = useState<Date | null>(null);
    const [opened, { toggle: toggleDesktop }] = useDisclosure();

    return (
        <div>
            <div style={{position: 'fixed', top: '70px', left: '80px'}}>
                <DatePicker
                    allowDeselect={true}
                    value={value}
                    onChange={setValue}
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
            </div>
            <div style={{position: 'fixed', top: '70px', left: '800px'}}>
                <h2>Journal of</h2>
                <h1>USERNAME :D</h1>
            </div>
        </div>
    );
}