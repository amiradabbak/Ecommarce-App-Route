import { useEffect, useState } from "react"
import { Helmet } from "react-helmet"
export default function DatailsBrand({ dataSpecificBrand, setDataSpecificBrand }) {
    //? My variables
    const [isClose, setIsClose] = useState(false)
    const [isShow, setIsShow] = useState(false)
    //! My useEffect 
    useEffect(() => {
        setIsShow(true)
    },[])
    //& Close when click on outside element 
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("btnCloseBrand") === false && e.target.classList.contains("fixed")) {
            setIsShow(false)
            setTimeout(() => {
                setDataSpecificBrand(null)
            }, 400)
        }
    })
    return <>
        {dataSpecificBrand ? <Helmet>
            <title>{dataSpecificBrand.data.name}</title>
        </Helmet> : null
        }
        <section className={`w-[90%] sm:max-md:w-[60%] md:w-1/2 mt-32 bg-white rounded-md p-4 space-y-5 ${isShow ? "" : "-translate-y-full opacity-0"} ${isClose ? "-translate-y-full opacity-0" : ""} transition-[transform,opacity,left] duration-[700ms,500ms]`}>
            <div className="flex justify-end text-[#8e8e8e]">
                <i role="button" onClick={() => {
                    setIsClose(true)
                    setTimeout(() => {
                        setDataSpecificBrand(null)
                    }, 400)
                }} className="fa-solid fa-x btnCloseBrand cursor-pointer hover:text-black "></i>
            </div>
            <div className="grid grid-cols-12 border-[d1d1d1] border-t border-b border-solid min-h-40 items-center">
                {dataSpecificBrand ? <div className="col-span-12 grid grid-cols-6 md:grid-cols-12 items-center">
                    <article className="col-span-6">
                        <h3 className="font-medium text-center md:text-left text-4xl mb-2 text-Success">{dataSpecificBrand.data.name}</h3>
                        <p className="lowercase text-center md:text-left font-semibold text-base ps-1">{dataSpecificBrand.data.name}</p>
                    </article>
                    <figure className="col-span-6">
                        <img className="w-full h-40  object-contain" src={dataSpecificBrand.data.image} alt={dataSpecificBrand.data.name} />
                    </figure>
                </div> : <div className="h-180 flex justify-center items-center  col-span-12"><div className="loader"></div></div>
                }
            </div>
            <button onClick={() => {
                setIsClose(true)
                setTimeout(() => {
                    setDataSpecificBrand(null)
                }, 400)
            }} className="btn-success btnCloseBrand ms-auto block text-base font-semibold bg-[#6c757d] px-3 hover:bg-[#5c636a]" type="button">
                Close
            </button>
        </section>
    </>
}