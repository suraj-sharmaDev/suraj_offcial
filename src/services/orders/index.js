import { collection, getDocs } from 'firebase/firestore/lite';
import { db } from 'utils/Firebase';

export const getOrders = async() => {
    try {
        const ordersCol = collection(db, 'orders');
        const orderSnapShot = await getDocs(ordersCol);
        const orderList = orderSnapShot.docs.map(doc => doc.data());
        return orderList;        
    } catch (error) {
        return false;
    }
}