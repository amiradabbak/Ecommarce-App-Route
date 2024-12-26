import imageSlide1 from "../../assets/images/slider-image-3.jpeg"
import imageSlide2 from "../../assets/images/slider-image-1.jpeg"
import imageSlide3 from "../../assets/images/slider-image-2.jpeg"
export default function HomeSlider() {
    return <>
        <section className="grid grid-cols-12 mb-5">
            <figure className="col-span-12 md:col-span-8">
                <swiper-container loop={true} autoplay={true} style={{ height: "100%" }}>
                    <swiper-slide >
                        <img src={imageSlide1} className="w-full h-full object-cover cursor-grab" alt="" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src={imageSlide2} className="w-full h-full object-cover cursor-grab" alt="" />
                    </swiper-slide>
                    <swiper-slide>
                        <img src={imageSlide3} className="w-full h-full object-cover cursor-grab" alt="" />
                    </swiper-slide>
                </swiper-container>
            </figure>
            <figure className="col-span-12 pt-1  flex gap-1 md:p-0 md:block md:gap-0 md:col-span-4">
                <div className="h-full md:h-1/2">
                    <img src={imageSlide2} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="h-full md:h-1/2">
                    <img src={imageSlide3} className="w-full h-full object-cover" alt="" />
                </div>
            </figure>
        </section>
    </>
}