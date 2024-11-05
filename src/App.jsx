import { Outlet } from "react-router-dom"
import { Navbar } from "./components/Navbar"
import { WishList } from "./components/Utils/WishList"



export const App = () => {
  return (
    <>
    <Navbar/>
    
    <Outlet/>
    <WishList/>
    </>
  )
}
