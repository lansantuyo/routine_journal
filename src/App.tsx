import './App.css'
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import RouterSwitcher from "./components/RouterSwitcher";

import '@mantine/core/styles.css';

import {
  AppShell,
} from '@mantine/core';

import {useDisclosure} from "@mantine/hooks";

function App() {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);

  return (
      <AppShell
          header = {{ height: 60  }}
          navbar = {{ width: 300, breakpoint: 'sm', collapsed: {mobile: !mobileOpened, desktop: !desktopOpened}}}
          padding = 'md'
      >
        <Header toggleDesktop={toggleDesktop} toggleMobile={toggleMobile} desktopOpened={desktopOpened} mobileOpened={mobileOpened} />
        <Navbar />
        <AppShell.Main>
          <RouterSwitcher />
        </AppShell.Main>
        <AppShell.Footer>
          Footer here
        </AppShell.Footer>
      </AppShell>
  );
}

export default App
