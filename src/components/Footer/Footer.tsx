import React, { useEffect, useState } from 'react';
import { getInfo } from '../../services/firebaseService';
import type { Info } from '../../models/Info';
import './Footer.scss';

// Assets (Assuming they are copied to src/assets)
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
                    <button className="social-btn" onClick={() => goTo(info.facebookurl!)} title="Visita Facebook">
                        <img src={facebookIcon} alt="Facebook" className="social-icon" />
                    </button>
                )}
                {info?.instagramurl && (
                    <button className="social-btn" onClick={() => goTo(info.instagramurl!)} title="Visita Instagram">
                        <img src={instagramIcon} alt="Instagram" className="social-icon" />
                    </button>
                )}
                {info?.tiktokurl && (
                    <button className="social-btn" onClick={() => goTo(info.tiktokurl!)} title="Visita TikTok">
                        <img src={tiktokIcon} alt="TikTok" className="social-icon" />
                    </button>
                )}
                {info?.youtubeurl && (
                    <button className="social-btn" onClick={() => goTo(info.youtubeurl!)} title="Visita YouTube">
                        <img src={youtubeIcon} alt="YouTube" className="social-icon" />
                    </button>
                )}
            </div>
        </footer>
    );
};

export default Footer;