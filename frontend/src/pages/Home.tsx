import '../styles/Home.css'
import Header from "../components/Header";
import RouterSwitcher from "../components/RouterSwitcher";
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import { AppShell, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { useDisclosure } from "@mantine/hooks";
import { useUser } from '../components/UserContext';

function Home() {
    const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
    const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
    const computedColorScheme = useComputedColorScheme('light');
    const { setColorScheme } = useMantineColorScheme();
    const { username } = useUser();

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    console.log('Home component - username:', username);

    return (
        <AppShell
            padding = 'md'
            style = {{ 
                backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#EAD8C2', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
            }}
        >
            <Header 
                toggleDesktop={toggleDesktop} 
                toggleMobile={toggleMobile} 
                desktopOpened={desktopOpened} 
                mobileOpened={mobileOpened} 
            />
            <AppShell.Main style={{ paddingTop: `150px` }}>
                <RouterSwitcher username={username} />
            </AppShell.Main>
        </AppShell>
    );
}

export default Home
