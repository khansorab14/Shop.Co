import { useSelector, useDispatch } from "react-redux";
import { removeItem, updateItem } from "../lib/slices/CartSlice";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { TiDeleteOutline } from "react-icons/ti";
// import { WishList } from "../components/Utils/WishList";

export const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleQuantityChange = (item, change) => {
    const newQuantity = item.quantity + change;
    if (newQuantity > 0) {
      dispatch(updateItem({ ...item, quantity: newQuantity }));
    }
  };

  const filteredCartItems = cartItems.filter((item) => item.quantity > 0);

  if (filteredCartItems.length === 0) {
    return (
      <div className="p-5">
        <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  const totalAmount = filteredCartItems.reduce((total, item) => {
    return total + item.price * item.quantity;
  }, 0);

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold mb-5">Your Cart</h1>
      <div className="space-y-4">
        {filteredCartItems.map((item) => {
          const averageRating = item.rating ? item.rating.rate : 0;

          return (
            <div
              key={item.id}
              className="bg-[#f2f0f1] flex flex-col md:flex-row justify-between items-center p-4 rounded-lg"
            >
              {/* Image */}
              <img
                className="w-[10%] h-24 md:w-32 md:h-32 object-cover"
                src={item.image}
                alt={item.title}
              />

              {/* Title and Rating */}
              <div className="flex flex-col md:flex-grow md:mx-4">
                <Link
                  to={`/new-arrivals/${item.id + item.title}`}
                  className="text-black font-semibold text-lg"
                >
                  {item.title}
                </Link>
                <ul className="flex items-center mt-2">
                  <li className="text-2xl text-[#ffc633]">
                    <Box
                      sx={{
                        width: 130,
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Rating
                        name="text-feedback"
                        value={averageRating}
                        readOnly
                        precision={0.5}
                        emptyIcon={
                          <StarIcon
                            style={{ opacity: 0.55 }}
                            fontSize="inherit"
                          />
                        }
                      />
                      <Box sx={{ ml: 2 }}>{averageRating}</Box>
                    </Box>
                  </li>
                </ul>
              </div>

              {/* Price and Quantity Control */}
              <div className="flex flex-col items-start md:flex-row md:items-start md:justify-between gap-6 mt-4 md:mt-0 py-7 ">
                <ul className="flex items-center gap-5">
                  <li>
                    <p className="text-gray-600 flex items-center ">
                      Price: ${item.price.toFixed(2)}
                    </p>
                  </li>
                  <li>
                    <div className="flex bg-black rounded-full py-2 px-2 items-center mt-2 md:mt-0">
                      <button
                        onClick={() => handleQuantityChange(item, -1)}
                        className="bg-black rounded-full w-5 h-5 text-white"
                      >
                        -
                      </button>
                      <div className="text-xl text-white px-4 mx-2">
                        Qty: {item.quantity}
                      </div>
                      <button
                        onClick={() => handleQuantityChange(item, 1)}
                        className="bg-black rounded-full w-5 h-5 text-white"
                      >
                        +
                      </button>
                    </div>
                  </li>
                  <li>
                    <p className="text-gray-600 mt-2 md:mt-0 md:ml-4">
                      Total: ${item.price * item.quantity}
                    </p>
                  </li>
                  <li>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      className="text-black text-2xl font-bold mt-2"
                    >
                      <TiDeleteOutline />
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 bg-gray-100 p-4 rounded-lg flex justify-end items-center">
        <div>
          <h2 className="text-2xl font-bold">Total Amount:</h2>
          <p className="text-xl flex justify-center">
            ${totalAmount.toFixed(2)}
          </p>
        </div>
      </div>
      {/* <WishList /> */}
    </div>
  );
};
