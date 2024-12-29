import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../../Components/Loading/Loading";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

export default function Categories() {
    //! Get all categories 
    async function getCategories() {
        const options = {
            url: `https://ecommerce.routemisr.com/api/v1/categories`,
            method: "GET"
        }
        return await axios.request(options)
    }
    let { data, isLoading } = useQuery({
        queryKey: ["Categories"],
        queryFn: getCategories,
        refetchOnMount: false,
        staleTime: 1 * 60 * 60 * 1000,
        retry: 3,
        refetchInterval: 5 * 60 * 1000,
        gcTime: 5 * 60 * 1000,
    })
    return <>
        <Helmet>
            <title>Categories</title>
            <meta name="description" content="Freshcart categories page explore all categories" />
        </Helmet>
        <section>
            <header>
                <h2 className="text-3xl text-Success text-center font-medium mb-7">All Categories</h2>
            </header>
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                    {isLoading ? (
                        <div className="col-span-full">
                            <Loading />
                        </div>
                    ) : (
                        data.data.data.map((category) => (
                            <div
                                key={category._id}
                                tabIndex={2}
                                className="hover:-translate-y-3 shadow-lg main-shadow transition-[box-shadow,transform] duration-300 h-96 overflow-hidden border border-1 rounded-md border-solid border-[#b1b1b1]"
                            >
                                <Link to={`/Category/${category._id}`}>
                                    <figure className="h-[88%]">
                                        <img
                                            className="w-full aspect-square object-cover h-full"
                                            src={category.image}
                                            alt={category.name}
                                        />
                                    </figure>
                                    <div className="h-[12%] flex items-center justify-center">
                                        <h3 className="text-Success text-lg font-semibold">
                                            {category.name}
                                        </h3>
                                    </div>
                                </Link>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </section>
    </>;
}