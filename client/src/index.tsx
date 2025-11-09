import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
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
import ProtectedRoute from "./components/ui/protected-route";
import AlertErrorContext from "./contexts/alert-error";
import AlertSuccessContext from "./contexts/alert-success";
import { useState } from "react";

const domNode = document.querySelector('#root');

const router = createBrowserRouter(createRoutesFromElements(
    <Route>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/privacy" element={<PrivacyPolicy />} />
        <Route path="/listings" element={<Listings />} />
        <Route path="admin-login" element={<AdminLogin />} />
        <Route element={<ProtectedRoute />}>
            <Route path={'/admin/dashboard'} element={<AdminDashboard />} />
            <Route path={'/admin/inventory'} element={<Inventory />} />
            <Route path={'/admin/enquiries'} element={<AdminEnquiries />} />
            <Route path={'/admin/settings'} element={<AdminSettings />} />
        </Route>
    </Route>
))

function ContextWrapper({ children }: { children: React.ReactNode }) {
    const [isError, setIsError] = useState({ error: false, errorMessage: '' });
    const [isSuccess, setIsSuccess] = useState({ success: false, successMessage: '' });

    return (
        <AlertErrorContext.Provider value={[isError, setIsError]}>
            <AlertSuccessContext.Provider value={[ isSuccess, setIsSuccess ]}>
                {children}
            </AlertSuccessContext.Provider>
        </AlertErrorContext.Provider>
    )
}

if (domNode) {
    createRoot(domNode).render(
        <StrictMode>
            <ContextWrapper>
                <RouterProvider router={router} />
            </ContextWrapper>
        </StrictMode>
    );
} else {
    console.error('No root found');
}