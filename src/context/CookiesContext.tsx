import { createContext, useContext, useState, type ReactNode, useEffect } from "react";

interface CookiesContextType {
    accepted: boolean | null;
    acceptCookies: () => void;
    rejectCookies: () => void;
}

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export const CookiesProvider = ({ children }: { children: ReactNode }) => {
    const [accepted, setAccepted] = useState<boolean | null>(null);

    useEffect(() => {
        const stored = localStorage.getItem("cookiesAccepted");
        if (stored === "true") setAccepted(true);
        else if (stored === "false") setAccepted(false);
    }, []);

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setAccepted(true);
    };

    const rejectCookies = () => {
        localStorage.setItem("cookiesAccepted", "false");
        setAccepted(false);
    };

    return (
        <CookiesContext.Provider value={{ accepted, acceptCookies, rejectCookies }}>
            {children}
        </CookiesContext.Provider>
    );
};

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (!context) throw new Error("useCookies must be used within CookiesProvider");
    return context;
};
