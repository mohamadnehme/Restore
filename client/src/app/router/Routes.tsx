import { createBrowserRouter, Navigate } from "react-router-dom";
import AboutPage from "../../features/about/AboutPage";
import Login from "../../features/account/Login";
import Register from "../../features/account/Register";
import BasketPage from "../../features/basket/BasketPage";
import ContactPage from "../../features/contact/ContactPage";
import NotFound from "../errors/NotFound";
import App from "../layout/App";
import Catalogue from "../../features/catalogue/catalogue";
import ProductDetails from "../../features/catalogue/ProductDetails";
import ServerError from "../errors/ServerErrors";
import RequireAuth from "./RequireAuth";
import CheckoutPage from "../../features/checkout/CheckoutPage";
import Orders from "../../features/orders/Order";

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            // authenticated routes
            {
                element: <RequireAuth />, children: [
                    { path: 'checkout', element: <CheckoutPage /> },
                    { path: 'orders', element: <Orders /> }
                ]
            },
            { path: 'catalogue', element: <Catalogue /> },
            { path: 'catalogue/:id', element: <ProductDetails /> },
            { path: 'about', element: <AboutPage /> },
            { path: 'contact', element: <ContactPage /> },
            { path: 'server-error', element: <ServerError /> },
            { path: 'not-found', element: <NotFound /> },
            { path: 'basket', element: <BasketPage /> },
            { path: 'login', element: <Login /> },
            { path: 'register', element: <Register /> },
            { path: '*', element: <Navigate replace to='/not-found' /> }
        ]
    }
])