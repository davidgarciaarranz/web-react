const GA_ID = "G-L8VNXND4LX";

let initialized = false;

// declarar propiedades en window para TypeScript
declare global {
    interface Window {
        dataLayer: any[];
        gtag: (...args: any[]) => void;
    }
}

export const initGA = () => {
    if (initialized) return;

    const script = document.createElement("script");
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    script.async = true;
    //si hay error
    script.onerror = () => {
        initialized = false;
    }

    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function (...args: any[]) {
        window.dataLayer.push(args);
    };

    window.gtag("js", new Date());
    window.gtag("config", GA_ID);

    initialized = true;
};

export const trackPageView = (path: string) => {
    if (!window.gtag) return;

    window.gtag("config", GA_ID, {
        page_path: path,
    });
};
