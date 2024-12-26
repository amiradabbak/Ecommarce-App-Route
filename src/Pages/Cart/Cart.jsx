import { useContext, useEffect } from "react"
import { CartContext } from "../../Context/Cart.context"
import Loading from "../../Components/Loading/Loading"
import CartItem from "../../Components/CartItem/CartItem"
import { Link } from "react-router-dom"
import { Helmet } from "react-helmet"
export default function Cart() {
    //? My variables
    let { getUserCart, cartInfo, clearUserCart } = useContext(CartContext)
    //! My useEffect 
    useEffect(() => { getUserCart() }, [])
    return <>
        <Helmet>
            <title>Cart</title>
            <meta name="description" content="Freshcart cart page your pdoructs are ready here" />
        </Helmet>
        {cartInfo === null ? <Loading /> : <section>
            <header className="mb-4 px-4 text-slate-600 flex gap-8">
                <i className="fa-brands fa-opencart text-3xl"></i>
                <h2 className="font-semibold text-xl relative before:bg-slate-600 before:absolute before:w-0.5 before:h-3/4 before:-left-1 before:top-1/2 ps-4 before:-translate-y-1/2">Your shopping cart</h2>
            </header>
            {cartInfo.numOfCartItems === 0 ? <section className="rounded-md bg-slate-200 p-5 space-y-3 flex flex-col items-center justify-center">
                <header>
                    <h2 className="font-semibold text-lg text-center">Oops! your cart is empty.</h2>
                    <h3 className="font-semibold text-sm text-center">Start shopping now by clicking the button below and find something you love!</h3>
                </header>
                <Link className="btn-success block w-fit font-semibold" to={"/Freashcart"}>Back to Home</Link>
            </section>
                : <section>
                    <div className="space-y-3">
                        {cartInfo.data.products.map((product) => <CartItem productInfo={product} key={product._id} />)}
                    </div>
                    <div className="mt-4 flex flex-col md:flex-row items-center justify-between">
                        <p className="space-x-2"><i className="fa-solid fa-sack-dollar text-Success text-xl"></i><span className="font-semibold text-base">Your total price</span><span className="text-Success font-semibold text-sm">{cartInfo.data.totalCartPrice}</span></p>
                        <div className="flex flex-col sm:flex-row gap-2 items-center justify-center">
                            <button type="button" onClick={clearUserCart} className="btn-success px-3 bg-red-500 hover:bg-red-600 text-white text-nowrap"><span><i className="fa-solid fa-trash"></i></span> Delete cart</button>
                            <Link to={"/Checkout"} className="btn-success text-nowrap">Next step</Link>
                        </div>
                    </div>
                </section>}
        </section>}
    </>
}