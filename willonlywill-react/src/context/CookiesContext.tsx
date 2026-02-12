import React, { createContext, useContext, ReactNode } from 'react';

interface CookiesContextType {
    // Define context type here
}

const CookiesContext = createContext<CookiesContextType | undefined>(undefined);

export const CookiesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <CookiesContext.Provider value={{}}>
            {children}
        </CookiesContext.Provider>
    );
};

export const useCookies = () => {
    const context = useContext(CookiesContext);
    if (context === undefined) {
        throw new Error('useCookies must be used within a CookiesProvider');
    }
    return context;
};
