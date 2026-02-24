import { useState, useEffect } from "react";
import { getInfo } from "../../services/firebaseService";
import portadaImg from "../../assets/images/portada.webp";
import "./InitPage.scss";

import Description from "../../components/DescriptionGeneral/DescriptionGeneral";
import Slider from "../../components/Slider/Slider";
import VideoPlayer from "../../components/VideoPlayer/VideoPlayer";
import ContactButton from "../../components/ContactButton/ContactButton";

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

    const [mail, setMail] = useState("");
    const [description, setDescription] = useState("");
    const [videovisible, setVideoVisible] = useState(false);
    const [videourl, setVideoUrl] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
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

        /*SEO*/

        /*título de la pestaña*/
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

    /*para evitar renderizar contenido incompleto*/
    if (isLoading) return <div className="loading-state">Cargando...</div>;
    if (hasError) return <div className="loading-state">Error al cargar el contenido. Inténtalo de nuevo más tarde.</div>;

    /*contenedor principal de la pg*/
    return (
        <main id="init" className="container">
            {/*Imagen Autor */}
            <section>
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
                <Description content={description} />
            </section>
            {/* Galería de Imágenes */}
            <section id="gallery">
                <VideoPlayer
                    url={videourl}
                    visible={videovisible} />

                {/* Slider de Imágenes con Controles id= phostos para futuros usos*/}
                <Slider images={images} />
            </section>
            {/* Sección de Contacto con Botón Glowing */}
            <ContactButton mail={mail} />
        </main>
    );
};

export default InitPage;
