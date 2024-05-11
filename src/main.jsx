import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import About from './components/About.jsx'
import Contact from './components/Contact.jsx'
import Error from './components/Error.jsx'
import Body from './components/Body.jsx'
import RestaurantMenu from './components/RestaurantMenu.jsx'
import Cart from './components/Cart.jsx'
import Login from './components/Login.jsx'
import Orders from './components/Orders.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>} errorElement={<Error/>}>
      
      <Route path='' element={<Body/>}/>
      <Route path='about' element={<About/>}/>
      <Route path='contact' element={<Contact/>}/>
      <Route path='restaurant/:resId' element={<RestaurantMenu/>}/>
      <Route path='cart' element={<Cart/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='orders' element={<Orders/>}/>
      
    </Route>
  )
  
)


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
