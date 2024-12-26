import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { useState } from "react";
import DatailsBrand from "../../Components/DetailsBrand/DatailsBrand";
import { Helmet } from "react-helmet";
export default function Brands() {
    //? My variables
    const [isClick, setIsClick] = useState(false)
    const [dataSpecificBrand, setDataSpecificBrand] = useState(null)
    const [isHidden, setIsHidden] = useState(false)
    //! Get specific brand when click on image for brand 
    async function getSpecificBrands(id) {
        try {
            const options = {
                url: `https://ecommerce.routemisr.com/api/v1/brands/${id}`,
                method: "GET"
            }
            const { data } = await axios.request(options)
            setDataSpecificBrand(data)
        } catch (error) {
            console.log(error);
        }
    }
    //! Get all brands 
    async function getBrands() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/brands`,
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading } = useQuery({
        queryKey: ["Brands"],
        queryFn: getBrands,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
        maxPages: 2,
    })
    //& Close when click on button [this way keeping animation]  
    window.addEventListener("click", function (e) {
        if (e.target.classList.contains("btnCloseBrand")) {
            setTimeout(() => {
                setIsClick(false)
            }, 400)
        }
        if (e.target.classList.contains("btnCloseBrand") === false && e.target.classList.contains("fixed")) {
            setTimeout(() => {
                setIsClick(false)
            }, 400)
        }
    })
    return <>
        <Helmet>
            <title>
                Brands
            </title>
            <meta name="description" content="Freshcart brands page explore all brands" />
        </Helmet>
        {isLoading ? <Loading /> : <section>
            <header>
                <h2 className="text-4xl font-medium text-Success mb-10 text-center">All Brands</h2>
            </header>
            <div className="grid grid-cols-3 sm:grid-cols-6 md:grid-cols-9 lg:grid-cols-12 gap-5">
                {data.data.data.map((product) => <div tabIndex={2} role="button" key={product._id} onClick={() => {
                    setIsClick(true)
                    getSpecificBrands(product._id)
                }} className="col-span-3 shadow-lg main-shadow transition-[box-shadow,transform] duration-500 h-60 border hover:-translate-y-3 border-1 rounded-sm border-solid border-[b1b1b1]">
                    <figure>
                        <img src={product.image} alt={product.name} className="w-full h-36 object-contain" />
                        <figcaption className="text-center font-semibold text-base">{product.name}</figcaption>
                    </figure>
                    <div role="banner" className="fixed top-0 bottom-0 right-0 left-0 bg-black bg-opacity-40 hidden"></div>
                </div>
                )}
            </div>
            {isClick ? <div className={`fixed top-0 bottom-0  right-0 left-0 z-[9999] bg-black bg-opacity-30 flex justify-center items-start ${isHidden ? "hidden" : ""} transition-opacity duration-700`}>
                <DatailsBrand dataSpecificBrand={dataSpecificBrand} setDataSpecificBrand={setDataSpecificBrand} />
            </div> : null}
        </section>}
    </>
}