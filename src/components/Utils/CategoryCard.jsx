import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ViewAllBtn } from "./ViewAllBtn";

export const CategoryCard = () => {
  const [categories, setCategories] = useState([]);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch("https://dummyjson.com/products/categories");
      const data = await res.json();
      setCategories(data);
      console.log(data, "Category API");
    };
    fetchCategories();
  }, []);

  const handleToggleShowAll = () => {
    setShowAll((prev) => !prev);
  };

  const displayedData = showAll ? categories : categories.slice(0, 8);

  return (
    <div className="p-5 bg-white w-full z-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedData.map((category, id) => (
          <div key={id} className="bg-gray-100 rounded p-4">
            <div className="flex justify-center items-center">
              <Link
                to={`/category/${category.slug}`}
                className="text-lg font-bold"
              >
                {category.name}
              </Link>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-8">
        <div className="w-full max-w-screen-sm sm:max-w-screen-md md:max-w-screen-lg flex justify-center">
          <ViewAllBtn
            handleToggleShowAll={handleToggleShowAll}
            showAll={showAll}
          />
        </div>
      </div>
    </div>
  );
};
            