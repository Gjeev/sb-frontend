import { LOGIN,LOGOUT,INVALID_CREDENTIALS,USERNAME_DNE,USER_ALREADY_EXISTS } from "../constants";
import * as api from '../api';
import { useDispatch } from "react-redux";
// import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// const firebaseConfig = {
//   apiKey: import.meta.env.VITE_API_KEY,
//   authDomain: import.meta.env.VITE_AUTH_DOMAIN,
//   projectId: import.meta.env.VITE_PROJECT_ID,
//   storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
//   messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
//   appId: import.meta.env.VITE_APP_ID,
//   measurementId: import.meta.env.VITE_MEASUREMENT_ID
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// const auth = getAuth(app);

export const login= (formData,history,onInvalidCredentials,onUsernameDNE)=>async(dispatch)=>{
    try {
        
        const { data } = await api.signIn(formData);

        dispatch({ type: LOGIN, data });
        history.push('/');
        
    } catch (error) {
        const errorMessage=error.response.data.message;
        switch (errorMessage) {
            case INVALID_CREDENTIALS:
                onInvalidCredentials();
                break;
            case USERNAME_DNE:
                onUsernameDNE();
                break;        
            default:
                //no action as of now
        }
    }
    
}

// export const signup=(formData)=>{
//     const {email,password}=formData;
//     createUserWithEmailAndPassword(auth, email, password)
//         .then((userCredential) => {
//             // Signed in 
//             const user = userCredential.user;
//             // ...
//         })
//         .catch((error) => {
//             const errorCode = error.code;
//             const errorMessage = error.message;
//             // ..
//         });


// }

export const signup= (formData,history,onUsernameAlreadyExists)=>async(dispatch)=>{
    try {
        const { data } = await api.signUp(formData);
        dispatch({ type: LOGIN, data });
        history.push('/');
        
    } catch (error) {
        const errorMessage=error.response.data.message;
        switch (errorMessage) {
            case USER_ALREADY_EXISTS:
                onUsernameAlreadyExists();

                
                break;
        
            default:
                break;
        }
        
    }
    
    
}

export const logout=(history,onUserLogout)=>async(dispatch)=>{
    dispatch({type:LOGOUT});
    onUserLogout();
    history.push('/');

}