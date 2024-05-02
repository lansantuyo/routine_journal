import React, { useState } from 'react';
import '../styles/App.css'
import Navbar from "../components/Navbar";
import Header from "../components/Header";
import RouterSwitcher from "../components/RouterSwitcher";

import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';

import {
  AppShell, useComputedColorScheme, useMantineColorScheme
} from '@mantine/core';

import { useDisclosure, } from "@mantine/hooks";

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const computedColorScheme = useComputedColorScheme('light');
  const { setColorScheme } = useMantineColorScheme();

  const toggleColorScheme = () => {
      setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light');
  }

  return (
      <AppShell
          header = {{ height: 60  }}
          navbar = {{ width: 300, breakpoint: 'sm', collapsed: {mobile: !mobileOpened, desktop: !desktopOpened}}}
          padding = 'md'
          style = {{ 
            backgroundColor: computedColorScheme === 'dark' ? '#543F3F' : '#AE866C', 
            color: computedColorScheme === 'dark' ? '#AE866C' : '#543F3F'
          }}
      >
        <Header 
          toggleDesktop={toggleDesktop} 
          toggleMobile={toggleMobile} 
          desktopOpened={desktopOpened} 
          mobileOpened={mobileOpened} 
        />
        <Navbar />
        <AppShell.Main>
          <RouterSwitcher />
        </AppShell.Main>
      </AppShell>
  );
}

export default App
