import { createRoot } from "react-dom/client";
import { StrictMode } from "react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router";
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import PrivacyPolicy from "./pages/privacy";

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