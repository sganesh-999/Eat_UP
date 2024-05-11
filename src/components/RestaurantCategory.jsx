import React, { useState } from 'react'
import ItemsList from './ItemsList'


function RestaurantCategory({resInfo,data, showItems, setshowIndex}) {
  
  
//console.log(data)
 const handleClick = ()=>{
  setshowIndex()
 
 
 }
  

  return (
    <div>
     
    <div className=' w-full md:w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4'>
    
      {/* header */}
      <div className='flex justify-between cursor-pointer' onClick={handleClick} >
      <span className='font-bold text-lg'>{data.title}({data.itemCards.length})</span>
      
        {
          showItems?<span>⬆</span>:<span>⬇</span>
        }
      
      </div>
      {/* body */}
      {
        showItems && <ItemsList resInfo={resInfo} items={data.itemCards}/>
      }
    </div>
    
    </div>
  )
}

export default RestaurantCategory
