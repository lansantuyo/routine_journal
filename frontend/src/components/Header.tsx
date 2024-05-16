import React from 'react';
import {
    Flex,
    AppShell,
    Burger,
    Button,
    useMantineColorScheme,
    useComputedColorScheme,
} from '@mantine/core';
import { FaSun, FaMoon } from 'react-icons/fa';
import { NavLink, useLocation } from "react-router-dom";

const Header = ({ toggleDesktop, toggleMobile, mobileOpened, desktopOpened }: any) => {
    const location = useLocation();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    return (
        <AppShell.Header 
            style = {{
                backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#EAD8C2', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                border: 'none'
            }}
        >
            <Flex 
                justify="space-between" 
                align='center' 
                style={{ 
                    padding: '40px', 
                    height: '100%'
                }}
            >
                {/* Navigation links */}
                <Flex align='center'>
                    <NavLink 
                        to="/" 
                        style={{ 
                            marginLeft: '10px', 
                            color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            marginRight: '20px',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            transition: 'all 0.3s ease',
                            backgroundColor: location.pathname === '/' ? (computedColorScheme === 'dark' ? '#715555' : '#C0A18D') : 'transparent',
                            cursor: 'pointer'
                        }}
                    >
                        Homepage
                    </NavLink>
                    <NavLink 
                        to="/Activities" 
                        style={{ 
                            marginLeft: '10px', 
                            color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            marginRight: '20px',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            transition: 'all 0.3s ease',
                            backgroundColor: location.pathname === '/Activities' ? (computedColorScheme === 'dark' ? '#715555' : '#C0A18D') : 'transparent',
                            cursor: 'pointer'
                        }}
                    >
                        Activities
                    </NavLink>
                    <NavLink 
                        to="/Timer" 
                        style={{ 
                            marginLeft: '10px', 
                            color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                            fontWeight: 'bold',
                            textDecoration: 'none',
                            padding: '5px 10px',
                            borderRadius: '5px',
                            transition: 'all 0.3s ease',
                            backgroundColor: location.pathname === '/Timer' ? (computedColorScheme === 'dark' ? '#715555' : '#C0A18D') : 'transparent',
                            cursor: 'pointer'
                        }}
                    >
                        Timer
                    </NavLink>
                </Flex>
                {/* Toggle button */}
                <Button 
                    size='sm'
                    variant='link'
                    onClick={toggleColorScheme}
                    style={{
                        backgroundColor: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                        color: computedColorScheme === 'light' ? '#EAD8C2' : '#543F3F'
                    }}
                >
                    {computedColorScheme === "dark" ? <FaSun /> :<FaMoon />}
                </Button>
            </Flex>
        </AppShell.Header>
    );
}

export default Header;
