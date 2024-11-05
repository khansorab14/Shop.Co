// api/getDataFromApi.js

export const getDataFromApi = async () => {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    if (!response.ok) {
      console.error("Error Fetching Data");
    }
    const data = await response.json();
    return data; // return the array of users
  } catch (error) {
    console.error("Error fetching data:", error);
    return null; // return null in case of an error
  }
};
