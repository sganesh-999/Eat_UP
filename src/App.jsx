import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Body from './components/Body'
import About from './components/About'
import useOnlineStatus from './utils/useOnlineStatus'
import { Provider } from 'react-redux'
import AppStore from './utils/AppStore'
function App() {
  const [count, setCount] = useState(0)
  const onlineStatus= useOnlineStatus()

  if(onlineStatus===false){
    return <h1>Looks like you're offline,please check your internet connection</h1>
  }

  return (
    <Provider store={AppStore}>
    <>
     <Header/>
     <Outlet/>
      
    </>
    </Provider>
  )
}

export default App
