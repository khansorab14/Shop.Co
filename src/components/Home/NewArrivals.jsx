import { useEffect, useState } from "react";
import { Card } from "../Utils/Card";

import { getDataFromApi } from "../../api/getDataFromApi";

export const NewArrivals = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const api = await getDataFromApi();
      setData(api);
    //   console.log(api, "Fetched Data");
    };
    fetchData();
  }, []);

  return (
    <div className="bg-white">
      <div className="flex justify-center py-10">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
          NEW ARRIVALS
        </h1>
      </div>
      <div className="px-4 md:px-8 lg:px-24">
        <div className="border-b border-[#c0c0c0f4]">
          <Card data={data} />
         
        </div>
      </div>
    </div>
  );
};
