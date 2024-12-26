import { Outlet } from "react-router-dom";
import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
export default function Layout() {
    return <>
        <Navbar />
        <section className="px-3 md:px-0 container pb-10 pt-[96px] min-h-screen">
            <Outlet />
        </section>
        <Footer />
    </>
}