import Header from'../Header'
import { render, screen } from '@testing-library/react'
import { Provider } from 'react-redux';
//import App from './App'
import { afterAll, beforeAll, beforeEach, describe, expect } from 'vitest'
import AppStore from '../../utils/AppStore';

import { BrowserRouter } from 'react-router-dom';

beforeAll(()=>{
  console.log('before all')
})
//can be used for some cleanup tasks
beforeEach(()=>{
  console.log('before each test case')
})
afterAll(()=>{
  console.log('after all test completed')
})
afterEach(()=>{
  console.log('after each test case')
})


describe('Header component for page', () => {
    it('should load header component with a login button', () => {
      render(
    <BrowserRouter>
      <Provider store={AppStore}>
                <Header/>
      </Provider>
    </BrowserRouter>
    )
      const loginButton = screen.getByRole("button",{name:'Login'})
      expect(loginButton).toBeInTheDocument()
       // prints out the jsx in the App component unto the command line
    });

    it('should load header component with cart items with 0 ', () => {
        render(
      <BrowserRouter>
        <Provider store={AppStore}>
                  <Header/>
        </Provider>
      </BrowserRouter>
      )
        const cartItems = screen.getByText(/🛒/)
        expect(cartItems).toBeInTheDocument()

        //fire event fireEvent.click(buttonname)
         // prints out the jsx in the App component unto the command line
      });
    
  })