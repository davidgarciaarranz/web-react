// Firebase service placeholder
export const firebaseService = {
    // Add firebase methods here
};
import { db } from "./firebase";
import {
    collection,
    getDocs,
    onSnapshot,
    doc,
    getDoc
} from "firebase/firestore";

export const getEvents = async () => {
    const querySnapshot = await getDocs(collection(db, "events"));
    return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
    }));
};

export const listenEvents = (callback: (data: any[]) => void) => {
    return onSnapshot(collection(db, "events"), (snapshot) => {
        const data = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        callback(data);
    });
};

export const getEventById = async (id: string) => {
    const docRef = doc(db, "events", id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
    }

    return null;
};
