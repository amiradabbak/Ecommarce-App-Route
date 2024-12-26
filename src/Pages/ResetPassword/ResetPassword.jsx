import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import { Helmet } from "react-helmet"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
export default function ResetPassword() {
    //? My variables
    const [oneClick, setOneClick] = useState(true)
    const [IsShowPassword, setShowPassword] = useState(false)
    const navigate = useNavigate()
    const [errorRespose, setErrorRespose] = useState(null)
    // Regex
    const passwordRegex = /^[A-Z][0-9a-zA-Z]{6,25}$/
    // Validation
    const validationSchema = Yup.object({
        email: Yup.string().required().email(),
        newPassword: Yup.string().required().min(6).max(25).matches(passwordRegex, "Password must start with a capital letter"),
    })
    //! New password
    async function newPassword(Values) {
        let id;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
                    method: "PUT",
                    data: Values
                }
                id = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success("The password has been changed")
                setTimeout(function () {
                    if (data.token) {
                        navigate("/auth/Login")
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
            toast.dismiss(id)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "email": "",
            "newPassword": "",
        },
        onSubmit: newPassword,
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
            <title>New password</title>
            <meta name="description" content="Enter a new password" />
        </Helmet>
        <section>
            <header>
                <h2 className="text-Success space-x-2 text-2xl mb-2">
                    <i className="fa-regular fa-circle-user"></i>
                    <span>New password</span>
                </h2>
            </header>
            <fieldset>
                <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                    <div>
                        <input tabIndex={2} type="email" autoComplete="on" placeholder="Email" className="form-control w-full"
                            name="email" value={Formik.values.email} onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                        />
                        {Formik.errors.email && Formik.touched.email ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.email}</div> : ""}
                    </div>
                    <div className="relative">
                        <input tabIndex={2} type="password" autoComplete="on" placeholder="New password" className="form-control w-full"
                            name="newPassword" value={Formik.values.newPassword} onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                        />
                        <div tabIndex={2} role="button" aria-label="Show or hide password" className="absolute top-2 right-2 " onClick={(e) => {
                            toogleEye(e)
                        }}>
                            <i className={IsShowPassword ? "fi fi-rs-crossed-eye" : "fi fi-rs-eye"} />
                        </div>
                        {Formik.errors.newPassword && Formik.touched.newPassword ? <div className="text-red-600 text-sm font-semibold flex items-center">* {Formik.errors.newPassword}</div> : ""}
                    </div>
                    {errorRespose !== null ? <div className="text-red-600 text-sm font-semibold flex items-center">* {errorRespose}</div> : ""}
                    <div className="flex flex-col items-start">
                        <button tabIndex={2} type="submit" className="btn-success uppercase mt-1">Save</button>
                    </div>
                </form>
            </fieldset>
        </section>
    </>
}