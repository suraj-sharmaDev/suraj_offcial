import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore/lite';
import {enableIndexedDbPersistence} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: 'AIzaSyAPYhyXxfJ9ePl1pVdPdM-YKK2lyeRan_c',
	authDomain: 'gc-workshop-ddb31.firebaseapp.com',
	databaseURL: 'https://gc-workshop-ddb31-default-rtdb.firebaseio.com',
	projectId: 'gc-workshop-ddb31',
	storageBucket: 'gc-workshop-ddb31.appspot.com',
	messagingSenderId: '687912075329',
	appId: '1:687912075329:web:63fd1a016f79488bcb86c0',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);