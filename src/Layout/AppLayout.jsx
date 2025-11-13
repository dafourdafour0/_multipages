import { Outlet } from "react-router-dom"
import 'bootstrap/dist/css/bootstrap.min.css'

import AppHeader from "../component/AppHeader"
import AppNav from "../component/AppNavbar"
import Footer from "../component/AppFooter"

const AppLayout = ({ products, carts, setToken}) => {
  return (
    <>
      <AppHeader/>
      <AppNav products={products} carts={carts} setToken={setToken}/>
      <Outlet/>
      <Footer/>
    </>
  )
}

export default AppLayout;
