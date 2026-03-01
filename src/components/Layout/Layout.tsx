import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import CookieModal from "../CookieModal/CookieModal";
import { InfoProvider } from "../../context/InfoContext";

const Layout = () => {

    return (
        <InfoProvider>
            <Header />
            <Outlet />
            <Footer />
            <CookieModal />
        </InfoProvider>
    );
};

export default Layout;
