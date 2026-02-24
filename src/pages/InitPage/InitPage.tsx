import { useState, useEffect, useRef } from "react";
import { getInfo } from "../../services/firebaseService";
import portadaImg from "../../assets/images/portada.webp";
import "./InitPage.scss";

{/*imagenes del slider*/ }
const images = [
    "/assets/images/1.webp",
    "/assets/images/2.webp",
    "/assets/images/3.webp",
    "/assets/images/4.webp",
    "/assets/images/5.webp",
    "/assets/images/6.webp",
    "/assets/images/7.webp",
    "/assets/images/8.webp",
    "/assets/images/9.webp",
    "/assets/images/10.webp",
    "/assets/images/11.webp",
    "/assets/images/12.webp",
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
    const [visible, setVisible] = useState(true); //para transiciones img

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

        //SEO
        //título de la pestaña
        document.title = "Will Only Will";

        let metaDesc = document.querySelector('meta[name="description"]');
        const descContent = "Explora el portafolio de Will Only Will: proyecto creativo, contenido exclusivo y contacto directo."

        if (metaDesc) {
            metaDesc.setAttribute("content", descContent);
        } else {
            const meta = document.createElement('meta');
            meta.name = "description";
            meta.content = descContent;
            document.head.appendChild(meta);
        }

        loadData();
    }, []);

    useEffect(() => {
        intervalRef.current = setInterval(() => {
            changeSlide(1);
        }, 5000);

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    const changeSlide = (direction: number) => {
        setVisible(false);
        setTimeout(() => {
            setCurrentIndex(prev =>
                (prev + direction + images.length) % images.length
            );
            setVisible(true);
        }, 300);
    };

    const nextSlide = () => changeSlide(1);
    const prevSlide = () => changeSlide(-1);

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
        <main id="init" className="container">
            {/*Imagen Autor */}
            <section className="imgAutor">
                <img
                    className="imgAutor-1"
                    alt="Retrato de Will Only Will - Autor y Creativo"
                    src={portadaImg}
                    loading="eager"
                    fetchPriority="high"
                    width="1083"
                    height="609"
                />
            </section>

            {/* Contenedor de Descripción y Video */}
            {/*renderizado HTML puro desde firebase*/}
            <section className="description-container">
                <article
                    id="newsletter"
                    className="description"
                    dangerouslySetInnerHTML={{ __html: description }}
                />
            </section>
            {/* Galería de Imágenes */}
            <section id="gallery">
                {videovisible && (
                    <iframe
                        title="Video de presentación de Will Only Will"
                        className="youtube-container"
                        src={videourl}
                        loading="lazy"
                        style={{ border: 0 }}
                        allowFullScreen
                    ></iframe>
                )}

                {/* Slider de Imágenes con Controles id= phostos para futuros usos*/}
                <div id="photos" className="slider">
                    <button
                        className="prev"
                        onClick={prevSlide}
                        aria-label="Imagen anterior"
                    >&lt;
                    </button>

                    <img
                        src={images[currentIndex]}
                        className={visible ? "" : "fade"}
                        alt={`Muestra de portafolio número ${currentIndex + 1} de Will only Will`}
                        height="1080"
                        width="1080"
                        loading="lazy"
                    />

                    <button
                        className="next"
                        onClick={nextSlide}
                        aria-label="Siguiente imagen"
                    >
                        &gt;
                    </button>
                </div>
            </section>
            {/* Sección de Contacto con Botón Glowing */}
            <section id="contact" className="contactame">
                <button
                    className="glowing-btn"
                    onClick={enviarMail}
                    aria-label="Enviar correo electrónico a Will only Will"
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
        </main>
    );
};

export default InitPage;
