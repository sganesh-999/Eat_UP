import React, { useEffect, useState } from 'react'
import Shimmer from './Shimmer'
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import useRestaurantMenu from '../utils/useRestaurantMenu';
import RestaurantCategory from './RestaurantCategory';
import { useSelector } from 'react-redux';


function RestaurantMenu() {
    
    const navigate = useNavigate()
    const { resId } = useParams();
    const items_id = useSelector((store)=>(store.cart.items_id))
    const {menInfo,resInfo,categories}=useRestaurantMenu(resId)
    const [showIndex , setshowIndex] =useState(null)
    //const [showItems, setshowItems] = useState(false)
    //const [showItemsState, setshowItemsState]=useState(false)
   

  if(resInfo===null ) return <Shimmer/>
  
  return (
    <div className="text-center" >
    <div className='menu m-8 p -4' >
      <div className=" shadow-sm ">
      <h1 className=" m-3 p-2 font-semibold text-3xl text-stone-700"
      >{resInfo.name}</h1>
      <h5 className=" m-3 p-2 font-semibold  text-stone-700"
      >{resInfo.locality}</h5>
      </div>
      <h2 className=" font-medium m-3 p-2 text-2xl text-stone-700"
      >Menu</h2>
      
      {
        items_id.length>0&&
        
       <div className='fixed  bottom-0  z-10 w-full'>
           <NavLink to={'/cart'}>
           <button 
            className='my-8 ml-auto px-10 md:px-20 py-2  md:py-5 bg-red-500 text-white text-sm font-bold tracking-wide rounded-full focus:outline-none'>
              Go to Cart Now ({items_id.length})!!
            </button>
           </NavLink>
           
      
       </div>

      }   

  
      {
        
        //console.log(categories)
        
        (categories.length===0)?(<h1  key={category?.card?.card?.name} className='font-light text-l'>No items available</h1>)    :  categories.map((category,index)=>
        (<RestaurantCategory key={category?.card?.card?.name}  resInfo={resInfo} data={category?.card?.card}
          
         showItems = {
          (index===showIndex)?true:false
        }
        
         setshowIndex={()=>{
          
          if(showIndex===index){
            return setshowIndex(null)
          }
         return setshowIndex(index)
         }}
        />)

        
      )
         
      }
      
      
      
    </div>
    </div>
  )
}

export default RestaurantMenu
