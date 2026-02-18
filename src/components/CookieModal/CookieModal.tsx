import { useState } from "react";
import { useCookies } from "../../context/CookiesContext";
import "./CookieModal.scss";

const CookieModal = () => {
    const { accepted, acceptCookies, rejectCookies } = useCookies();
    const [showDetails, setShowDetails] = useState(false);

    if (accepted !== null) return null;

    return (
        <div className="cookie-overlay">
            <div className={`cookie-modal ${showDetails ? 'expanded' : ''}`}>
                <h2>Política de Cookies</h2>

                <div className="cookie-content">
                    <p>
                        Este sitio web utiliza cookies técnicas necesarias para su funcionamiento
                        y, con su consentimiento, cookies de análisis y marketing conforme al
                        artículo 22.2 de la LSSI y al Reglamento (UE) 2016/679 (RGPD).
                    </p>

                    <p>
                        Puede aceptar todas las cookies o rechazarlas.
                    </p>

                    <span
                        className="details-toggle"
                        onClick={() => setShowDetails(!showDetails)}
                    >
                        {showDetails ? "Mostrar menos ▲" : "Más información ▼"}
                    </span>

                    {showDetails && (
                        <div className="cookie-details">
                            <p><strong>¿Qué son las cookies?</strong></p>
                            <p>Una cookie es un pequeño archivo de texto que se guarda en su navegador al visitar casi cualquier página web. Su utilidad es que la web sea capaz de recordar su visita cuando vuelva a navegar por esa página.</p>

                            <p><strong>Cookies que utilizamos:</strong></p>
                            <ul>
                                <li><strong>Técnicas:</strong> Necesarias para el funcionamiento del sitio.</li>
                                <li><strong>Analíticas:</strong> Nos permiten entender cómo interactúan los usuarios con el sitio (Google Analytics).</li>
                                <li><strong>Publicitarias:</strong> Ayudan a mostrar anuncios relevantes.</li>
                            </ul>

                            <p>Para más detalles, consulte nuestra Política de Privacidad completa.</p>
                        </div>
                    )}
                </div>

                <div className="cookie-actions">
                    <button className="reject" onClick={rejectCookies}>Rechazar</button>
                    <button className="accept" onClick={acceptCookies}>Aceptar</button>
                </div>
            </div>
        </div>
    );
};
export default CookieModal;
