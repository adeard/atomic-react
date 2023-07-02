import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import Error404 from './pages/error404.jsx'
import ProductsPage from './pages/products'

const router = createBrowserRouter([
  {
    path:"/",
    element:<div>Hello World</div>,
    errorElement:<Error404></Error404>
  },
  {
    path:"/login",
    element:<LoginPage></LoginPage>
  },
  {
    path:"/register",
    element:<RegisterPage></RegisterPage>
  },
  {
    path:"/products",
    element:<ProductsPage></ProductsPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
