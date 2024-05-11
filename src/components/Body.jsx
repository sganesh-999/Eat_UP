import React, { useEffect, useState } from 'react'
import RestaurantCard,{ withPromotedLabel} from './RestaurantCard'
import { Restaurants } from '../utils/Restaurants'
import Shimmer from './Shimmer'
import { Link,NavLink } from 'react-router-dom'
import useOnlineStatus from '../utils/useOnlineStatus'
import userRestaurantsList from '../utils/userRestaurantsList'




function Body() {
  
  const [searchText,setsearchText] = useState("")
  const [topResMore, settopResMore]=useState(true)
  
  const {listRest,setlistRest,filteredRestaurant,setfilteredRestaurant} = userRestaurantsList();
  
  const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)
  
 

  const handleShowMoreTop = ()=>{
  if(topResMore){
    setfilteredRestaurant(listRest)
  }
  else{
    setfilteredRestaurant(listRest.slice(0,6))
  }
  settopResMore(!topResMore)
  }
  
  return listRest.length===0?(<Shimmer/>):(
    <div className='body'>
      <div className='filter flex '>
        <div className="m-4 p-4">
          <input type='text' value={searchText}  placeholder=' Search here... '
          data-testid="searchInput"
          onChange={(e)=>setsearchText(e.target.value)}
          className=" border border-solid border-black"/>
          <button 
          className="px-5 bg-green-200 m-4 border rounded-lg border-solid border-black"
          onClick={()=>{
            console.log(searchText)
            //fetchData();
            
            
            let filtredRestaurant = listRest.filter(
              (res)=>(res.info.name).toLowerCase().includes(searchText.toLowerCase())
              )
            setfilteredRestaurant(filtredRestaurant)

          }}>Search</button>
        </div>
        <div className='m-4 p-4 flex items-center'>
        <button className="px-5 bg-gray-300 m-4 border rounded-lg border-solid border-gray-800"
        onClick={()=>{
          setfilteredRestaurant(listRest.filter((res)=>res.info.avgRating>4))
          
          }}
        >Top Rated Restaurant</button>
        </div>
      
        <div className='m-4 p-4 flex items-center'>
        <button className="px-5 bg-gray-300 m-4 border rounded-lg border-solid border-gray-800"
        onClick={()=>{
          setfilteredRestaurant(listRest)
          settopResMore(false)
          }}
        >All Restaurants</button>
        </div>
      </div>
      
      <div className='m-1 p-4 flex items-center'>
          <h1 className='m-2 p-4 text-left text-xl font-semibold'
              >Top Rated Restaurants...</h1>
        
        <button className="px-5 bg-gray-300 m-4 border rounded-lg border-solid border-gray-800"
        onClick={
          ()=>(handleShowMoreTop())
        }
        >
          Show {
            topResMore?" More":" Less"
          }
        </button>
      </div>
      

      <div 
      
      className="
     
      flex flex-wrap
      
      "
      >
        
        {/* <RestaurantCard restaurant={Restaurants[0]}/> */}
     {  
     
     filteredRestaurant.map(
      (rest) => (
        <RestaurantCard key={rest.info.id} restaurant={rest.info}/>
      )
      )
      }
        
      </div>

    </div>
  )
}

export default Body
