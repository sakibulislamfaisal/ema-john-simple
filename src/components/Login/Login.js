import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth();
    //console.log(auth.signInWithGoogle);
    console.log(auth.user);
   // console.log(auth.signOut);

    const handleSign = () =>{
          auth.signInWithGoogle()
          .then (res =>{
               window.location.pathname ='/review';
          })
    }

    const handlerSignOut = () =>{
        auth.signOut()
        .then (res => {
             window.location.pathname = '/shop';
        })
    }


    return (
        <div>
            <h1>Login here....</h1>
             {    auth.user ? <button onClick={handlerSignOut}>Sign Out</button> :
                 <button onClick={handleSign}>Sign in </button>
             }
            
        </div>
    );
};

export default Login;