import React, { useContext } from 'react'
import { CDN_URL,LOGO_URL } from '../utils/constants'
import { Link,NavLink, useNavigate } from 'react-router-dom'
import UserContext from '../utils/UserContext'
import { useSelector } from 'react-redux'
import AppStore from '../utils/AppStore'
import { auth } from '../utils/firebase'
import { signOut } from 'firebase/auth'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useDispatch } from 'react-redux'
import { addUser } from '../utils/UserSlice'
import { removeUser } from '../utils/UserSlice'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function Header() {
 const dispatch = useDispatch()
  const {loggedInUser}= useContext(UserContext)
  const navigate = useNavigate()
  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName} = user.uid;
        dispatch(addUser({uid:uid,email:email,displayName:displayName}))
        setTimeout(()=>navigate('/'),4000)
        // ...
      } else {
        // User is signed out
        dispatch(removeUser())
        //navigate('/login')
        
        // ...
      }
    });

    return ()=>unsubscribe()
  },[])


  const handleSignOut=()=>{
    signOut(auth).then(() => {
      toast.success('Signed Out Successfully !', {
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
     setTimeout(()=>navigate("/login"),2000)
      
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
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
  }
  

  const cartItems = useSelector((store)=>store.cart.items)

  return   (
    <div className="flex justify-between ring-white shadow-lg m-2 px-4  h-20 md:h-40 sm:h-30">
      
        <div className="to-black"
        >
               <NavLink className='home-nav'
                  to={"/"}
                >
                 <img className='hidden md:inline-block w-40' src={LOGO_URL}
                 />
              </NavLink>
            
        </div>
        <div className="flex items-center ">
            <ul className="flex text-md md:text-xl">
              
                <li className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/"}
                >
                  Home
                </NavLink>
                </li>
                <li className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/about"}
                >
                  About Us
                </NavLink>
                 </li>
                <li className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/contact"}
                >
                 Contact
                </NavLink>
                </li>
                {
                  auth.currentUser&&
                  <>
                  <li className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/cart"}
                >
                 🛒{cartItems.length}
                </NavLink>
                </li>
                <li className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/orders"}
                >
                 Orders
                </NavLink>
                </li>
                </>
                }
                {

                  auth.currentUser ?

                  <li onClick={handleSignOut} className='px-4 font-bold cursor-pointer rounded'>Sign Out</li>
                  :
                <button className='px-4 font-bold '>
                <NavLink className='home-nav'
                  to={"/login"}
                >
                    Login
                    <ToastContainer/>
                </NavLink>
                </button>
                
                }
                {/* <li>
                  {loggedInUser}
                </li> */}
            </ul>
        </div>
    
    </div>
  )
  
}

export default Header
