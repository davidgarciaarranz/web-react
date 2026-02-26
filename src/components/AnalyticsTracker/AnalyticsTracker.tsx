import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useCookies } from "../../context/CookiesContext";
import { trackPageView, initGA } from "../../utils/analytics";

const AnalyticsTracker = () => {
    const location = useLocation();
    const { accepted } = useCookies();

    useEffect(() => {
        if (accepted) {
            initGA(); // Asegura que esté iniciado
            trackPageView(location.pathname + location.search);
        }
    }, [location, accepted]);

    return null;
};

export default AnalyticsTracker;
