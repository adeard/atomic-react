import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import LoginPage from './pages/login.jsx'
import RegisterPage from './pages/register.jsx'
import Error404 from './pages/error404.jsx'
import ProductsPage from './pages/products'
import ProfilePage from './pages/profile'
import DetailProductPage from './pages/detailProduct'
import { Provider } from 'react-redux'
import store from './redux/store'
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
  },
  {
    path:"/profile",
    element:<ProfilePage></ProfilePage>
  },
  {
    path:"/product/:id",
    element:<DetailProductPage></DetailProductPage>
  }
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}/>
    </Provider>    
  </React.StrictMode>,
)
