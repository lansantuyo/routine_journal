import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './pages/App'
import HomePage from './pages/HomePage'
import NotFoundPage from './pages/NotFoundPage'

import './index.css'
import {createTheme, MantineProvider} from "@mantine/core";
import {createBrowserRouter, RouterProvider} from "react-router-dom";


//Source: https://mantine.dev/theming/mantine-provider/
document.body.style.backgroundColor = "#543f3f";
const theme = createTheme({
    fontFamily: 'Inter, sans-serif',
    headings: { fontFamily: 'Monaco, Courier, monospace' },
    // primaryColor: '#543f3f',
    colors: {
        //https://www.color-hex.com/color-palette/30023
        coffee: [ '#FFFFFF', '#e3ddc5', '#ead8c2', '#ae866c', '#765555', '#543f3f', '#ece0d1', '#dbc1ac', '#967259', '#634832'],
    },
});


const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />, // Add the HomePage component
        errorElement: <NotFoundPage />,
    },
    {
        path: '/app',
        element: <App />,
        errorElement: <NotFoundPage />,
    },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <MantineProvider theme={theme} defaultColorScheme='dark'>
            <RouterProvider router={router} />
        </MantineProvider>
    </React.StrictMode>,
)
