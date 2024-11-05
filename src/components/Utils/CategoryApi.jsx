import { useEffect, useState } from "react";
import { CategoryCard } from "./CategoryCard";

export const CategoryApi = () => {
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Categories</h1>
      <CategoryCard categories={categories} />
    </div>
  );
};
