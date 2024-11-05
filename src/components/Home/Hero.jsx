import { Button } from "../Utils/Button";
import { WishList } from "../Utils/WishList";

export const Hero = () => {
  return (
    <div className="h-screen bg-[#f2f0f1] flex flex-col justify-center">
      <WishList />
      <div className="flex flex-col-reverse md:flex-row justify-between items-center lg:h-screen bg-[#f2f0f1] px-6 md:px-24 py-10">
        <div className="md:w-1/2 lg:max-w-lg">
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold leading-tight tracking-tight text-black">
            FIND CLOTH
            <br /> THAT MATCHES
            <br /> YOUR STYLE
          </h1>
          <p className="mt-6 md:mt-10 text-lg md:text-xl font-light text-black">
            Browse through our diverse range of meticulously crafted garments,
            designed to bring out your individuality and cater to your sense of
            style.
          </p>
          <div className="lg:mt-6 mt-4 ">
            <Button />
          </div>
          <div className="flex flex-col md:flex-row mt-10 space-y-4 md:space-y-0 md:space-x-10">
            <div className="flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-semibold">200+</h1>
              <p className="text-sm md:text-base font-light text-center">
                International Brands
              </p>
            </div>
            <div className="border-l border-gray-300 pl-10 flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-semibold">2,000+</h1>
              <p className="text-sm md:text-base font-light text-center">
                High-Quality Products
              </p>
            </div>
            <div className="border-l border-gray-300 pl-10 flex flex-col items-center">
              <h1 className="text-3xl md:text-4xl font-semibold">30,000+</h1>
              <p className="text-sm md:text-base font-light text-center">
                Happy Customers
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center md:justify-end w-full md:w-1/2">
          <img
            className="object-cover w-full h-48 sm:h-64 md:h-auto lg:h-[80vh] xl:h-[90vh]"
            src="/images/homepage.jpeg"
            alt="Hero"
          />
        </div>
      </div>
    </div>
  );
};
