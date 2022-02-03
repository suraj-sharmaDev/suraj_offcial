import { collection, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore/lite';
import { db } from 'utils/Firebase';

const productsCol = collection(db, 'products');

export const getProducts = async() => {
    try {
        const productSnapShot = await getDocs(productsCol);
        const productList = productSnapShot.docs.map(doc => ({...doc.data(), id: doc.id}));
        return productList;        
    } catch (error) {
        return false;
    }
}

export const addProduct = async(data) => {
    try {
        await addDoc(productsCol, data);
        return true;
    } catch (error) {
        return false;
    }
}