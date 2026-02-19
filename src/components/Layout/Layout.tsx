import { Outlet } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieModal from "../CookieModal/CookieModal";
import { trackPageView } from "../../utils/analytics";
import { useCookies } from "../../context/CookiesContext";

const Layout = () => {
    const location = useLocation();
    const { accepted } = useCookies();

    {/* Trackea cada cambio de ruta solo si el usuario aceptó cookies */ }
    useEffect(() => {
        if (accepted) {
            trackPageView(location.pathname);
        }
    }, [location.pathname, accepted]);

    return (
        <>
            <Header />
            <Outlet />
            <Footer />
            <CookieModal />
        </>
    );
};

export default Layout;
