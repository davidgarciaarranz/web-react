import { useState, useEffect, useRef } from "react";
import { getInfo } from "../../services/firebaseService";
import { useCookies } from "../../context/CookiesContext";
import "./InitPage.scss";

const InitPage = () => {
    const images = [
        "/assets/images/1.png",
        "/assets/images/2.png",
        "/assets/images/3.png",
        "/assets/images/4.jpg",
        "/assets/images/5.png",
        "/assets/images/6.jpg",
        "/assets/images/7.png",
        "/assets/images/8.png",
        "/assets/images/9.jpg",
        "/assets/images/10.jpg",
        "/assets/images/11.png",
        "/assets/images/12.png",
    ];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [phone, setPhone] = useState("");
    const [mail, setMail] = useState("");
    const [description, setDescription] = useState("");
    const [videovisible, setVideoVisible] = useState(false);
    const [videourl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [textoCopiado, setTextoCopiado] = useState(false);

    const { accepted, acceptCookies } = useCookies();
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        const loadData = async () => {
            const data = await getInfo();
            const info = data[0];

            setPhone(info?.phone || "+34 695 18 47 36");
            setMail(info?.mail || "willonlywilllandingpage@gmail.com");
            setDescription(info?.description || "");
            setVideoVisible(info?.videovisible || false);
            setVideoUrl(`https://www.youtube.com/embed/${info?.videourl || ""}`);
            setIsLoading(false);
        };

        loadData();
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % images.length);
        }, 3000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const llama = () => window.open("tel:" + phone);

    const enviarMail = () => {
        const ua = navigator.userAgent.toLowerCase();
        if (ua.includes("firefox") && ua.includes("android")) {
            navigator.clipboard.writeText(mail);
            setTextoCopiado(true);
        } else {
            const asunto = "¡Hola Will, quiero ponerme en contacto contigo!";
            const cuerpo = "Hola Will,";
            const mailtoLink = `mailto:${mail}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
            window.open(mailtoLink, "_blank");
        }
    };

    if (isLoading) return <div>Cargando...</div>;

    return (
        <div className="init-page">
            <div className="slider">
                <img src={images[currentIndex]} alt="slider" />
            </div>

            <div className="description-container" dangerouslySetInnerHTML={{ __html: description }} />

            {videovisible && (
                <div className="video-container">
                    <iframe src={videourl} title="Video" width="560" height="315" />
                </div>
            )}

            <div className="actions">
                <button onClick={llama}>Llamar</button>
                <button onClick={enviarMail}>Enviar Mail</button>
            </div>

            {!accepted && (
                <div className="cookie-modal">
                    <p>Esta web utiliza cookies</p>
                    <button onClick={acceptCookies}>Aceptar</button>
                </div>
            )}

            {textoCopiado && <div className="copy-toast">Email copiado al portapapeles</div>}
        </div>
    );
};

export default InitPage;
