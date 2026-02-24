// src/components/ContactButton/ContactButton.tsx

import { useState, useEffect } from "react";
import "./ContactButton.scss";

interface ContactButtonProps {
    mail: string;
}

const ContactButton = ({ mail }: ContactButtonProps) => {
    const [textoCopiado, setTextoCopiado] = useState(false);
    const [isFirefox, setIsFirefox] = useState(false);

    useEffect(() => {
        setIsFirefox(navigator.userAgent.toLowerCase().includes("firefox"));
    }, []);

    const enviarMail = () => {
        if (isFirefox) {
            navigator.clipboard.writeText(mail).then(() => {
                setTextoCopiado(true);
                setTimeout(() => setTextoCopiado(false), 3000);
            });
        } else {
            const asunto = "¡Hola Will, quiero ponerme en contacto contigo!";
            const cuerpo = "Hola Will,";
            const mailtoLink = `mailto:${mail}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
            window.open(mailtoLink, "_blank");
        }
    };

    return (
        <section id="contact" className="contactame">
            <button
                className="glowing-btn"
                onClick={enviarMail}
                aria-label="Enviar correo electrónico a Will Only Will"
            >
                <span className="glowing-txt">
                    {!isFirefox && (
                        <>¿ Hab<span className="faulty-letter">la<span className="faulty-letter"></span>mo</span>s ? <span className="faulty-letter">✉</span></>
                    )}
                    {isFirefox && !textoCopiado && "Copiar e-mail al portapapeles"}
                    {textoCopiado && "¡E-mail copiado con éxito!"}
                </span>
            </button>
        </section>
    );
};

export default ContactButton;