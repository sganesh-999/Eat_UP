import React, { useRef, useState } from 'react'
import Header from './Header'
import { checkValidateData } from '../utils/validate'
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword ,updateProfile} from "firebase/auth";

import {auth} from '../utils/firebase'
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/UserSlice';
import Body from './Body';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';


const Login = () => {
    const [isSignInForm, setisSignInForm] =useState(true)
    const [errorMessage, seterrorMessage] = useState(null)
    const email = useRef(null)
    const password = useRef(null)
    const name = useRef(null)
    const navigate = useNavigate()
    const dispatch = useDispatch()
    
    const toggleSignInForm =()=>{
        setisSignInForm(!isSignInForm)
    }
    const handleButtonClick =()=>{
        
        //validate the form data
        const message = (isSignInForm)?checkValidateData(null,email.current.value,password.current.value, isSignInForm):checkValidateData(name.current.value,email.current.value,password.current.value, isSignInForm)
        seterrorMessage(message)
        if(message)return

        //sign in or signup
        if(!isSignInForm){
            //signup
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                const user =    userCredential.user;
                updateProfile(user, {
                    displayName: name.current.value
                  }).then(() => {
                    const {uid, email,displayName}=auth.currentUser
                    dispatch(
                        addUser({
                            uid:uid,
                            email:email,
                            displayName:displayName ,
                        })
                    )
                    toast.success('Signed Up Successfully !', {
                        position: "bottom-center",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                     setTimeout(()=>navigate('/'),3000)
                  
                    // ...
                  }).catch((error) => {
                    // An error occurred
                    toast.error('Error Occurred!', {
                        position: "bottom-center",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        theme: "light",
                        transition: Bounce,
                        });
                    // ...
                  });

               
                })
            .catch((error) => {
            const errorCode = error.code;
            seterrorMessage(errorCode+"-"+error.message)
            toast.error('Error Occurred!', {
                position: "bottom-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                transition: Bounce,
                });
            });
        }else{
            //signin
                signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                    .then((userCredential) => {
                        const user = userCredential.user;
                        toast.success('Signed In Successfully !', {
                            position: "bottom-center",
                            autoClose: 2000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            });
                         setTimeout(()=>navigate('/'),3000)
                       
                    })
                    .catch((error) => {
                        toast.error('Error Occurred!', {
                            position: "bottom-center",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                            });
                        const errorCode = error.code;
                        seterrorMessage(errorCode+"-"+error.message)
                    });

        }


    }

    return (
    <div  className=''>
       <ToastContainer/>
        <div className='absolute'>
       
        </div>
        <div
        className='
        my-50 m-20 mx-auto right-8 left-0
        absolute w-full md:w-3/12 p-12 text-center opacity-9
        border border-black rounded-lg
        '
        >
        <form
        onSubmit={(e)=>e.preventDefault()}
       className='text-black'
        >
            <h1
            className='font-bold text-3xl py-4'
            
            >
                {isSignInForm?"Sign In":"Sign Up"}
            </h1>
            {
                (!isSignInForm)&&(<input type="text" name="name"  placeholder='Full Name'
                ref={name}
                className='p-4 m-2 w-full  text-black   bg-white border border-black rounded-md'
                />)
            }
            <input type="email" name="email"  placeholder='Email Address'
            ref={email}
            className='p-4 m-2 w-full bg-white text-black border border-black rounded-md'
            />
            <input type="password" name="password"  placeholder='Password'
            ref={password}
            className='p-4 m-2 w-full border border-black rounded-md bg-white  text-black'
            />
            <p className='text-red-500 font-bold text-sm'>
                {errorMessage}
            </p>
            <button 

            onClick={handleButtonClick}
            className='bg-green-700 w-full font-bold p-4 m-2 rounded-lg'
            
            >
               {isSignInForm?"Sign In":"Sign Up"}
            </button>
            <p
             className='p-2 text-sm cursor-pointer'
             onClick={toggleSignInForm}

            >{ isSignInForm?"New to Eatup ? Sign Up Now !":"Already Signed Up ? Sign In now !"
            }</p>
        </form>
        </div>
    </div>
  )
}

export default Login
