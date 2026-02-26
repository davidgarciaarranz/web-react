import ReactGA from "react-ga4";

const GA_ID = "G-L8VNXND4LX";

let initialized = false;

export const initGA = () => {
    if (initialized) return;

    ReactGA.initialize(GA_ID);
    initialized = true;
};

export const trackPageView = (path: string) => {
    if (!initialized) return;

    ReactGA.send({
        hitType: "pageview",
        page: path,
        title: document.title
    });
};