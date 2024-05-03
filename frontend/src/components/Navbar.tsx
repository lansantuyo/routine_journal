import {
    AppShell,
    NavLink,
    useMantineColorScheme,
    useComputedColorScheme,
} from '@mantine/core';
import {useNavigate} from "react-router-dom";
import '../styles/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const {setColorScheme} = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light');

    const toggleColorScheme = () => {
        setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
    }

    return (
        <AppShell.Navbar 
            p='md' 
            style={{
                gap:'10px',
                backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                borderRight: 'none',
            }}
            className='nav-container'>
           <NavLink
                label="Homepage"
                onClick={() => navigate('/')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                    fontSize: '40px'
                }}
            />
            <NavLink
                label="Activities"
                onClick={() => navigate('/Activities')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                }}
            />
            <NavLink
                label="Journal"
                onClick={() => navigate('/Journal')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                }}
            />
            <NavLink
                label="Activity Detail"
                onClick={() => navigate('/Detail')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                }}
            />
            <NavLink
                label="Timer"
                onClick={() => navigate('/Timer')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F'
                }}
            />
            <NavLink
                label="Test journal for dev"
                onClick={() => navigate('/TestJournal')}
                className='nav-items'
                style={{
                    backgroundColor: computedColorScheme === 'dark' ? '#715555' : '#C0A18D', 
                    color: computedColorScheme === 'dark' ? '#EAD8C2' : '#543F3F',
                }}
            />
        </AppShell.Navbar>
    );
}

export default Navbar
