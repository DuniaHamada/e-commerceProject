import { NavLink, Link } from "react-router-dom";
import logo from "../../images/Logo.png";
import withWrapper from "../HOC/withWrapper";
import {
  ShoppingBagIcon,
  UserCircleIcon,
  HeartIcon,
} from "@heroicons/react/24/solid";
import { useSelector } from "react-redux";

function Navbar() {
  const cartItems = useSelector((state) => state.cart.products);
  const wishlistItems = useSelector((state) => state.wishlist.products);

  return (
    <nav className="flex gap-[200px] items-center py-[18px] sticky top-0 z-50 bg-white">
      <Link
        to="/"
        className="flex items-center hover:scale-110 transition-transform duration-600"
      >
        <img src={logo} alt="Logo" className="w-[70%]" />
      </Link>

      <ul className="flex gap-8 text-[20px] font-medium text-rose-900 poppins-medium">
        <li className="hover:scale-110 transition-transform duration-600">
          <NavLink to="/">Home</NavLink>
        </li>
        <li className="hover:scale-110 transition-transform duration-600">
          <NavLink to="/Product">Products</NavLink>
        </li>
        <li className="hover:scale-110 transition-transform duration-600">
          <NavLink to="/Contact">Contact Us</NavLink>
        </li>
      </ul>

      <div className="flex items-center gap-3">
        <div className="icons hover:scale-110 transition-transform duration-600 relative">
          <Link to="/Wishlist">
            <HeartIcon width={28} color="#881337" />
            {wishlistItems.length > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-[#82817f] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {wishlistItems.length}
              </span>
            )}
          </Link>
        </div>

        <div className="icons hover:scale-110 transition-transform duration-600 relative">
          <Link to="/Cart">
            <ShoppingBagIcon width={28} color="#881337" />
            {cartItems.length > 0 && (
              <span className="absolute top-[-8px] right-[-8px] bg-[#82817f] text-white rounded-full h-5 w-5 flex items-center justify-center text-xs">
                {cartItems.length}
              </span>
            )}
          </Link>
        </div>

        <div className="icons hover:scale-110 transition-transform duration-600 relative">
          <Link to="/Profile">
            <UserCircleIcon width={30} color="#881337" />
          </Link>
        </div>
      </div>
    </nav>
  );
}

const WrapperNavbar = withWrapper(Navbar);
export default WrapperNavbar;
