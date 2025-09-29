import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacy";
import Listings from "./pages/listings";
import AdminLogin from "./pages/admin-login";
import Inventory from "./pages/car-inventory";
import AdminDashboard from "./pages/admin-dashboard";
import AdminEnquiries from "./pages/admin-enquiries";
import AdminSettings from "./pages/admin-settings";

const domNode = document.querySelector('#root');
const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />
    },
    {
        path: '/about',
        element: <About />
    },
    {
        path: '/contact',
        element: <Contact />
    },
    {
        path: '/privacy',
        element: <PrivacyPolicy />
    },
    {
        path: '/listings',
        element: <Listings />
    },
    {
        path: '/admin-login',
        element: <AdminLogin />
    },
    {
        path: '/admin/inventory',
        element: <Inventory />
    },
    {
        path: '/admin/dashboard',
        element: <AdminDashboard />
    },
    {
        path: '/admin/enquiries',
        element: <AdminEnquiries />
    },
    {
        path: '/admin/settings',
        element: <AdminSettings />
    }
])

if (domNode) {
    createRoot(domNode).render(
        <StrictMode>
            <RouterProvider router={router} />
        </StrictMode>
    );
} else {
    console.error('No root found');
}