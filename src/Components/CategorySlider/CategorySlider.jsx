import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { Link } from "react-router-dom"
import "Swiper/css"
import { SwiperSlide, Swiper } from "swiper/react"
import Loading from "../Loading/Loading"
export default function CategorySlider() {
    //! Get all categories 
    async function getCategories() {
        const options = {
            url: "https://ecommerce.routemisr.com/api/v1/categories",
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading } = useQuery({
        queryKey: ["CategorySlider in home"],
        queryFn: getCategories,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    })
    return <section>
        {!isLoading ? <section className="pb-8">
            <header>
                <h2 className="font-semibold mb-2">Shop Popular Categories</h2>
            </header>
            <Swiper loop={true} autoplay={true} slidesPerView={1} breakpoints={{
                400: {
                    slidesPerView: 2
                },
                500: {
                    slidesPerView: 3
                },
                600: {
                    slidesPerView: 4
                },
                700: {
                    slidesPerView: 5
                },
                800: {
                    slidesPerView: 6
                },
            }}>
                {data.data.data.map((category) => <SwiperSlide key={category._id}>
                    <Link to={`/Category/${category._id}`}>
                        <figure>
                            <img src={category.image} className="w-full aspect-square object-cover" alt={category.name} />
                        </figure>
                    </Link>
                    <h3 className="text-xs font-semibold  text-gray-800 text-center mt-2">{category.name}</h3>
                </SwiperSlide>)}
            </Swiper>
        </section> : <Loading />}
    </section>
}