import { useFormik } from "formik"
import { useContext, useState } from "react"
import * as Yup from "yup"
import { UserContext } from "../../../Context/User.context"
import { CartContext } from "../../../Context/Cart.context"
import axios from "axios"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { Helmet } from "react-helmet"
export default function Checkout() {
    //? My variables
    const { token } = useContext(UserContext)
    const { cartInfo } = useContext(CartContext)
    const [paymentMethod, setPaymentMethod] = useState(null)
    const navigate = useNavigate()
    // Regex
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    // Validation
    const validationSchema = Yup.object({
        details: Yup.string().required().min(15).max(400),
        phone: Yup.string().required().matches(phoneRegex, "Invaild number"),
        city: Yup.string().required().min(2).max(20)
    })
    // Cash order ==>
    async function creatCashOrder(Values) {
        let toastId;
        try {
            toastId = toast.loading("Your response is being sent...")
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/${cartInfo.cartId}`,
                method: "POST",
                headers: {
                    token
                },
                data: Values
            }
            const { data } = await axios.request(options)
            console.log(data);
            if (data.status === "success") {
                toast.success("Sent successfully")
                setTimeout(() => {
                    navigate("/allorders")
                }, 2000);
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    // Online payment order
    async function onlinePayment(Values) {
        let toastId;
        try {
            toastId = toast.loading("Waiting...")
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartInfo.cartId}?url=${location.origin}`,
                method: "POST",
                headers: {
                    token
                },
                data: Values
            }
            const { data } = await axios.request(options)
            console.log(data)
            if (data.status === "success") {
                toast.loading("Redirecting you to stripe...")
                setTimeout(() => {
                    location.href = data.session.url
                }, 2000)
            }
        } catch (error) {
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    const formik = useFormik({
        initialValues: {
            details: "",
            phone: "",
            city: ""
        },
        onSubmit: paymentMethod === "Cash order" ? creatCashOrder : onlinePayment
        ,
        validationSchema
    })
    return <section>
        <Helmet>
            <title>Checkout</title>
            <meta name="description" content="Freshcart checkout page pay your products cash or credit" />
        </Helmet>
        <header>
            <h2 className="text-xl font-semibold text-slate-800">Shipping Address</h2>
        </header>
        <fieldset>
            <form action="" onSubmit={formik.handleSubmit}>
                <div className="space-y-2 mt-3">
                    <div>
                        <input className="form-control w-full" type="text" placeholder="City"
                            name="city" value={formik.values.city} onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.city && formik.touched.city ? <div className="text-red-600 text-sm sm:text-base font-semibold flex">* {formik.errors.city}</div> : ""}
                    </div>
                    <div>
                        <input className="form-control w-full" type="tel" inputMode="numeric" placeholder="Phone"
                            name="phone" value={formik.values.phone} onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        {formik.errors.phone && formik.touched.phone ? <div className="text-red-600 text-sm sm:text-base font-semibold flex">* {formik.errors.phone}</div> : ""}

                    </div>
                    <div>
                        <textarea className="form-control w-full resize-none" rows={4} placeholder="Details"
                            name="details" value={formik.values.details} onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        ></textarea>
                        {formik.errors.details && formik.touched.details ? <div className="text-red-600 text-sm sm:text-base font-semibold flex ">* {formik.errors.details}</div> : ""}
                    </div>
                    <div className="flex flex-col gap-1 sm:flex-row sm:gap-3 sm:justify-between">
                        <button type="submit" onClick={() => { setPaymentMethod("Cash order") }} className="btn-success bg-blue-500 hover:bg-blue-600 font-extrabold text-nowrap">Cash order</button>
                        <button type="submit" onClick={() => { setPaymentMethod("Online payment") }} className="btn-success bg-indigo-500 hover:bg-indigo-600 font-extrabold text-nowrap">Online payment</button>
                    </div>
                </div>
            </form>
        </fieldset>
    </section>
}