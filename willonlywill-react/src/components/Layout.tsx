import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Footer from "./Footer/Footer";
import CookieModal from "../context/CookieModal";

const Layout = () => {
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
