import { Link, NavLink } from "react-router-dom";
import logo from "../../assets/images/freshcart-logo.svg";
import { useContext, useEffect } from "react";
import { UserContext } from "../../Context/User.context";
import { CartContext } from "../../Context/Cart.context";

export default function Navbar() {
  const { token, logout } = useContext(UserContext);
  const { cartInfo, getUserCart } = useContext(CartContext);

  useEffect(() => {
    if (token) getUserCart();
  }, [token, getUserCart]);

  return (
    <nav className="bg-light-white py-4 lg:py-2 fixed top-0 left-0 right-0 z-[9999]">
      <div className="lg:container mx-auto flex items-center justify-between px-4 lg:px-0">
        <header className="flex-shrink-0">
          <Link tabIndex={1} to="/Freshcart">
            <img src={logo} className="w-36" alt="Logo" />
          </Link>
        </header>

        <ul className="flex-1 flex justify-center gap-4 lg:gap-6 items-center">
          <li>
            <NavLink
              tabIndex={1}
              className={({ isActive }) =>
                `relative font-semibold text-base hover:text-black ${
                  isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                }`
              }
              to="/Freshcart"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              tabIndex={1}
              className={({ isActive }) =>
                `relative font-semibold text-base hover:text-black ${
                  isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                }`
              }
              to="/Wishlist"
            >
              Wish list
            </NavLink>
          </li>
          <li>
            <NavLink
              tabIndex={1}
              className={({ isActive }) =>
                `relative font-semibold text-base hover:text-black ${
                  isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                }`
              }
              to="/Products"
            >
              Products
            </NavLink>
          </li>
          <li>
            <NavLink
              tabIndex={1}
              className={({ isActive }) =>
                `relative font-semibold text-base hover:text-black ${
                  isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                }`
              }
              to="/Categories"
            >
              Categories
            </NavLink>
          </li>
          <li>
            <NavLink
              tabIndex={1}
              className={({ isActive }) =>
                `relative font-semibold text-base hover:text-black ${
                  isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                }`
              }
              to="/Brands"
            >
              Brands
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-4">
          {token ? (
            <>
              <NavLink
                tabIndex={1}
                to="/Cart"
                className={({ isActive }) =>
                  `relative font-semibold text-sm hover:text-black ${
                    isActive ? "text-black" : "text-[#575757]"
                  }`
                }
              >
                <i className="fa-solid fa-cart-shopping text-3xl"></i>
                {cartInfo && (
                  <span className="absolute top-0 right-0 bg-green-500 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                    {cartInfo.numOfCartItems}
                  </span>
                )}
              </NavLink>
              <button
                onClick={logout}
                className="flex items-center gap-2 font-semibold text-slate-700 hover:text-black transition-colors duration-300"
              >
                Logout
                <i className="fa-solid fa-right-from-bracket text-2xl"></i>
              </button>
            </>
          ) : (
            <ul className="flex gap-4 items-center">
              <li>
                <NavLink
                  tabIndex={1}
                  className={({ isActive }) =>
                    `relative font-semibold text-base hover:text-black ${
                      isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                    }`
                  }
                  to="/auth/Login"
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  tabIndex={1}
                  className={({ isActive }) =>
                    `relative font-semibold text-base hover:text-black ${
                      isActive ? "text-black before:content-[''] before:absolute before:w-full before:h-[2px] before:bg-green-500 before:bottom-0 before:left-0" : "text-slate-700"
                    }`
                  }
                  to="/auth/Signup"
                >
                  Sign up
                </NavLink>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}