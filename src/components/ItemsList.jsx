import React from 'react'
import { CDN_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { addItem, removeItem,clearCart,updateRestaurantId, updateRestaurantName, updateRestaurantInfo } from '../utils/CartSlice'
import { useSelector } from 'react-redux'
import { useState } from 'react'
import { updateTotal } from '../utils/CartSlice'
import { auth } from '../utils/firebase'
import useRestaurantMenu from '../utils/useRestaurantMenu'
function ItemsList({resInfo,items}) {
  //const [cartItems,setcartItems]= useState([])
  const cartItems=useSelector((store)=>store.cart.items)
  const cartItemsCount = useSelector((store)=>store.cart.items_id_count)
  const restaurantInfo = useSelector((store)=>store.cart.resInfo)
  const dispatch = useDispatch()
  const [user, setUser] = useState(auth.currentUser)
 
  
 // console.log('restaurant id',resId)
 const handleClearCart = ()=>{
  //dispactch an action
  dispatch(clearCart())
  handleTotal()
}
  const handleAddItem = (item)=>{
      if(restaurantInfo.id!==resInfo.id){
        
        handleClearCart()
       dispatch(updateRestaurantInfo(resInfo))
       }
       
      dispatch(addItem(item))
      handleTotal()
  }
  const handleRemoveItem =(item)=>{
    dispatch(removeItem(item))
    handleTotal()
    //console.log(item)
  }
  const handleTotal =()=>{
    dispatch(updateTotal())
  
}

  return (
    <div>
      {
        items.map((item) =>  (
            <div 
            data-testid="foodItems"
            key={item.card.info.id} className='border border-gray-300 border-spacing-2 shadow-lg' >
                <div className='text-left flex justify-between m-4 p-2'>
                   <div className='w-3/4'>
                   <span className='font-medium  text-sm md:text-lg p-1'>
                    {item.card.info.name}
                    </span>
                   <p className='text-left font-medium text-sm p-1'>
                    ₹{item?.card?.info.price/100 || item?.card?.info.defaultPrice/100 }
                   </p>
                   <p className='text-left font-light text-sm p-1'>⭐{
                   (item?.card?.info?.ratings?.aggregatedRating?.rating)?(item?.card?.info?.ratings?.aggregatedRating?.rating):('-')
                   }</p>
                   </div>
                    
                    <div className='w-1/4 md:w-1/12 m-2'>
                      <div className='absolute '>
                      {
                        item.card.info.imageId?
                        (<img src={CDN_URL+
                            item.card.info.imageId} 
                            className='w-16 h-12'/>):<></>
                    }
                    
                    {
                      (!(Object.keys(cartItemsCount)).includes(item.card.info.id))?(auth.currentUser &&( <button 
                        className=' w-16  p-2 rounded-lg bg-white shadow-lg m-auto'
                        onClick={
                         ()=>handleAddItem(item)
                        }
                        >
                         Add +
                       </button>)):(auth.currentUser&&
                      ( 

                      <div  className='flex justify-between w-2/12 m-1'>
                        <button className=' text-left font-medium text-sm px-2 py-1 rounded-md bg-white shadow-lg m-auto'
                        onClick={
                          ()=>handleRemoveItem(item)
                         }
                        >-</button>
                        <h5 className='m-1 '>{cartItemsCount[item.card.info.id]}</h5>
                        <button className='text-left font-medium text-sm px-2 py-1 rounded-md bg-white shadow-lg m-auto'
                        onClick={
                          ()=>handleAddItem(item)
                         }
                        >+</button>
                      </div>
                    ))

                    }
                   
                    
                   
                  </div>

                </div>
                </div>
            
                
               
                {/* <p>{item.card.info.des}</p> */}
            </div>
        ))
      }
    </div>
  )
}

export default ItemsList
