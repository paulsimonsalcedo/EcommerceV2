import React from 'react';
import { createRoot } from 'react-dom/client';
import Main from './main.jsx';
import { ContextProvider } from './contexts/ContextProvider.jsx';
import { ToastContainer } from 'react-toastify';
import CartProvider from './contexts/CartContext.jsx';

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <ContextProvider>
            <CartProvider>     
                <ToastContainer/>
                <Main />
            </CartProvider>
        </ContextProvider>
    </React.StrictMode>
);