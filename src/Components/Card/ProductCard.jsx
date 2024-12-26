import { useContext, useEffect, useState } from "react"
import { CartContext } from "../../Context/Cart.context"
import { Link } from "react-router-dom"
import { WishListContext } from "../../Context/WishList.context"
export default function ProductCard({ productDetails }) {
    //! My varibles 
    const { images, title, price, ratingsAverage, category, _id, priceAfterDiscount } = productDetails
    const { addProductToCart } = useContext(CartContext)
    const { addProductToWishlist, removeItemWishList, favouriteItems } = useContext(WishListContext)
    const [favHeart, setFavHeart] = useState(null)
    //! My useEffect 
    useEffect(() => {
        favouriteItems ? setFavHeart(favouriteItems) : null
    }, [])
    return <>
        <section className="col-span-12 relative group sm:col-span-6 md:col-span-4 lg:col-span-3 xl:col-span-2 overflow-hidden main-shadow rounded-lg flex flex-wrap hover:-translate-y-3 shadow-lg transition-[transform,box-shadow] duration-300 ease-in-out delay-[0s,10ms]">
            <figure className="relative w-full">
                <img className="w-full min-h-[255px] object-cover" src={images[0]} alt={title} />
                <div className="w-full h-full absolute top-0 bottom-0 bg-black bg-opacity-15 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex justify-center items-center gap-2">
                    <div role="button" onClick={function () {
                        favHeart ? favHeart.includes(_id) ? removeItemWishList(_id) : addProductToWishlist({ productId: _id }) : null
                        favHeart ? favHeart.includes(_id) ? setFavHeart(favHeart.filter((element, index) => {
                            return index !== favHeart.indexOf(_id)
                        })) : setFavHeart([favHeart.filter((element) => {
                            return element
                        }), _id]) : null
                    }} className="w-10 cursor-pointer h-10 rounded-full hover:scale-110 hover:rotate-6 transition-transform duration-300 bg-Success flex justify-center items-center">
                        <i className={`fa-solid fa-heart ${favHeart ? favHeart.includes(_id) ? "text-red-600" : "text-white" : ""}`}></i>
                    </div>
                    <div role="button" onClick={() => {
                        addProductToCart({ productId: _id })
                    }} className="w-10 cursor-pointer h-10 rounded-full hover:scale-110 hover:rotate-6 transition-transform duration-300 bg-Success text-white flex justify-center items-center">
                        <i className="fa-solid fa-cart-shopping"></i>
                    </div>
                    <Link to={`/product/${_id}`} className="w-10 h-10 rounded-full hover:scale-110 hover:rotate-6 transition-transform duration-300 bg-Success text-white flex justify-center items-center">
                        <i className="fa-solid fa-eye"></i>
                    </Link>
                </div>
            </figure>
            <div className="mt-2 mb-1 px-3 -space-y-2">
                <h3 className="text-Success font-sans text-base font-medium">{category.name}</h3>
                <h2 className="text-xl font-sans line-clamp-2 h-14">{title}</h2>
            </div>
            <div className="px-3 pb-3 w-full">
                <div className="text-sm font-sans font-semibold flex justify-between">
                    <div className="flex gap-2">
                        <span className={`${priceAfterDiscount > 0 ? "PreDiscount text-opacity-50 pt-1" : null}}`}>{price} EGP</span>
                        {
                            priceAfterDiscount > 0 ? <span>{priceAfterDiscount} EGP</span> : null}
                    </div>
                    <div className="flex items-center gap-1">
                        <i className="fa-solid fa-star text-yellow-500"></i>
                        <span>{ratingsAverage}</span>
                    </div>
                </div>
            </div>
        </section>
    </>
}