import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import ItemsList from './ItemsList'
import { clearCart } from '../utils/CartSlice'
import { useDispatch } from 'react-redux'
import { updateTotal } from '../utils/CartSlice'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../utils/firebase'
import { auth } from '../utils/firebase'
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { useNavigate } from 'react-router-dom'
import { serverTimestamp } from 'firebase/firestore'
import useRestaurantMenu from '../utils/useRestaurantMenu'
import RestaurantCard from './RestaurantCard'
import { Firestore } from 'firebase/firestore'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Bounce } from 'react-toastify';

function Cart() {
    
//const [cartItems,setcartItems]= useState([])
const navigate = useNavigate()
const cartItems = useSelector((store)=>store.cart.items)
const cartItemsCount = useSelector((store)=>store.cart.items_id_count)
const cartItemsId = useSelector((store)=>store.cart.items_id)
const total = useSelector((store)=>store.cart.total)
const dispatch = useDispatch()
// const restaurantId = useSelector((store)=>store.cart.restId)
// const restaurantName = useSelector((store)=>store.cart.restName)
const RestaurantInfo = useSelector((store)=>store.cart.resInfo)


const handleClearCart = ()=>{
  //dispactch an action
  dispatch(clearCart())
  handleTotal()
}
const handleTotal =()=>{
    dispatch(updateTotal())
}

const handleOrder = (e)=>{
  
  e.preventDefault(); 
  console.log('clicked')
  const order = async () => {
        
       
        try {
         console.log('started adding doc')
            const docRef = await addDoc(collection(db, "cartItems"), {
               
              RestaurantInfo:RestaurantInfo,
              cartItems: cartItems,    
              user:auth.currentUser.uid, 
             cartItemsCount: cartItemsCount,
             cartItemsId:cartItemsId,
             total:total,
            createdAt : serverTimestamp()
            });
            console.log("Document written with ID: ", docRef.id);
            toast.success('Ordered Takeout Successfully !', {
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
            setTimeout(()=>navigate('/orders'),2000)
            handleClearCart()
          } catch (e) {
            console.error("Error adding document: ", e);
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
          }
    }
    order()
}

  return (
   <div className='text-center w-full md:w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4'>
      <ToastContainer/>
    <h1 className='text-2xl font-bold  p-5'>Cart</h1>
   <div>
    {cartItems.length !==0 &&
    <button 
    className=' text-center p-3 m-2 bg-gray-100 rounded-lg font-bold text-sm shadow-md'
    onClick={handleClearCart}
    >
        Clear Cart 🚮
    </button>
    }
    {cartItems.length ===0 || total===NaN ?

     (<h1>Please add items in to cart</h1>):
     (
        <>
            <ItemsList resInfo={RestaurantInfo} items={cartItems}/>
            <div className='border border-gray-300 border-spacing-2 m-4 shadow-lg'>
        
                <div className='text-left flex justify-between m-4 p-2'>
                   <div>
                   <h1 className='font-bold text-md'>Items Total</h1>
                   </div>
                   
                   <div>
                    <h1> ₹{total}</h1>
                   
                   </div>
                </div>
                <div className='text-left flex justify-between m-4 p-2'>
                   <div>
                   <h1 className='font-bold text-md'>GST (5%) </h1>
                   </div>
                   
                   <div>
                    <h1> ₹{Math.round(total*0.05)}</h1>
                   
                   </div>
                </div>
                <div className='text-left flex justify-between m-4 p-2'>
                   <div>
                   <h1 className='font-bold text-md'>Bill Total </h1>
                   </div>
                   
                   <div>
                    <h1> ₹{Math.round(total*0.05)+total}</h1>
                   
                   </div>
                </div>
                <div className='text-left flex justify-between m-4 p-2'>
                   
                   
                   <div className='w-full' onClick={handleOrder}>
                   <button 
                     
                      
                      className=' bg-green-700 w-full text-xl font-bold p-4 m-2 rounded-lg'

                    >
                       Order TakeOut Now
                    </button>
                   
                   </div>
                </div>
             </div>
             
        </>
     )
    }
    
     
   </div>
   </div>
  )
}

export default Cart
