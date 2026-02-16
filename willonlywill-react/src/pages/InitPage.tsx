/*
function InitPage() {
    return (
        <div style={{ backgroundColor: "white", color: "black", padding: "20px" }}>
            Init Page funcionando
        </div>
    );
}

export default InitPage;
*/
import { useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

const InitPage = () => {

    useEffect(() => {
        const test = async () => {
            const snapshot = await getDocs(collection(db, "events"));
            console.log(snapshot.docs);
        };
        test();
    }, []);
    //para borrar las cooikes al iniciar la pg
    /*useEffect(() => {
        localStorage.removeItem("cookiesAccepted");
    }, []);
    */
    return (
        <div>
            <h1>Init Page</h1>
        </div>
    );
};


export default InitPage;
