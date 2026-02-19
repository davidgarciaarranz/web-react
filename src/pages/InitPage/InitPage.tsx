import { useState, useEffect, useRef } from "react";
import { getInfo } from "../../services/firebaseService";
import portadaImg from "../../assets/images/portada.png";
import "./InitPage.scss";

{/*imagenes del slider*/ }
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

const InitPage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [mail, setMail] = useState("");
    const [description, setDescription] = useState("");
    const [videovisible, setVideoVisible] = useState(false);
    const [videourl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [textoCopiado, setTextoCopiado] = useState(false);
    const [isFirefox, setIsFirefox] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        /*Detectar si el navegador es Firefox*/
        setIsFirefox(navigator.userAgent.toLowerCase().includes("firefox"));

        /*carga datos desde firebase*/
        const loadData = async () => {
            try {
                const data = await getInfo(); // email, descripcion, video
                const info = data[0];

                if (info) {
                    setMail(info.mail || "willonlywilllandingpage@gmail.com");
                    setDescription(info.description || "");
                    setVideoVisible(info.videovisible || false);
                    setVideoUrl(`https://www.youtube.com/embed/${info.videourl || ""}`);
                }
            } catch (error) {
                console.error("Error cargando datos de Firebase:", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    useEffect(() => {
        startInterval();
        return () => stopInterval();
    }, []);

    /*temp slider de imgs*/
    const startInterval = () => {
        stopInterval();
        intervalRef.current = setInterval(() => {
            nextSlide();
        }, 3000);
    };

    const stopInterval = () => {
        if (intervalRef.current) clearInterval(intervalRef.current);
    };

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    /*envia mail al hacer click en el boton glowing*/
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

    /*para evitar renderizar contenido incompleto*/
    if (isLoading) return <div className="loading-state">Cargando...</div>;
    if (hasError) return <div className="loading-state">Error al cargar el contenido. Inténtalo de nuevo más tarde.</div>;

    /*contenedor principal de la pg*/
    return (
        <div id="init" className="container">
            {/* Contenido Izquierda - Imagen Autor */}
            <div className="left-content">
                <img
                    className="imgAutor-1"
                    alt="Logo"
                    src={portadaImg}
                />
            </div>

            {/* Contenedor de Descripción y Video */}
            {/*renderizado HTML puro desde firebase*/}
            <div className="description-container">
                <div
                    id="newsletter"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </div>
            <div id="gallery">
                {videovisible && (
                    <iframe
                        title="Video Will Only Will"
                        className="youtube-container"
                        src={videourl}
                        frameBorder="0"
                        allowFullScreen
                    ></iframe>
                )}


                {/* Slider de Imágenes con Controles id= phostos para futuros usos*/}
                <div id="photos" className="slider">
                    <button className="prev" onClick={prevSlide}>&lt;</button>
                    <img src={images[currentIndex]} alt={`Slider Image ${currentIndex + 1}`} />
                    <button className="next" onClick={nextSlide}>&gt;</button>
                </div>
            </div>
            {/* Sección de Contacto con Botón Glowing */}
            <div id="contact" className="contactame">
                <button className="glowing-btn" onClick={enviarMail}>
                    {!isFirefox && (
                        <span className="glowing-txt">
                            ¿Hab<span className="faulty-letter">la<span className="faulty-letter"></span>mo</span>s?
                            <span className="faulty-letter"> ✉</span>
                        </span>
                    )}

                    {isFirefox && !textoCopiado && (
                        <span className="glowing-txt">
                            Copi<span className="faulty-letter">ar<span className="faulty-letter"></span> e-mail</span>
                            al port<span className="faulty-letter">apapeles</span>
                        </span>
                    )}

                    {textoCopiado && (
                        <span className="glowing-txt">
                            Copi<span className="faulty-letter">ado<span className="faulty-letter"></span>e-mail</span>
                            al port<span className="faulty-letter">apapeles con éxito</span>
                        </span>
                    )}
                </button>
            </div>
        </div>
    );
};

export default InitPage;
