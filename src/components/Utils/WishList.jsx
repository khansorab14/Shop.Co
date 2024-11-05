import { useDispatch, useSelector } from "react-redux";
import {
  toggleDrawer,
  removeFromWishList,
  addAllFromWishlist,
} from "../../lib/slices/CartSlice";
import { MdOutlineDeleteForever } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export const WishList = () => {
  const wishlist = useSelector((state) => state.cart.wishlist);
  const drawerOpen = useSelector((state) => state.cart.drawerOpen);
  const dispatch = useDispatch();
    const navigate = useNavigate();

  const handleClose = () => {
    dispatch(toggleDrawer(false));
    console.log("wishlist close");
    
  };

  const handleRemoveFromWishlist = (id) => {
    dispatch(removeFromWishList(id));
  };
  const handleAddAllToCart = () => {
    dispatch(addAllFromWishlist());
    handleClose();
    navigate("/cart");
  };

  return (
    <div
      className={`fixed top-0 right-0 z-40 h-screen p-4 overflow-y-auto transition-transform transform w-80 bg-black bg-opacity-70 ${
        drawerOpen ? "translate-x-0" : "translate-x-full"
      } duration-500 ease-in-out`}
      tabIndex="-1"
      aria-labelledby="drawer-right-label"
    >
      <button
        onClick={handleClose}
        type="button"
        className="text-gray-300 bg-transparent hover:bg-gray-700 hover:text-white rounded-lg text-sm w-8 h-8 absolute top-2.5 right-2.5 inline-flex items-center justify-center"
      >
        <svg
          className="w-3 h-3"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 14"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
          />
        </svg>
        <span className="sr-only">Close menu</span>
      </button>

      {wishlist.length > 0 ? (
        wishlist.map((item) => (
          <div key={item.id} className="mb-4 mt-8 border-2 text-gray-300">
            <div className="p-4 flex  justify-evenly ">
              <ul className=" flex justify-evenly gap-3 items-center  ">
                <li>
                  <img
                    src={item.image}
                    alt={item.title}
                    className=" w-[100px] h-24 object-fill mt-2 rounded-md"
                  />
                </li>
                <li>
                  <h2 className="font-semibold text-sm ">{item.title}</h2>
                </li>
                <li>
                  <h1 className="text-white">${item.price}</h1>
                </li>
                
                <li>
                  {" "}
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="mt-2 px-2 py-1  text-white rounded hover:bg-red-500"
                  >
                    <MdOutlineDeleteForever />
                  </button>
                </li>
              </ul>

              <div className=" flex  justify-end"></div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-300">Wishlist is Empty</p>
      )}

      <div className="flex justify-center">
        <button
          onClick={handleAddAllToCart}
          href="#"
          className="px-4 py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none hover:bg-gray-100 hover:text-blue-700 focus:ring-4 focus:ring-gray-100"
        >
            {
                wishlist.length === 0 ? "Oh No, Please Add to wishlist" : "Add To Cart"
            }
       
        </button>
      </div>
    </div>
  );
};
