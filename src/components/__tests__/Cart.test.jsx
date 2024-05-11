import { describe, it, expect } from 'vitest'
import RestaurantMenu from '../RestaurantMenu'
import useRestaurantMenu from '../../utils/useRestaurantMenu'
import { renderHook,render, fireEvent } from '@testing-library/react'
import MOCK_DATA from '../mocks/ResMenuMock.json'
import { BrowserRouter } from 'react-router-dom'
import { act } from 'react-dom/test-utils'
import { screen } from '@testing-library/react'
import { Provider } from 'react-redux'
import Appstore from '../../utils/AppStore'
import Header from '../Header'
global.fetch = vi.fn(async ()=>{
    return Promise.resolve({
        
        json:()=>{
            return Promise.resolve(MOCK_DATA)
        }
    })
})

describe('for testing flow', () => {
  it('should load restaurant ', async() => {
    const {menInfo,resInfo,categories}= renderHook(() => useRestaurantMenu("181047"));
    await act(async()=>{
        render(
          <Provider store={Appstore}>
          <BrowserRouter>
          <Header/>
        <RestaurantMenu/>
        </BrowserRouter>
        </Provider>
        
        )
    })
    const accordionHeader = screen.getByText("Biryani(19)")
    fireEvent.click(accordionHeader)
    const foodItems=screen.getAllByTestId("foodItems")
    expect(foodItems.length).toBe(19)

    const addBtn = screen.getAllByRole("button",{
      name:"Add +"
    })
    expect(addBtn.length).toBe(19)
    fireEvent.click(addBtn[0])
    fireEvent.click(addBtn[3])
    const cartItemsUpdate = screen.getByText("🛒2")
    expect(cartItemsUpdate).toBeInTheDocument()
  })
})