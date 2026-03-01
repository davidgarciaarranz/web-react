import { createContext, useContext, type ReactNode } from "react";
import useFirebaseListener from "../hooks/useFirebaseListener";
import type { Info } from "../models/Info";

interface InfoContextType {
    info: Info | undefined;
    isLoading: boolean;
    hasError: boolean;
}

const InfoContext = createContext<InfoContextType | undefined>(undefined);

export const InfoProvider = ({ children }: { children: ReactNode }) => {
    const { data, isLoading, hasError } = useFirebaseListener<Info>("info");

    return (
        <InfoContext.Provider value={{ info: data[0], isLoading, hasError }}>
            {children}
        </InfoContext.Provider>
    );
};

export const useInfo = () => {
    const context = useContext(InfoContext);
    if (!context) throw new Error("useInfo must be used within InfoProvider");
    return context;
};