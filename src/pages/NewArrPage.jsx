import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDataFromApi } from "../api/getDataFromApi";
import { Box, Rating } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateItem } from "../lib/slices/CartSlice";



export const NewArrPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart?.items || []);
  const [cardData, setCardData] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [couponCode, setCouponCode] = useState("");
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataFromApi();
      if (result) {
        const card = result.find((item) => item.id === parseInt(id));
        if (card) {
          setCardData(card);

          const productInCart = Array.isArray(cartItems)
            ? cartItems.find((item) => item.id === card.id)
            : undefined;

          setQuantity(productInCart ? productInCart.quantity : 0);
        }
      }
    };
    fetchData();
  }, [id, cartItems]);

  if (!cardData) return <div>Loading...</div>;

  const handleAddCart = () => {
    dispatch(addItem(cardData));
    setQuantity(quantity + 1);
  };

  const handleRemoveFromCart = () => {
    if (quantity > 0) {
      dispatch(removeItem(cardData.id));
      setQuantity(quantity - 1);
    }
  };

  const handleCartUpdate = () => {
    dispatch(updateItem({ ...cardData, quantity }));
    navigate("/cart")

  };

  const handleApplyCoupon = () => {
    if (couponCode === "SAVE20") {
      setDiscount(20);
    } else if (couponCode === "SAVE10") {
      setDiscount(10);
    } else {
      alert("Invalid coupon code");
      setDiscount(0);
    }
  };

  const originalPrice = cardData.price;
  const discountedPrice = originalPrice * (1 - discount / 100);
  const averageRating = cardData.rating ? cardData.rating.rate : 0;

  return (
    <div className="py-5">
      <div className="flex px-5 py-3" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
          <li className="inline-flex items-center">
            <a
              href="/"
              className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-black"
            >
              <svg
                className="w-3 h-3 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
              </svg>
              Home
            </a>
          </li>
          <li>
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180 block w-3 h-3 mx-1 text-gray-400 "
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <a
                href="/top-selling"
                className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-black"
              >
                New Arrivals
              </a>
            </div>
          </li>
          <li aria-current="page">
            <div className="flex items-center">
              <svg
                className="rtl:rotate-180  w-3 h-3 mx-1 text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
              <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-black">
                {cardData.title}
              </span>
            </div>
          </li>
        </ol>
      </div>

      <h1 className="flex justify-center text-3xl py-4 font-bold mb-5">
        {cardData.title.toUpperCase()}
      </h1>
      <div className="bg-white h-full px-24 w-full">
        <div className="flex justify-start">
          <ul className="bg-white h-screen flex flex-col items-start gap-2 px-2 py-4">
            <li className="outline rounded-3xl">
              <img
                src={cardData.image}
                alt={cardData.title}
                className="w-full h-48 object-contain rounded-3xl"
              />
            </li>
            <li className="outline rounded-3xl">
              <img
                src={cardData.image}
                alt={cardData.title}
                className="w-full h-48 object-contain rounded-3xl"
              />
            </li>
            <li className="outline rounded-3xl">
              <img
                src={cardData.image}
                alt={cardData.title}
                className="w-full h-48 object-contain rounded-3xl"
              />
            </li>
          </ul>

          <div className="px-5 h-screen py-4 flex bg-white">
            <img
              src={cardData.image}
              alt={cardData.title}
              className="sm:h-[75%] rounded-3xl"
            />
          </div>

          <div className="flex-1 px-5 py-4 justify-center">
            <h2 className="mt-2 font-semibold text-3xl">{cardData.title}</h2>
            <ul className="flex items-start mt-2">
              <li className="text-2xl text-[#ffc633]">
                <Box sx={{ width: 130, display: "flex", alignItems: "center" }}>
                  <Rating
                    name="text-feedback"
                    value={averageRating}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{averageRating}</Box>
                </Box>
              </li>
            </ul>

            <div className="flex items-center mt-4">
              <h1 className="text-black text-4xl font-semibold">
                ${discountedPrice.toFixed(0)}
              </h1>
              {discount > 0 && (
                <h1 className="text-[#bdbdbd] px-5 text-4xl line-through font-semibold">
                  ${originalPrice}
                </h1>
              )}
            </div>
            <div className=" border-b border-[#c0c0c0f4] ">
              <p className="text-black py-5">{cardData.description}</p>
            </div>

            {/* Coupon Code Section */}
            <div className="flex py-4 gap-4 my-4 border-b border-[#c0c0c0f4] ">
              <input
                type="text"
                placeholder="Enter coupon code"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                className="border border-gray-300 rounded px-4 py-2"
              />
              <button
                onClick={handleApplyCoupon}
                className="bg-black text-white rounded px-4 py-2"
              >
                Apply Coupon
              </button>
            </div>

            <div className=" py-3">
              <div className=" gap-20 flex items-center">
                <div className="flex bg-[#f2f0f1] rounded-full py-2 px-2 items-center ">
                  <button
                    onClick={handleRemoveFromCart}
                    className="bg-[#f2f0f1] rounded-full w-10 h-10 text-black"
                  >
                    -
                  </button>
                  <div className="text-xl px-4 mx-4">{quantity}</div>
                  <button
                    onClick={handleAddCart}
                    className="bg-[#f2f0f1] rounded-full w-10 h-10 text-black"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleCartUpdate}
                  className="bg-black rounded-full text-white px-20  py-4 w-full sm:w-auto text-center flex items-center justify-center gap-2"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}; 