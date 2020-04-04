import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from '../../FirebaseConfig'
import { useState, createContext, useContext, useEffect } from "react";
import React from 'react';
import { Route , Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig);

const AuthContext = createContext();

 export const AuthContextProvider = (props) =>{
      const auth = Auth();
      return <AuthContext.Provider value={auth}>{props.children}</AuthContext.Provider>
}

export const  useAuth = () => useContext(AuthContext);


export const  PrivateRoute =({ children, ...rest }) => {
     const auth = useAuth();
     return (
       <Route
         {...rest}
         render={({ location }) =>
           auth.user ? (
             children
           ) : (
             <Redirect
               to={{
                 pathname: "/login",
                 state: { from: location }
               }}
             />
           )
         }
       />
     );
   }
   

const getUser = (user) =>{
     const {displayName , email , photoURL} = user;
     return {name : displayName , email , photo : photoURL};
}

const Auth = () =>{

    const [user , setUser] = useState(null);
     
   //Sign in function
     const signInWithGoogle = () =>{
           const provider = new firebase.auth.GoogleAuthProvider();
           return firebase.auth().signInWithPopup(provider)
           .then( res =>{
               const signInUser = getUser(res.user);
                setUser(signInUser);
               // console.log(res);
                return res.user;
           })
           .catch(error =>{
                console.log(error);
                setUser(null);
                return error.message;
           })
     }

     //Sign Out function
     
     const signOut =  () =>{
      return   firebase.auth().signOut()
        .then(res =>{
               setUser(null);
               return true;
        })
        .catch(error =>{
               console.log(error);
             //  return error.message;
               return  false;
        })
   
     }


     useEffect( () =>{
          firebase.auth().onAuthStateChanged(function(user) {
               if (user) {
                 const currentUser = getUser(user);
                 setUser(currentUser);
                // console.log(user);
               } else {
                 // No user is signed in.
               }
             });
             
     } ,[])

     return {
         user ,  signInWithGoogle , signOut
     }
}

export default Auth;