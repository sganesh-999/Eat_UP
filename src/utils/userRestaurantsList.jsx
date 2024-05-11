import React, { useEffect, useState } from 'react'

function userRestaurantsList() {
    const [filteredRestaurant , setfilteredRestaurant] = useState([])
    const [listRest, setlistRest] = useState([])
    //console.log(typeof(filteredRestaurant))
    useEffect(()=>{
        fetchData();
      },[])

      const fetchData = async ()=>{
        const data = await fetch(
         // "https://www.swiggy.com/dapi/restaurants/list/v5?lat=16.544893&lng=81.521241&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
           "https://www.swiggy.com/dapi/restaurants/list/v5?lat=17.406498&lng=78.47724389999999&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.0759837&lng=72.8776559&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    //"https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9715987&lng=77.5945627&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
        );
        //

        const json = await data.json()
        
        const filtres = await json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants
        setlistRest(json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        console.log('list res', listRest)
        //console.log('filtered res',json?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        setfilteredRestaurant(filtres.slice(0,6))
        
        //setfilteredRestaurant(filteredRestaurant.slice(0,6))
        // setlistRest(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
        // setfilteredRestaurant(json?.data?.cards[4]?.card?.card?.gridElements?.infoWithStyle?.restaurants)
       
      }
    
      
    return {listRest,filteredRestaurant,setlistRest,setfilteredRestaurant}
}

export default userRestaurantsList
