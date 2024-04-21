import {
    AppShell,
    NavLink
} from '@mantine/core';
import {useNavigate} from "react-router-dom";

const Navbar = () => {
    const navigate = useNavigate();

    return (
        <AppShell.Navbar p='md' style={{gap:'10px'}}>
           <NavLink
                label="Homepage"
                onClick={() => navigate('/')}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Activities"
                onClick={() => navigate('/Activities')}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Journal"
                onClick={() => navigate('/Journal')}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Activity Detail"
                onClick={() => navigate('/Detail')}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Timer"
                onClick={() => navigate('/Timer')}
                style={{ margin: '5px' }}
            />
            <NavLink
                label="Test journal for dev"
                onClick={() => navigate('/TestJournal')}
                style={{ margin: '5px' }}
            />
            {/* <NavLink onClick={() => navigate('/Homepage')} style={{ margin: '5px' }}>Homepage</NavLink>
            <NavLink onClick={() => navigate('/Activities')} style={{ margin: '5px' }}>Activities</NavLink>
            <NavLink onClick={() => navigate('/Journal')} style={{ margin: '5px' }}>Journal</NavLink>
            <NavLink onClick={() => navigate('/Detail')} style={{ margin: '5px' }}>Activity Detail</NavLink> */}
        </AppShell.Navbar>
    );
}

export default Navbar
