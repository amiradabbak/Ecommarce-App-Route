import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
export default function Signup() {
    //? My variables
    const [oneClick, setOneClick] = useState(true)
    const [IsShowPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    // Regex
    const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
    const passwordRegex = /^[A-Z][0-9a-zA-Z]{6,25}$/
    // Validation
    const validationSchema = Yup.object({
        name: Yup.string().required().min(3).max(25),
        email: Yup.string().required().email(),
        phone: Yup.string().required().matches(phoneRegex, "Invaild number"),
        password: Yup.string().required().min(6).max(25).matches(passwordRegex, "Password must start with a capital letter"),
        rePassword: Yup.string().required().oneOf([Yup.ref("password")], "Re-password must be same with password")
    })
    // Register user
    async function sendToRegister(Values) {
        let toastId;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/signup",
                    method: "POST",
                    data: Values
                }
                toastId = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success("Email created successfully")
                setTimeout(function () {
                    if (data.message === "success") {
                        navigate("/auth/Login")
                        setOneClick(true)
                    }
                }, 2500)
            }
        } catch (error) {
            setOneClick(true)
            toast.error(error.response.data.message)
            Formik.setFieldValue("email", "")
        } finally {
            toast.dismiss(toastId)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "name": "",
            "email": "",
            "password": "",
            "rePassword": "",
            "phone": ""
        },
        onSubmit: sendToRegister,
        validationSchema
    })
    function toogleEyePassword(e) {
        if (IsShowPassword || !IsShowPassword) {
            setShowPassword(!IsShowPassword)
            if (e.target.classList.contains("fi-rs-crossed-eye") === true) {
                e.target.parentElement.previousElementSibling.setAttribute("type", "password")
            } else {
                e.target.parentElement.previousElementSibling.setAttribute("type", "text")
            }
        }
    }
    const [IsShowRePassword, setShowRePassword] = useState(false)
    function toogleEyeRePassword(e) {
        if (IsShowRePassword || !IsShowRePassword) {
            setShowRePassword(!IsShowRePassword)
            if (e.target.classList.contains("fi-rs-crossed-eye") === true) {
                e.target.parentElement.previousElementSibling.setAttribute("type", "password")
            } else {
                e.target.parentElement.previousElementSibling.setAttribute("type", "text")
            }
        }
    }
    return <>
        <Helmet>
            <title>Sign up</title>
            <meta name="description" content="Join us now and continue to log in to our site" />
        </Helmet>
        <section>
            <header>
            <h2 className="text-Success space-x-2 text-2xl mb-2">
                <i className="fa-regular fa-circle-user"></i>
                <span>Register Now</span>
            </h2>
            </header>
            <fieldset>
            <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                <div>
                    <input tabIndex={2} type="text" autoComplete="on" placeholder="Username" className="form-control w-full"
                        name="name" value={Formik.values.name} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    {Formik.errors.name && Formik.touched.name ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.name}</div> : ""}
                </div>
                <div>
                    <input tabIndex={2} type="email" autoComplete="on" placeholder="Email" className="form-control w-full"
                        name="email" value={Formik.values.email} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    {Formik.errors.email && Formik.touched.email ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.email}</div> : ""}
                </div>
                <div>
                    <input tabIndex={2} type="tel" autoComplete="on" placeholder="Phone" className="form-control w-full"
                        name="phone" value={Formik.values.phone} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    {Formik.errors.phone && Formik.touched.phone ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.phone}</div> : ""}
                </div>
                <div className="relative">
                    <input tabIndex={2} type="password" autoComplete="on" placeholder="Password" className="form-control w-full"
                        name="password" value={Formik.values.password} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    <div tabIndex={2} role="button" aria-label="Show or hide password" className="absolute top-2 right-2 " onClick={(e) => {
                        toogleEyePassword(e)
                    }}>
                        <i className={IsShowPassword ? "fi fi-rs-crossed-eye" : "fi fi-rs-eye"} />
                    </div>
                    {Formik.errors.password && Formik.touched.password ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.password}</div> : ""}
                </div>
                <div className="relative">
                    <input tabIndex={2} type="password" placeholder="Password" className="form-control w-full"
                        name="rePassword" value={Formik.values.rePassword} onChange={Formik.handleChange}
                        onBlur={Formik.handleBlur}
                    />
                    <div tabIndex={2} role="button" aria-label="Show or hide password" className="absolute top-2 right-2 " onClick={(e) => {
                        toogleEyeRePassword(e)
                    }}>
                        <i className={IsShowRePassword ? "fi fi-rs-crossed-eye" : "fi fi-rs-eye"} />
                    </div>
                    {Formik.errors.rePassword && Formik.touched.rePassword ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.rePassword}</div> : ""}
                </div>
                <button tabIndex={2} type="submit" className="btn-success uppercase">Sign Up</button>
            </form>
            </fieldset>
        </section>
    </>
}