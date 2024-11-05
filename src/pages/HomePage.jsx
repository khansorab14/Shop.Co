import { Brand } from "../components/Home/Brand";
import { BrowseCategory } from "../components/Home/BrowseCategory";
import { Hero } from "../components/Home/Hero";
import { NewArrivals } from "../components/Home/NewArrivals";
import { Testimonials } from "../components/Home/Testimonials";
import { TopSelling } from "../components/Home/TopSelling";
// import { WishList } from "../components/Utils/WishList";

// import { CategoryCard } from "../components/Utils/CategoryCard";



export const HomePage = () => {
  return (
    <>
      <Hero />
      <Brand />
      <NewArrivals />
      <TopSelling />
      {/* <WishList/> */}
     
  
      <BrowseCategory />
      <Testimonials />
    </>
  );
};
