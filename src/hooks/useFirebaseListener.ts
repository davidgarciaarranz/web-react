import { useEffect } from 'react';

const useFirebaseListener = () => {
    useEffect(() => {
        // Add firebase listener logic here
        return () => {
            // Cleanup listener
        };
    }, []);
};

export default useFirebaseListener;
