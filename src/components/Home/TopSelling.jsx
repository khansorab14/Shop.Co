
// import { Card } from "../Utils/Card";
import { CategoryCard } from "../Utils/CategoryCard";

// import { getDataFromApi } from "../../api/getDataFromApi";

export const TopSelling = () => {


  return (
    <div className="bg-white">
      <div className="flex justify-center py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
      TOP SELLINGS
        </h1>
      </div>
      <div className="px-4 md:px-8 lg:px-24">
        <div className="border-b border-[#c0c0c0f4]">
          <CategoryCard />
        </div>
      </div>
    </div>
  );
};
