import {
    getFirestore,
    collection,
    addDoc,
    orderBy,
    getDocs,
    getDoc,
    query,
    doc,
    where,
    deleteDoc,
    updateDoc,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js"

import { app } from "./firebase_core.js";
import { CollectionName } from "../model/constant.js";
import { Cards } from "../model/cards.js";
const db = getFirestore(app);

export async function addgame(cards) {
    const collRef = collection(db, CollectionName.cards);
    const docRef = await addDoc(collRef, cards.toFirestore());
    return docRef.id;
}



/*export async function updategamelist() {
    let gamelist = [];
    const q = query(collection(db, CollectionName.cards),
        orderBy('timestamp', 'desc'));
    const snapShot = await getDocs(q);
    snapShot.forEach(doc => {
        const g = new Cards(doc.data());
        g.set_docId(doc.id);
        gamelist.push(g);
    });
    return gamelist;
}*/
export async function updategamelist() {
    try {
        let gamelist = [];
        const q = query(collection(db, CollectionName.cards), orderBy('timestamp', 'desc'));
        const snapShot = await getDocs(q);
        console.log('Snapshot:', snapShot.docs);

        snapShot.forEach(doc => {
            const g = new Cards(doc.data());
            g.set_docId(doc.id);
            gamelist.push(g);
        });

        return gamelist;
    } catch (error) {
        console.error('Error updating game list:', error);
        throw error; // Propagate the error to the caller
    }
}



/*export async function deletedata(){
    const col = collection(db, CollectionName.cards);
    const q1 = await getDocs(col);
    q1.forEach((doc) => {
        deleteDoc(doc.ref);
    });
}*/
export async function deletedata() {
    const col = collection(db, CollectionName.cards);
    const q1 = await getDocs(col);

    q1.forEach(async (doc) => {
        await deleteDoc(doc.ref);
    });
}


