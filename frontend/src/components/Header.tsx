import {
    Flex,
    AppShell,
    Burger,
    Button,
    useMantineColorScheme,
    useComputedColorScheme,
} from '@mantine/core';

import {FaSun, FaMoon} from 'react-icons/fa';

const Header = ({toggleDesktop, toggleMobile, mobileOpened, desktopOpened}: any) => {
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    return (
        <AppShell.Header 
            style = {{
                backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#AE866C', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                borderBottom: 'none'
            }}
        >
            <Flex justify="space-between" align='center' style={{padding: '10px 20px'}}>
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
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

export default Header