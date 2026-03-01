import { useState } from "react";
import { useCookies } from "../../context/CookiesContext";
import { useInfo } from "../../context/InfoContext";
import "./CookieModal.scss";

const CookieModal = () => {
    const { accepted, acceptCookies } = useCookies();
    const { info, isLoading } = useInfo();
    const [showDetails, setShowDetails] = useState(false);

    const handleAccept = () => {
        acceptCookies(); // AnalyticsTracker detecta el cambio y dispara GA4
    };

    // No renderizar hasta tener datos o si ya se tomó decisión
    if (accepted !== null || isLoading) return null;

    return (
        <div className="cookie-overlay">
            <div className={`cookie-modal ${showDetails ? 'expanded' : ''}`}>
                <h2>Política de Cookies</h2>

                <div
                    className="cookie-content"
                    dangerouslySetInnerHTML={{ __html: info?.cookie || "" }}
                />

                <span
                    className="details-toggle"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Mostrar menos ▲" : "Más información ▼"}
                </span>

                {showDetails && (
                    <div
                        className="cookie-details"
                        dangerouslySetInnerHTML={{ __html: info?.CookieInfo || "" }}
                    />
                )}

                <div className="cookie-actions">
                    <button className="reject" onClick={handleAccept}>Rechazar</button>
                    <button className="accept" onClick={handleAccept}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};

export default CookieModal;