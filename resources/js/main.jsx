import React from "react";
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { ContextProvider } from "./contexts/ContextProvider.jsx";
import DefaulLayout from "./components/DefaultLayout";
import GuestLayout from "./components/GuestLayout";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Index from "./components/Index";
import axios from 'axios';
import About from "./components/About.jsx";
import Product from "./components/Product.jsx";
import Contact from "./components/Contact.jsx";
import AdminLogin from "./components/AdminLogin.jsx";
import AdminDashboard from "./components/AdminDashboard.jsx";
import AdminOrders from "./admin/Orders.jsx";
import AdminUsers from "./admin/Users.jsx";
import AdminProducts from "./admin/Products.jsx";
import AdminSettings from "./admin/Settings.jsx";
import Dashboard from "./admin/Dashboard.jsx";
import ProductList from "./admin/ProductList.jsx";
// import NotFound from "./components/NotFound";

const csrfToken = document.querySelector('meta[name="csrf-token"]').getAttribute('content');
axios.defaults.headers.common['X-CSRF-TOKEN'] = csrfToken;

const router = createBrowserRouter([
    {
        path: '/',
        element: <DefaulLayout />,
        children: [
            {
                path: '/',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/dashboard',
                element: <Index />
            },
            {
                path: '/about',
                element: <About />
            },
            {
                path: '/product',
                element: <Product />
            },
            {
                path: '/contact',
                element: <Contact />
            },
        ]
    },
    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },
    {
        path: '/admin/login',
        element: <AdminLogin />
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />,
        children: [
            { 
                path: '/admin/dashboard', 
                element: <Dashboard /> 
            },
            { 
                path: '/admin/dashboard/products', 
                element: <AdminProducts /> 
            },
            { 
                path: '/admin/dashboard/users', 
                element: <AdminUsers /> 
            },
            { 
                path: '/admin/dashboard/orders', 
                element: <AdminOrders /> 
            },
            { 
                path: '/admin/dashboard/settings', 
                element: <AdminSettings /> 
            },
            { 
                path: '/admin/dashboard/ProductList', 
                element: <ProductList /> 
            },
        ]
    },
    
]);

const Main = () => (
    <RouterProvider router={router} />
);

export default Main;