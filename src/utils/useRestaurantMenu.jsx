import React, { useEffect, useState } from 'react'

function useRestaurantMenu(resId) {
  //fetch data
  const [menInfo , setmenInfo]= useState(null)
  const [resInfo, setresInfo] = useState(null)
  const [categories, setCategories]=useState([])
  useEffect(()=>{
    fetchResInfo()
  },[])
   
  
  let Res_URL =
  `https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.0759837&lng=72.8776559&restaurantId=${resId}&catalog_qa=undefined&submitAction=ENTER`
    
  const fetchResInfo = async ()=>{
    const data = await fetch(
      Res_URL
    )
    const json = await data.json()
   console.log('res-menu',json)
   setresInfo(json?.data?.cards[2]?.card?.card?.info)
   
   //setmenInfo(json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.itemCards || json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card?.categories[0]?.itemCards) 
   setCategories(
   (json?.data?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
    (c)=>
    c.card?.["card"]?.["@type"]===
    "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    
   )

  )
  )
   
   
  }
return {menInfo,resInfo,categories}
}

export default useRestaurantMenu
