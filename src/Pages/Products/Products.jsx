import { useQuery } from "@tanstack/react-query"
import ProductCard from "../../Components/Card/ProductCard"
import axios from "axios"
import Loading from "../../Components/Loading/Loading"
import { Helmet } from "react-helmet"
import { useContext, useEffect, useState } from "react"
import LoadingBase from "../../Components/LoadingBase/LoadingBase"
import { WishListContext } from "../../Context/WishList.context"
export default function Products() {
    //? My variables
    let [listProduct, setListProduct] = useState(null)
    let [pageNumber, setPageNumber] = useState(1)
    const { getWishlistUser } = useContext(WishListContext)
    //! Get all products 
    async function getProducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products?page=${pageNumber}`,
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading, refetch, isFetching } = useQuery({
        queryKey: ["Products"],
        queryFn: getProducts,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 0,
    })
    //! My useEffect 
    useEffect(() => {
        getWishlistUser()
    }, [])
    useEffect(() => {
        !isLoading ? setListProduct(data.data.data) : null
    }, [data])
    useEffect(() => {
        refetch()
    }, [pageNumber])
    return <>
        <Helmet>
            <title>
                Products
            </title>
            <meta name="description" content="products page explore products" />
        </Helmet>
        <section>
            <header>
                <h2 className="mb-5 text-Success text-3xl font-medium text-center">All Products</h2>
            </header>
            <div className="grid grid-cols-12 gap-4 min-h-96">
                {
                    listProduct === null ? <div className="col-span-12"><Loading /></div> : <>
                        <div className="col-span-12 mb-3">
                            <div className="flex gap-3 justify-end items-start mb-2">
                                {data ? data.data.metadata.prevPage ? <button onClick={() => {
                                    setPageNumber(data.data.metadata.prevPage ? data.data.metadata.prevPage : null)
                                }} type="button"
                                    className="btn-success bg-yellow-500 hover:bg-yellow-600 px-6">Previous page</button> : null : null}
                                {data ? data.data.metadata.nextPage ? <button onClick={() => {
                                    setPageNumber(data.data.metadata.nextPage ? data.data.metadata.nextPage : null)
                                }} type="button" className="btn-success px-6">Next page</button> : null : null}
                            </div>
                            <input onChange={(e) => {
                                setListProduct(data.data.data.filter((product) => {
                                    return product.title.toLowerCase().includes(e.target.value.toLowerCase())
                                }));


                            }} type="search" placeholder="Search..." className="form-control w-full" /></div>
                        {listProduct.map((product) => (
                            <ProductCard productDetails={product} key={product._id} />
                        ))}</>
                }
            </div>
        </section>
        {data && isFetching ? <LoadingBase /> : null}
    </>
}