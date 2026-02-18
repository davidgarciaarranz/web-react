import React, { useEffect, useState } from 'react';
import { getInfo } from '../../services/firebaseService';
import type { Info } from '../../models/Info';
import './Footer.scss';

// Assets (Assuming they are copied to src/assets)
import logo from '../../assets/images/LOGO-NEGRO-SIN-FONDO.png';
import facebookIcon from '../../assets/icons/facebook.svg';
import instagramIcon from '../../assets/icons/instagram.svg';
import tiktokIcon from '../../assets/icons/tik-tok.svg';
import youtubeIcon from '../../assets/icons/youtube.svg';

const Footer: React.FC = () => {
    const [info, setInfo] = useState<Info | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getInfo();
                if (data && data.length > 0) {
                    setInfo(data[0]);
                }
            } catch (error) {
                console.error("Error fetching info:", error);
            }
        };
        fetchData();
    }, []);

    const goTo = (url: string | undefined) => {
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
        }
    };

    return (
        <footer className="footer">
            {/* <img className="imgAutor" alt="Logo" src={logo} /> */}
            <div className="copyright">© {new Date().getFullYear()}</div>
            <div className="social-icons">
                {info?.facebookurl && (
                    <img
                        className="social-icon"
                        src={facebookIcon}
                        onClick={() => goTo(info?.facebookurl)}
                        title="Visita Facebook"
                        alt="Facebook"
                    />
                )}
                {info?.instagramurl && (
                    <img
                        className="social-icon"
                        src={instagramIcon}
                        onClick={() => goTo(info?.instagramurl)}
                        title="Visita Instagram"
                        alt="Instagram"
                    />
                )}
                {info?.tiktokurl && (
                    <img
                        className="social-icon"
                        src={tiktokIcon}
                        onClick={() => goTo(info?.tiktokurl)}
                        title="Visita TikTok"
                        alt="TikTok"
                    />
                )}
                {info?.youtubeurl && (
                    <img
                        className="social-icon"
                        src={youtubeIcon}
                        onClick={() => goTo(info?.youtubeurl)}
                        title="Visita YouTube"
                        alt="YouTube"
                    />
                )}
            </div>
        </footer>
    );
};

export default Footer;