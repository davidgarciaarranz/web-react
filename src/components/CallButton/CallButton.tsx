import "./CallButton.scss";

interface CallButtonProps {
    phone: string;
    visible: boolean;
}

const CallButton = ({ phone, visible }: CallButtonProps) => {

    // Controlado desde Firestore: phonevisible oculta el botón sin tocar código
    if (!visible || !phone) return null;

    return (
        <div className="llamanos">
            {/* Desktop: muestra el número directamente */}
            <a
                className="call-glowing-btn phone-desktop"
                href={`tel:${phone}`}
                aria-label={`Teléfono de contacto: ${phone}`}
            >
                <span className="glowing-txt">
                    📞 <span className="faulty-letter">{phone}</span>
                </span>
            </a>

            {/* Móvil: abre la app de teléfono */}
            <a
                className="call-glowing-btn phone-mobile"
                href={`tel:${phone}`}
                aria-label={`Llamar a Will Only Will`}
            >
                <span className="glowing-txt">
                    📞 <span className="faulty-letter">Llamar</span>
                </span>
            </a>
        </div>
    );
};

export default CallButton;
