import axios from "axios"
import { useFormik } from "formik"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import * as Yup from "yup"
import { Helmet } from "react-helmet"
export default function ResetCode() {
    //? My variables
    const [oneClick, setOneClick] = useState(true)
    const navigate = useNavigate()
    // Regex
    const resetCodeRegex = /^[0-9]/
    // Validation
    const validationSchema = Yup.object({
        resetCode: Yup.string("").matches(resetCodeRegex, "Not a number").max(6, "Activation number must be six digits").min(6, "Activation number must be six digits").required(),
    })
    //! Check code from user valid or no 
    async function checkCode(Values) {
        let toastId;
        try {
            if (oneClick) {
                setOneClick(false)
                const options = {
                    url: "https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode",
                    method: "POST",
                    data: Values
                }
                toastId = toast.loading("Waiting...")
                const { data } = await axios.request(options)
                toast.success("Success")
                setTimeout(function () {
                    if (data.status) {
                        navigate("/auth/ResetPassword")
                        setOneClick(true)
                    }
                }, 2500)
            }
        } catch (error) {
            setOneClick(true)
            toast.error(error.response.data.message)
        } finally {
            toast.dismiss(toastId)
        }
    }
    const Formik = useFormik({
        initialValues: {
            "resetCode": ""
        },
        onSubmit: checkCode,
        validationSchema
    })
    return <>
        <Helmet>
            <title>Ververify code</title>
            <meta name="description" content="Enter Ververify code to access to change your password" />
        </Helmet>
        <section className=" flex flex-col">
            <header>
                <h2 className="text-Success space-x-2 text-2xl mb-2">
                    <i className="fa-regular fa-circle-user"></i>
                    <span>Ververify code</span>
                </h2>
            </header>
            <fieldset>
                <form action="" className="space-y-2" onSubmit={Formik.handleSubmit}>
                    <div>
                        <input tabIndex={2} type="tel" inputMode="numeric" autoComplete="off" placeholder="Ververify code" className="form-control w-full" maxLength="6"
                            name="resetCode" value={Formik.values.resetCode} onChange={Formik.handleChange}
                            onBlur={Formik.handleBlur}
                        />
                        <div className="text-red-600 text-sm font-semibold flex items-center">{Formik.errors.resetCode && Formik.touched.resetCode ? "* " + Formik.errors.resetCode : ""} </div>
                    </div>
                    <div className="mt-2" style={{ margin: 0 }}>
                        <button tabIndex={2} type="submit" className="btn-success uppercase mt-1">Send</button>
                    </div>
                </form>
            </fieldset>
        </section>
    </>
}