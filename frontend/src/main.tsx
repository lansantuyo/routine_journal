import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'
import {createTheme, MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

const theme = createTheme({

});

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <App />
        </MantineProvider>
    </React.StrictMode>,
)