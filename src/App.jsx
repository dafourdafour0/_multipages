import { BrowserRouter, Route, Routes } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'

// user components
import Component from './page/component'
import Home from './page/Home'
import Animetion from './page/Animetion'
import Calculator from './page/Calculator'
import ForwardToHome from './page/ForwardToHome'
import AppLayout from './Layout/AppLayout'
import Todos from './page/Todos'
import Products from './page/Products'
import Carts from "./page/Carts"


import { fetchProducts } from './component/products'

import './App.css'
import { useState, useEffect } from 'react'
import Login from './page/Login'

function App() {

  const [token, setToken] = useState('')
  const [role, setRole] = useState('')
  const [products, setProducts] = useState([])
  const [carts, setCarts] = useState([])


  useEffect(() => {
    const data = fetchProducts()
    setProducts(data)
  }, [])


  useEffect(() => {
    console.log(products)
  }, [products])

  if (token === '') {
    return <Login setToken={setToken} setRole={setRole} />
  } else {


  return (
    <>
      <BrowserRouter basename="/multipages">
        <Routes>
          <Route element={<AppLayout products={products} carts={carts} setToken={setToken} />}>
            <Route path="/component" element={<Component />} />
            <Route path="/Home" element={<Home />} />
            <Route path="/Animetion" element={<Animetion />} />
            <Route path="/Calculator" element={<Calculator />} />
            <Route path="/Todos" element={<Todos />} />
            <Route
              path="/products"
              element={<Products products={products} carts={carts} setCarts={setCarts} />}
            />
            <Route
              path="/Carts"
              element={<Carts carts={carts} setCarts={setCarts} />}
            />
            <Route path="*" element={<ForwardToHome />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
}
export default App