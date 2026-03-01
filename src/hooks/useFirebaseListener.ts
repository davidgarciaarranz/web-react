import { useEffect, useState } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../services/firebase";

const useFirebaseListener = <T>(collectionName: string) => {
    const [data, setData] = useState<T[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);

    useEffect(() => {
        const unsubscribe = onSnapshot(
            collection(db, collectionName),
            (snapshot) => {
                const result = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                } as T));
                setData(result);
                setIsLoading(false);
            },
            (error) => {
                console.error(`Error escuchando ${collectionName}:`, error);
                setHasError(true);
                setIsLoading(false);
            }
        );

        return () => unsubscribe();
    }, [collectionName]);

    return { data, isLoading, hasError };
};

export default useFirebaseListener;