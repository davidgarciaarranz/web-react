import { createContext, useContext, useState, type ReactNode } from "react";

interface CookiesContextType {
    accepted: boolean;
    acceptCookies: () => void;
}

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export const CookiesProvider = ({ children }: { children: ReactNode }) => {
    const [accepted, setAccepted] = useState(
        localStorage.getItem("cookiesAccepted") === "true"
    );

    const acceptCookies = () => {
        localStorage.setItem("cookiesAccepted", "true");
        setAccepted(true);
    };

    return (
        <CookiesContext.Provider value={{ accepted, acceptCookies }}>
            {children}
        </CookiesContext.Provider>
    );
};

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (!context) {
        throw new Error("useCookies must be used within CookiesProvider");
    }
    return context;
};
