import axios from "axios"
import { useFormik } from "formik"
import { useContext, useState } from "react"
import toast from "react-hot-toast"
import { Link, useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { UserContext } from "../../Context/User.context"
import { Helmet } from "react-helmet"
export default function Login() {
    //? My variables
    const { setToken } = useContext(UserContext)
    const [oneClick, setOneClick] = useState(true)
    const [IsShowPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [errorRespose, setErrorRespose] = useState(null)
    // Regex
    const passwordRegex = /^[A-Z][0-9a-zA-Z]{6,25}$/
    // Validation
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6).max(25).matches(passwordRegex, "Password must start with a capital letter"),
    })
    // Check email and password is valid 
    async function sendToLogin(Values) {
        let toastId;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/signin",
                    method: "POST",
                    data: Values
                }
                toastId = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success("User logged in successfully")
                setTimeout(function () {
                    if (data.message === "success") {
                        localStorage.setItem("token", data.token)
                        setToken(data.token)
                        navigate("/")
                        setOneClick(true)
                    }
                }, 2500)
                setErrorRespose(null)
            }
        } catch (error) {
            setOneClick(true)
            setErrorRespose(error.response.data.message)
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "email": "",
            "password": "",
        },
        onSubmit: sendToLogin,
        validationSchema
    })
    //& Eye toggle input type [text,password] 
    function toogleEye(e) {
        if (IsShowPassword || !IsShowPassword) {
            setShowPassword(!IsShowPassword)
            if (e.target.classList.contains("fi-rs-crossed-eye") === true) {
                e.target.parentElement.previousElementSibling.setAttribute("type", "password")
            } else {
                e.target.parentElement.previousElementSibling.setAttribute("type", "text")
            }
        }
    }
    return <>
        <Helmet>
            <title>Login</title>
            <meta name="description" content="Freshcart login" />
        </Helmet>
        <section>
            <header>
                <h2 className="text-Success space-x-2 text-2xl mb-2">
                    <i className="fa-regular fa-circle-user"></i>
                    <span>Login Now</span>
                </h2>
            </header>
            <fieldset>
                <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                    <div>
                        <input type="email" autoComplete="on" placeholder="Email" className="form-control w-full"
                            name="email" value={Formik.values.email} onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                        />
                        {Formik.errors.email && Formik.touched.email ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.email}</div> : ""}
                    </div>
                    <div className="relative">
                        <input type="password" autoComplete="on" placeholder="Password" className="form-control w-full"
                            name="password" value={Formik.values.password} onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                        />
                        <div className="absolute top-2 right-2 " onClick={(e) => {
                            toogleEye(e)
                        }}>
                            <i className={IsShowPassword ? "fi fi-rs-crossed-eye" : "fi fi-rs-eye"} />
                        </div>
                        {Formik.errors.password && Formik.touched.password ? <div className="text-red-600 text-sm font-semibold flex items-center ">* {Formik.errors.password}</div> : ""}
                    </div>
                    {errorRespose !== null ? <div className="text-red-600 text-sm font-semibold flex items-center">* {errorRespose}</div> : ""}
                    <div className="flex flex-col items-start mt-2" style={{ margin: 0 }}>
                        <Link to="/auth/ForgotPassword" className="ms-auto flex items-center"><span className="text-gray-400 font-semibold text-xs">Forgot your password?</span></Link>
                        <button type="submit" className="btn-success uppercase mt-1">login</button>
                    </div>
                </form>
            </fieldset>
        </section>
    </>
}