import { useContext, useEffect, useState } from "react";
import ProductCard from "../../Components/Card/ProductCard";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import HomeSlider from "../../Components/HomeSlider/HomeSlider";
import CategorySlider from "../../Components/CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";
import { WishListContext } from "../../Context/WishList.context";
import { useQuery } from "@tanstack/react-query";
export default function Home() {
    //? My variables
    const { getWishlistUser } = useContext(WishListContext)
    //! Get all products  
    async function getProducts() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/products`,
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading, isFetching } = useQuery({
        queryKey: ["Products in home"],
        queryFn: getProducts,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    })
    //! My useEffect 
    useEffect(() => {
        getWishlistUser()
    }, [isFetching])
    if (isLoading) return <Loading />
    return <>
        <Helmet>
            <title>Home</title>
            <meta name="description" content="Freshcart home page" />
        </Helmet>
        <HomeSlider />
        <CategorySlider />
        <div className="grid grid-cols-12 gap-4">
            {data.data.data.map((product) => (
                <ProductCard productDetails={product} key={product._id} />
            ))}
        </div>
    </>
}