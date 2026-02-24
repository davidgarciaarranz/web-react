import { useState, useEffect, useRef } from "react";
import { getInfo } from "../../services/firebaseService";
import portadaImg from "../../assets/images/portada.png";
import "./EventsPage.scss";

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

const EventsPage = () => {

    const [currentIndex, setCurrentIndex] = useState(0);
    const [videovisible, setVideoVisible] = useState(false);
    const [videourl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    useEffect(() => {
        /*carga datos desde firebase*/
        const loadData = async () => {
            try {
                const data = await getInfo(); // email, descripcion, video
                const info = data[0];

                if (info) {
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
        </div>
    );
};

export default EventsPage;
