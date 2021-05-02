import firebase from 'firebase'; //aca iba /api pero lo saque aber si rompe algo
import 'firebase/firestore';
import 'firebase/auth';
import {firebaseConfig} from './config';

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//aca te traigo la autenticacion
export const GoogleProvider = new firebase.auth.GoogleAuthProvider();
GoogleProvider.setCustomParameters({prompt: 'select_account'});
//popup es la ventanta emergente
//export const signInWithGoogle = () => auth.signInWithPopup(GoogleProvider); //agregue google provider como parametro porque no funcaba

//guardar datos de logueo
export const handleUserProfile = async ({userAuth, additionalData}) =>{
    //usuario valido?
    if(!userAuth) return;

    const { uid } = userAuth;
    //el usuario ya esta en la colection?
    const userRef = firestore.doc(`users/${uid}`); //path, devuelve un documento
    const snapshot = await userRef.get(); // devuelve un objeto

    if (!snapshot.exists){
        //datos a guardar en db
        const {displayName, email} = userAuth;
        const timestamp = new Date();

        //si el documento no existe
        try{
            await userRef.set({
                displayName,
                email,
                createdDate: timestamp,
                ...additionalData
            });
        } catch(err){
           // console.log(err);
        }

    }
    return userRef; //info del usuario
};

export const getCurrentUser = () => {
    return new Promise((resolve, reject) =>{
        const unsuscribe = auth.onAuthStateChanged(userAuth =>{
            unsuscribe();
            resolve(userAuth);
        }, reject);
    })
}