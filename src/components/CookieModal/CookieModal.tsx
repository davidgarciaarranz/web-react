import { useState, useEffect } from "react";
import { useCookies } from "../../context/CookiesContext";
import "./CookieModal.scss";
import { getInfo } from "../../services/firebaseService";

const CookieModal = () => {
    const { accepted, acceptCookies, /*rejectCookies*/ } = useCookies();
    const [showDetails, setShowDetails] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [cookie, setCookie] = useState("");
    const [cookieInfo, setCookieInfo] = useState("");

    useEffect(() => {
        const loadData = async () => {
            try {
                const Data = await getInfo();
                const info = Data[0];

                if (info) {
                    setCookie(info.cookie || "");
                    setCookieInfo(info.CookieInfo || "");
                }
            } catch (error) {
                console.error("Error cargando datos de Firebase:", error);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);


    /* Maneja la aceptación desde el modal */
    const handleAccept = () => {
        acceptCookies(); // AnalyticsTracker se encargará del resto al detectar el cambio de estado
    };

    /* Oculta el modal si ya se eligió */
    if (accepted !== null) return null;
    if (isLoading) return null;

    return (
        <div className="cookie-overlay">
            <div className={`cookie-modal ${showDetails ? 'expanded' : ''}`}>
                <h2>Política de Cookies</h2>

                <div className="cookie-content"
                    dangerouslySetInnerHTML={{ __html: cookie }}
                />
                <span
                    className="details-toggle"
                    onClick={() => setShowDetails(!showDetails)}
                >
                    {showDetails ? "Mostrar menos ▲" : "Más información ▼"}
                </span>

                {showDetails && (
                    <div className="cookie-details"
                        dangerouslySetInnerHTML={{ __html: cookieInfo }}
                    />
                )}

                <div className="cookie-actions">
                    {/*<button className="reject" onClick={rejectCookies}>Rechazar</button>*/}
                    <button className="reject" onClick={handleAccept}>Rechazar</button>
                    <button className="accept" onClick={handleAccept}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};
export default CookieModal;
