import { useState, useEffect, useRef } from "react";
import "./Slider.scss";

interface SliderProps {
    images: string[];
    interval?: number;
}

const Slider = ({ images, interval = 5000 }: SliderProps) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visible, setVisible] = useState(true);
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const changeSlide = (direction: number) => {
        setVisible(false);
        setTimeout(() => {
            setCurrentIndex(prev => (prev + direction + images.length) % images.length);
            setVisible(true);
        }, 300);
    };

    useEffect(() => {
        intervalRef.current = setInterval(() => changeSlide(1), interval);
        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, []);

    return (
        <div id="photos" className="slider">
            <button
                className="prev"
                onClick={() => changeSlide(-1)}
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
                onClick={() => changeSlide(1)}
                aria-label="Siguiente imagen"
            >
                &gt;
            </button>
        </div>
    );
};

export default Slider;
