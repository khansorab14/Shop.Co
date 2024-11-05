import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { LuShoppingCart } from "react-icons/lu";
import { CgProfile } from "react-icons/cg";
import { FiMenu } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { FaRegHeart } from "react-icons/fa";
import { toggleDrawer } from "../lib/slices/CartSlice";
import { Link } from "react-router-dom";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const wishlistCount = useSelector((state) => state.cart.wishlistCount);
  const cartItems = useSelector((state) => state.cart?.items || []);
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleWishlistIconClick = () => {
    dispatch(toggleDrawer(true));
    console.log("wishlist open");
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <div className="flex justify-between bg-black px-4 py-2">
        <div className="flex flex-1 justify-center">
          <h1 className="text-white font-normal flex items-center gap-2 text-center text-xs sm:text-sm">
            Sign up and get 20% off your first order.{" "}
            <a href="#" className="underline font-medium">
              Sign Up Now
            </a>
          </h1>
        </div>
        <div className="flex items-center md:hidden">
          <RxCross2 className="text-white cursor-pointer" />
        </div>
      </div>

      <nav className="bg-white py-4 shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4">
          {/* Logo and Menu Button */}
          <div className="flex items-center">
            <div className="sm:hidden">
              <button
                onClick={toggleMenu}
                className="text-2xl focus:outline-none"
              >
                {isMenuOpen ? <RxCross2 /> : <FiMenu />}
              </button>
            </div>
            <Link to="/" className="flex items-center px-4 py-2">
              <h1 className="text-2xl sm:text-3xl font-bold">SHOP.CO</h1>
            </Link>
          </div>

          {/* Desktop Menu Links - Hide on Mobile if Menu is Open */}
          {/* Desktop Menu Links - Render Only if Menu is Not Open on Mobile */}
          {!isMenuOpen && (
            <div className="sm:flex   flex-col sm:flex-row items-center w-full sm:w-auto sm:space-x-4 mt-4 sm:mt-0  hidden  ">
              <ul className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 text-black text-center">
                <li className="cursor-pointer hover:underline text-sm sm:text-base">
                  Shop
                </li>
                <li className="cursor-pointer hover:underline text-sm sm:text-base">
                  On Sale
                </li>
                <li className="cursor-pointer hover:underline text-sm sm:text-base">
                  New Arrivals
                </li>
                <li className="cursor-pointer hover:underline text-sm sm:text-base">
                  Brand
                </li>
              </ul>
            </div>
          )}

          {/* Icons Section - Aligned to the right */}
          <div className="flex items-center space-x-6 sm:space-x-8 text-black">
            <div className="relative">
              {cartCount > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {cartCount}
                </span>
              )}
              <Link to="/cart">
                <LuShoppingCart className="text-xl sm:text-2xl" />
              </Link>
            </div>
            <div className="relative">
              {wishlistCount > 0 && (
                <span className="absolute -top-1 right-0 bg-red-500 text-white text-xs rounded-full px-1">
                  {wishlistCount}
                </span>
              )}
              <button onClick={handleWishlistIconClick} className="pt-2">
                <FaRegHeart className="text-lg sm:text-xl" />
              </button>
            </div>
            <div>
              <CgProfile className="text-xl sm:text-2xl" />
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu - Only when `isMenuOpen` */}
      {isMenuOpen && (
        <div className="sm:hidden shadow-md mt-2">
          <ul className="flex flex-col items-center space-y-2 py-4">
            <li className="cursor-pointer hover:underline text-sm">Shop</li>
            <li className="cursor-pointer hover:underline text-sm">On Sale</li>
            <li className="cursor-pointer hover:underline text-sm">
              New Arrivals
            </li>
            <li className="cursor-pointer hover:underline text-sm">Brand</li>
          </ul>
        </div>
      )}
    </>
  );
};
