// import './HomePage.css';
// import React from "react";
// import * as Mantine from "@mantine/core";


// export default function HomePage() {
//     return (
//         <div>
//             <Mantine.Container>
//                 <div className="row">
//                     Column 1
//                     Column 2
//                     <div className="col">
//                         <h1>Column 3</h1>
//                 </div>
//                 </div>
//             </Mantine.Container>
//         </div>
//     );
//   }

//Source: https://mantine.dev/app-shell/?e=CollapseDesktop&s=code
import React from 'react';
import { AppShell, Burger, Button, Drawer, Group, Stack } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Link } from 'react-router-dom';
import './HomePage.css';


export default function HomePage() {
    const [opened, { toggle: toggleDesktop }] = useDisclosure();

    return (
        <AppShell
            layout='alt'
            header={{ height: 60}}
            aside={{ 
                width: 500, 
                breakpoint: 'md',   
                collapsed: {desktop: !opened }
            }}
            padding="md"
        >
        <AppShell.Header withBorder={false} bg='coffee.5'>
            <Group h="100%" px="md" justify='flex-end'>
                <Burger opened={opened} onClick={toggleDesktop} visibleFrom="sm" size="md" color='white' mt= '25' mr='100'/>
            </Group>
        </AppShell.Header>

        <AppShell.Aside bg = 'coffee.3' p="md">
            <Stack align='center' justify='center' gap='xl'>
                <Burger
                    opened={opened} 
                    onClick={toggleDesktop} 
                    visibleFrom="sm" 
                    size="md" 
                    color='white' 
                    mt= '10' 
                    ml='240'
                    bg={'coffee.5'}
                />
                <Link to ="/" className='link'>Homepage</Link>
                <Link to ="/" className='link'>Journal Entry</Link>
                <Link to ="/" className='link'>Activity</Link>
                <Link to ="/" className='link'>Timer</Link>
                <Link to ="/" className='link'>Activity Creation</Link>
                <Link to ="/" className='link'>Summary</Link>
            </Stack>
        </AppShell.Aside>
        
        {/* <Drawer opened = {opened} onClose={toggleDesktop} offset={15} position = 'right' title="Hi" >
            <Drawer.Body color='white'> </Drawer.Body>
        </Drawer> */}
        <AppShell.Main>Main</AppShell.Main>
    </AppShell>
  );
}