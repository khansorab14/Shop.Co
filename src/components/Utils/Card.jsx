import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import { ViewAllBtn } from "./ViewAllBtn";
import { CiHeart } from "react-icons/ci";
import { IoMdHeart } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import { addToWishList, removeFromWishList } from "../../lib/slices/CartSlice";

const labels = {
  0.5: "Useless",
  1: "Useless+",
  1.5: "Poor",
  2: "Poor+",
  2.5: "Ok",
  3: "Ok+",
  3.5: "Good",
  4: "Good+",
  4.5: "Excellent",
  5: "Excellent+",
};

export const Card = ({ data = [] }) => {
  const { id } = useParams();
  const [showAll, setShowAll] = useState(false);

  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.cart.wishlist);

  const handleWishlistClick = (card) => {
    if (!wishlist.some((item) => item.id === card.id)) {
      dispatch(addToWishList(card));
    } else {
      dispatch(removeFromWishList(card.id));
    }
  };

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const displayedData = showAll ? data : data.slice(0, 4);
  const filteredData = id
    ? data.filter((card) => card.id === parseInt(id))
    : displayedData;

  return (
    <div>
      <div className="bg-white w-full z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-5">
        {filteredData.map((card) => {
          const averageRating = card.rating.rate;
          const discountPrice = Math.floor(card.price * 0.8);

          return (
            <div
              key={card.id}
              className="bg-[#f2f0f1] flex flex-col rounded-3xl shadow-md min-h-[300px] transition-transform transform hover:scale-105"
            >
              <div className="flex h-80">
                <img
                  className="w-full h-full block object-center"
                  src={card.image}
                  alt="Product"
                />
              </div>
              <div className="p-3">
                <div className="h-[66px]">
                  <Link
                    to={`/new-arrivals/${card.id + card.title}`}
                    className="text-black font-semibold text-lg"
                  >
                    {card.title}
                  </Link>
                </div>
                <ul className="flex items-center mt-2">
                  <li className="text-2xl text-[#ffc633]">
                    <Box
                      sx={{ width: 120, display: "flex", alignItems: "center" }}
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
                      <Box sx={{ ml: 2 }}>{labels[averageRating]}</Box>
                    </Box>
                  </li>
                  <li className="font-thin text-sm ml-2">{card.rating.rate}</li>
                </ul>
                <div className="flex justify-start items-center mt-4">
                  <h1 className="text-black text-lg lg:text-xl font-semibold">
                    ${discountPrice}
                  </h1>
                  <h1 className="text-[#bdbdbd] px-5 line-through text-lg lg:text-xl font-semibold">
                    ${card.price}
                  </h1>
                  <h1 className="bg-[#ff696957] px-5 font-light rounded-full text-[#ff3333] text-xs">
                    -20%
                  </h1>
                  <div className="px-4">
                    <button
                      onClick={() => handleWishlistClick(card)}
                      className="bg-transparent border-none cursor-pointer p-0"
                    >
                      {wishlist.some((item) => item.id === card.id) ? (
                        <IoMdHeart className="text-red-500 text-xl" />
                      ) : (
                        <CiHeart className="text-xl" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {!id && (
        <ViewAllBtn
          handleToggleShowAll={handleToggleShowAll}
          showAll={showAll}
        />
      )}
    </div>
  );
};
