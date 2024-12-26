import { Link, NavLink } from "react-router-dom"
import logo from "../../assets/images/freshcart-logo.svg"
import { useContext, useEffect } from "react"
import { UserContext } from "../../Context/User.context"
import { CartContext } from "../../Context/Cart.context"
export default function Navbar() {
    //? My variables
    const { token, logout } = useContext(UserContext)
    const { cartInfo, getUserCart } = useContext(CartContext)
    //! My useEffect 
    useEffect(() => {
        if (token) getUserCart();
    }, [])
    return <>
        <nav className="bg-light-white py-4 lg:py-2 lg:flex lg:flex-wrap fixed top-0 lg:h-16 left-0 right-0 z-[9999]">
            <div className={`lg:container relative flex ${!token ? "justify-between pe-2" : null}  items-center gap-6`}>
                <header className="ps-3 lg:ps-0">
                    <h1>
                        <Link tabIndex={1} to="/Freashcart">
                            <img src={logo} className="w-36" alt="Logo" />
                        </Link>
                    </h1>
                </header>
                {token ? <>
                    <label tabIndex={1} role="button" htmlFor="Barnav" className="ms-auto text-2xl lg:hidden"><i className="fa-solid fa-bars"></i></label>
                    <input type="checkbox" id="Barnav" className="hidden" /></> : null
                }
                {token ? <ul id="Basenav" className="flex flex-1 gap-4 lg:gap-6 bg-white lg:bg-transparent items-center justify-center  overflow-hidden w-full absolute top-11 lg:top-0 flex-col lg:flex-row lg:static lg:h-full">
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Freashcart"}>
                            Home
                        </NavLink>
                    </li>
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Wishlist"}>
                            Wish list
                        </NavLink>
                    </li>
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Products"}>
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Categories"}>
                            Categories
                        </NavLink>
                    </li>
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/Brands"}>
                            Brands
                        </NavLink>
                    </li>
                    <li>
                        <NavLink tabIndex={1} className={({ isActive }) => {
                            return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                            before:absolute before:left-0 before:-bottom-1 before:h-[2px] before:bg-Success
                            ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                        }} to={"/allorders"}>
                            Orders
                        </NavLink>
                    </li>
                    <li className="mx-auto text-lg relative">
                        <NavLink tabIndex={1} to={"/Cart"} className={({ isActive }) => {
                            return `relative font-semibold text-sm hover:text-black
                            ${isActive ? "text-black" : "text-[#575757]"}`
                        }}>
                            <div className="flex items-center justify-center bg-Success rounded-md absolute -top-4 -right-2 w-4 h-4">
                                {cartInfo !== null ? <span className="text-white">{cartInfo.numOfCartItems}</span> : <i className="fa-solid fa-spinner fa-spin-pulse text-white"></i>}
                            </div>
                            <i className="fa-solid fa-cart-shopping text-3xl"></i>
                        </NavLink>
                    </li>
                </ul> : ""}
                <div className="flex lg:ms-auto gap-6">

                    <ul className="flex gap-4">
                        {
                            token ? "" : <div className="flex gap-2 md:gap-4">
                                <li>
                                    <NavLink tabIndex={1} className={({ isActive }) => {
                                        return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                                before:absolute before:left-0 before:-bottom-1 text-nowrap before:h-[2px] before:bg-Success
                                ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                                    }} to={"/auth/Login"}>Login</NavLink>
                                </li>
                                <li>
                                    <NavLink tabIndex={1} className={({ isActive }) => {
                                        return `relative font-semibold text-base hover:text-black hover:before:w-full before:transition-[width] before:duration-300 
                                before:absolute before:left-0 before:-bottom-1 text-nowrap before:h-[2px] before:bg-Success
                                ${isActive ? "before:w-full text-black" : "before:w-0 text-slate-700"}`
                                    }} to={"/auth/Signup"}>Sign up</NavLink>
                                </li>
                            </div>
                        }
                        {
                            token ? <li role="button" onClick={logout} className="pe-3 lg:pe-0">
                                <Link tabIndex={1} className="flex justify-center items-center gap-2 font-semibold group text-slate-700 text-nowrap"><span className="group-hover:text-black transition-colors duration-300 hidden lg:inline">Logout</span><i className="fa-solid fa-right-from-bracket text-2xl group-hover:text-black transition-colors duration-300"></i></Link>
                            </li> : ""
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </>
}