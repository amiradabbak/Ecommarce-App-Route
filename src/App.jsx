import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Components/Layout/Layout'
import Signup from './Pages/Signup/Signup'
import Login from './Pages/Login/Login'
import NotFound from './Pages/NotFound/NotFound'
import { Toaster } from 'react-hot-toast'
import Home from './Pages/Home/Home'
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute'
import GuestRoute from './Components/GuestRoute/GuestRoute'
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'
import ResetCode from './Pages/ResetCode/ResetCode'
import ResetPassword from './Pages/ResetPassword/ResetPassword'
import UserProvider from './Context/User.context'
import CartProvider from './Context/Cart.context'
import Cart from './Pages/Cart/Cart'
import Checkout from './Pages/Cart/Checkout/Checkout'
import AllOrder from './Pages/AllOrders/AllOrders'
import ProductDetails from './Pages/ProductDetails/ProductDetails'
import Wishlist from './Pages/Wishlist/Wishlist'
import WishlistProvider from './Context/WishList.context'
import Offline from './Components/Offline/Offline'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import Brands from './Pages/Brands/Brands'
import Categories from './Pages/Categories/Categories'
import Products from './Pages/Products/Products'
import ProductsByIdCategory from './Pages/ProductsByIdCategory/ProductsByIdCategory'
export default function App() {
  // Router app ====>  
  const router = createBrowserRouter([{
    path: "/",
    element: <ProtectedRoute>
      <Layout />
    </ProtectedRoute>,
    children: [
      {
        index: true,
        path: "Freshcart",
        element: <Home />
      },
      {
        path: "Cart",
        element: <Cart />
      },
      {
        path: "Checkout",
        element: <Checkout />
      },
      {
        path: "allorders",
        element: <AllOrder />
      },
      {
        path: "product/:id",
        element: <ProductDetails />
      },
      {
        path: "brands",
        element: <Brands />
      },
      {
        path: "Wishlist",
        element: <Wishlist />
      },
      {
        path: "Products",
        element: <Products />
      },
      {
        path: "Categories",
        element: <Categories />
      },
      {
        path: "Category/:id",
        element: <ProductsByIdCategory />
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "",
        element: <NotFound />
      },
    ]
  },
  {
    path: "/auth",
    element: <GuestRoute>
      <Layout />
    </GuestRoute>,
    children: [
      {
        path: "Login",
        element: <Login />
      },
      {
        path: "Signup",
        element: <Signup />
      },
      {
        path: "ForgotPassword",
        element: <ForgotPassword />
      },
      {
        path: "VerverifyCode",
        element: <ResetCode />
      },
      {
        path: "ResetPassword",
        element: <ResetPassword />
      },
      {
        path: "*",
        element: <NotFound />
      },
      {
        path: "",
        element: <NotFound />
      }
    ]
  }
  ])
  // userClient
  let userClient = new QueryClient()
  return <>
    <QueryClientProvider client={userClient}>
      <Offline>
        <UserProvider>
          <CartProvider>
            <WishlistProvider>
              <RouterProvider router={router} />
            </WishlistProvider>
          </CartProvider>
        </UserProvider>
        <Toaster position='top-right' toastOptions={{
          style: {
            fontWeight: "600", fontSize: "13px", fontFamily: "sans-serif"
          }
        }} />
      </Offline>
  
    </QueryClientProvider>
  </>
}