import { fireEvent, render } from "@testing-library/react"
import { screen } from "@testing-library/react"
import Body from '../Body'
import MOCK_DATA from '../mocks/ResListMock.json'
//import {jest} from '@jest/globals'
import { describe, expect, expectTypeOf, vi} from 'vitest'
import { BrowserRouter } from "react-router-dom"
import { Provider } from 'react-redux';
//import App from './App'
import AppStore from '../../utils/AppStore';
import userRestaurantsList from "../../utils/userRestaurantsList"
import { renderHook } from "@testing-library/react"
import { act } from "react-dom/test-utils"


global.fetch = vi.fn(async ()=>{
    return Promise.resolve({
        
        json:()=>{
            return Promise.resolve(MOCK_DATA)
        }
    })
})

describe('search in restaurant list data',()=>{
    it('should search the restaurant data for chand input',async ()=>{
        const {listRest,setlistRest,filteredRestaurant,setfilteredRestaurant}= renderHook(() => userRestaurantsList());
     
    await act((async()=>{
        render(
        <BrowserRouter>
         <Body/>
        </BrowserRouter>
       )
    }))
 
    const searchButton = screen.getByRole("button",{name:"Search"})
    
    const searchInput  = screen.getByTestId("searchInput")
    fireEvent.change(searchInput,{target:{value:"chand"}})
    fireEvent.click(searchButton)
    
    //screen should load 3 cards
    const rescards = screen.getAllByTestId("resCard")
    expect(rescards.length).toEqual(3)


    }

  )

  
  }
  )