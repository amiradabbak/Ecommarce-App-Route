import { useContext, useEffect, useState } from "react"
import { UserContext } from "../../Context/User.context"
import { jwtDecode } from "jwt-decode"
import axios from "axios"
import toast from "react-hot-toast"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"
export default function AllOrders() {
    //? My variables
    const { token } = useContext(UserContext)
    const { id } = jwtDecode(token)
    const [orders, setOrders] = useState(null)
    //! Get orders user 
    async function getOrderUser() {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/user/${id}`,
                method: "GET",
            }
            const { data } = await axios(options)
            setOrders(data)
            console.log(data)
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
    //! My useEffect 
    useEffect(() => {
        getOrderUser()
    }, [])
    return <>
        <Helmet>
            <title>Your orders</title>
            <meta name="description" content="Freshcart orders page explore your order now!." />
        </Helmet>
        <section className="min-h-screen space-y-2">
            {orders ? orders.map((order) =>
                <div key={order._id} className="border-2 border-gray-200 border-solid p-5 rounded-md">
                    <header className="grid grid-cols-12">
                        <h2 className="col-span-3 text-nowrap font-semibold text-xl text-gray-600">Order ID</h2> <div className="space-x-2 font-cairo text-white font-bold">
                        </div>
                        <div className="col-span-8 place-self-end flex gap-2 font-semibold">
                            <span className={`inline-block text-nowrap px-3 py-1 rounded-full text-white ${order.isPaid ? "bg-green-500" : "bg-red-500"}`}>{order.isPaid ? "تم الدفع" : "غير مدفوع"}</span>
                            <span className={`inline-block text-nowrap px-3 py-1 rounded-full text-white ${order.isDelivered ? "bg-green-500" : "bg-blue-500"}`}>{order.isDelivered ? "تم التوصيل" : "قيد التوصيل"}</span>
                        </div>
                    </header>
                    <span className="text-sm text-black font-bold -translate-y-2 inline-block">#{order.id}</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-5">
                        {order.cartItems.map((item) => <div key={item._id} className="relative product border-2 col-span-2 border-gray-200 border-solid rounded-md ">
                            <figure className="relative">
                                <img className="w-full" src={item.product.imageCover} alt={item.product.title} />
                            </figure>
                            <div className="flex flex-col justify-between p-2 h-20">
                                <p className="text-lg line-clamp-2 leading-5 font-semibold">{item.product.title}</p>
                                <div className="flex gap-10 justify-between font-semibold text-sm items-end px-3">
                                    <div>
                                        <span className="text-base">Count:</span> <span>5</span>
                                    </div>
                                    <div>
                                        <span>{item.price} EGP</span>
                                    </div>
                                </div>
                            </div>
                        </div>)}
                    </div>

                </div>) : <Loading />}
        </section>
    </>
}