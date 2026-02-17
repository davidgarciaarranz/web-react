import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAimQ54_WjAH7HXpI-p45RU4r3ca1SBq-4",
    authDomain: "willonlywilllandingpage-aa06a.firebaseapp.com",
    projectId: "willonlywilllandingpage-aa06a",
    storageBucket: "willonlywilllandingpage-aa06a.firebasestorage.app",
    messagingSenderId: "27994165360",
    appId: "1:27994165360:web:d68852870d4f562ed524b5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
