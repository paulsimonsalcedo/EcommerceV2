import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './main.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import { ToastContainer } from 'react-toastify';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ContextProvider>
            <ToastContainer/>
            <Main />
        </ContextProvider>
    </React.StrictMode>
);