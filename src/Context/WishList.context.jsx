import { createContext, useContext, useState } from "react";
import { UserContext } from "./User.context";
import axios from "axios";
import toast from "react-hot-toast";
export const WishListContext = createContext(null)
export default function WishlistProvider({ children }) {
    //? My variables
    const { token } = useContext(UserContext)
    const [wishlistProducts, setWishlistProducts] = useState(null)
    const [favouriteItems,setFavouriteItems] = useState([])
    //! wishlist user
    async function getWishlistUser() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "GET",
                headers: {
                    token
                }
            }
            const { data } = await axios.request(options)
            if (data.status === "success" && data.data.length > 0) {
                setWishlistProducts(data.data)
                setFavouriteItems(data.data.map((product)=>{
                    return product._id
                }))
            } else {
                setWishlistProducts(0)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    //! Add product to wishlist user
    async function addProductToWishlist({ productId }) {
        let toastId;
        try {
            toastId = toast.loading("Adding your product to Wishlist...")
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist`,
                method: "POST",
                headers: {
                    token
                },
                data: {
                    productId
                }
            }
            const { data } = await axios.request(options)
            if (data.status === "success") {
                getWishlistUser()
                toast.success("Product added to your wishlist", { duration: 1200 })
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    //! Remove specific item from wishlist 
    async function removeItemWishList(id) {
        let toastId;
        try {
            toastId = toast.loading("Removing your product from Wishlist...")
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/wishlist/${id}`,
                method: "DELETE",
                headers: {
                    token
                }
            }
            const { data } = await axios.request(options)
            if (data.status === "success") {
                getWishlistUser()
                setWishlistProducts(null)
                toast.success("Product has been removed",{duration:800})
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    return <WishListContext.Provider value={{ favouriteItems,addProductToWishlist, getWishlistUser, removeItemWishList, wishlistProducts, setWishlistProducts }}>
        {children}
    </WishListContext.Provider>
}