import { useState, useEffect } from "react";
import "./Slider.scss";

interface SliderProps {
    images: string[];
    interval?: number;
}

const Slider = ({ images, interval = 5000 }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const [isTransitioning, setIsTransitioning] = useState(false);

    const changeSlide = (direction: number) => {
        if (isTransitioning) return;

        setIsTransitioning(true);
        setVisible(false);

        // Esperamos a que termine el fade out (300ms en CSS)
        setTimeout(() => {
            setCurrentIndex(prev => (prev + direction + images.length) % images.length);
            // El setVisible(true) se dispara en el onLoad de la imagen
        }, 300);
    };

    useEffect(() => {
        const timer = setInterval(() => {
            changeSlide(1);
        }, interval);

        return () => clearInterval(timer);
    }, [currentIndex, interval, isTransitioning]); // Reiniciar el intervalo tras cada cambio o interacción

    const handleImageLoad = () => {
        setVisible(true);
        setIsTransitioning(false);
    };

    return (
        <div id="photos" className="slider">
            <button
                className="prev"
                onClick={() => changeSlide(-1)}
                aria-label="Imagen anterior"
                disabled={isTransitioning}
            >&lt;
            </button>

            <img
                src={images[currentIndex]}
                className={visible ? "" : "fade"}
                alt={`Muestra de portafolio número ${currentIndex + 1} de Will only Will`}
                onLoad={handleImageLoad}
                onError={handleImageLoad} // Recuperación en caso de error
                height="1080"
                width="1080"
                loading="eager" // Cambiado de lazy para evitar desfases en carga
            />

            <button
                className="next"
                onClick={() => changeSlide(1)}
                aria-label="Siguiente imagen"
                disabled={isTransitioning}
            >
                &gt;
            </button>
        </div>
    );
};

export default Slider;
