import React from 'react'
import { CDN_URL } from '../utils/constants'
import { Link } from 'react-router-dom';
function RestaurantCard({restaurant}) {
   
  const {
    cloudinaryImageId,
    name,
    avgRating,
    cuisines,
    costForTwo,
    deliveryTime,
  } = restaurant;
  // console.log('res card---',restaurant)
  return (
    <div
    data-testid="resCard"
    className=' bg-slate-300 w-48
    m-3 p-2 rounded-lg
    '
    >
      <Link
        key={restaurant.id}
        to={"/restaurant/" + restaurant.id}
        className='home-nav'
      >
      <img
        
        alt="res-logo"
        src={CDN_URL + cloudinaryImageId || "https://th.bing.com/th/id/OIP.VT5wNHNx-FqQlExiV9W7agAAAA?rs=1&pid=ImgDetMain"}
        
      />
      
      <h3  className=" font-bold m-1 p-1 text-lg text-stone-700">{name}</h3>
      <h4 className=" font-medium m-1 p-1 text-sm text-stone-700" >{cuisines.join(", ")}</h4>
      
      <h4>⭐{avgRating}</h4>
      <h4>{costForTwo}</h4>
      {/* <h4>{deliveryTime} minutes</h4> */}

      </Link>
      
    </div>
    
  )
}

//Higher order components

export const withPromotedLabel = (RestaurantCard)=>{
  return ({restaurant})=>{
    return (
      <div>
        {/* <label>Promoted</label> */}
        <RestaurantCard restaurant={restaurant}/>
      </div>
    )
  }
}

export default RestaurantCard
