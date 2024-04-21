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
    // const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    // const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    return (
        <AppShell.Header>
            <Flex justify="space-between" align='center' style={{padding: '10px 20px'}}>
                <Burger opened={desktopOpened} onClick={toggleDesktop} visibleFrom='sm' size='sm' />
                <Burger opened={mobileOpened} onClick={toggleMobile} hiddenFrom='sm' size='sm' />
                <div>🤓Test Page🤓</div>
                <Button size='sm' variant='link' onClick={toggleColorScheme}>
                    {computedColorScheme === "dark" ? <FaSun /> :<FaMoon />}
                </Button>
            </Flex>
        </AppShell.Header>
    );
}

export default Header