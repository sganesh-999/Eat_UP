import React from 'react'
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { db } from '../utils/firebase';
import { auth } from '../utils/firebase';
import { useState } from 'react';
import { useEffect } from 'react';
import userRestaurantsList from '../utils/userRestaurantsList';
import { useSelector } from 'react-redux';
import firebase from 'firebase/compat/app';
import { Firestore } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';
import { CDN_URL } from '../utils/constants';
const Orders = () => {
 
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate()
   
    const [items, setItems]=useState("")
    const ordereditemsList=(order)=>{
        const items = order.cartItems.reduce((total, item) => {
            return total.concat(`${item.card.info.name} (${order.cartItemsCount[item.card.info.id]})`);
          }, [])
          console.log('items -inorder',items)
          return items.join(`, `)
    }
    const fetchPost = async () => {
       const collectionRef = collection(db,"cartItems")
       console.log('colletion',collectionRef)
       const q =query(collectionRef, orderBy('createdAt','desc'))
       console.log('query',q)
        const querySnapshot =  await getDocs(q)    
        //const querySnapshot =  await getDocs(collection(db,"cartItems"))       
        console.log('querySnapshot', querySnapshot)
        const newData = querySnapshot.docs.map((doc) => ({...doc.data(), id:doc.id}))
        console.log('new data', newData)
        const filteredData = newData.filter((doc)=>doc.user===auth.currentUser.uid)
        console.log('filter',filteredData)
        setOrders(filteredData);
                                
        
            
       
    }
   
    useEffect(()=>{
        fetchPost();
    },[])

    if(orders===null ) return <Shimmer/>
  return !orders?(
    <div className='text-center font-medium text-xl'>
        <Link to={'/'}>
        <h1>
        Please Order from your faviourite restaurant</h1>
        </Link>
        
    </div>
  ):(
    <div>

      <h1 className='font-bold text-center text-3xl m-5 p-2 '>Orders</h1>
       
      <div className='w-full md:w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4'>
      {
        orders.map((order) =>  (
            <div 
             className=' border border-gray-300 border-spacing-2 shadow-lg' >
                <div className='   text-left flex justify-between m-6 p-6'>
                   <div className='w-3/4 md:11/12'>
                        <h1 className='font-bold  text-lg text-gray-700'>{order.RestaurantInfo.name}</h1>
                        <h1 className='font-medium  text-sm text-gray-600'>{order.RestaurantInfo.locality}</h1>
                        <h1 className='font-medium  text-sm text-gray-600'> ₹ {Math.round(order.total*0.05)+order.total}</h1>
                        <div className='font-sm py-2  p-1 border-t-4  w-full border-dashed border-gray-500'>
                        <div className='text-sm font-medium'>
                        {
                            ordereditemsList(order)
                              
                         }  
                         <h1 className='font-medium  text-sm text-gray-600'>Ordered Successfully At {order.createdAt.toDate().toDateString() } , {order.createdAt.toDate().toLocaleTimeString('en-in') } </h1>
                    </div>
                   
                   </div>
                   </div>
                    
                    <div className='w-1/4 md:w-1/12 m-2'>
                      <div className='absolute'>
                      <img
        
                          alt="res-logo"
                          className='w-23 h-20'
                         src={CDN_URL + order.RestaurantInfo.cloudinaryImageId || "https://th.bing.com/th/id/OIP.VT5wNHNx-FqQlExiV9W7agAAAA?rs=1&pid=ImgDetMain"}
        
                        />
                   
                       </div>

                    </div>
                  </div>
            
                
               
                {/* <p>{item.card.info.des}</p> */}
            </div>
        ))
      }
    </div>
      
    </div>
  )
}

export default Orders
