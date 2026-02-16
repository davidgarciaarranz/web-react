import { useCookies } from "../context/CookiesContext";

const CookieModal = () => {
    const { accepted, acceptCookies } = useCookies();

    if (accepted) return null;

    return (
        <div className="cookie-modal">
            <p>Esta web utiliza cookies.</p>
            <button onClick={acceptCookies}>Aceptar</button>
        </div>
    );
};

export default CookieModal;
