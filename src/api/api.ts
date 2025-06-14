//src/api/api.ts
import axios from "axios";

// import dotenv from "dotenv/config";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common.Authorization = `Bearer ${
  import.meta.env.VITE_API_KEY
}`;

// console.log(import.meta.env.VITE_API_KEY);

// Want to use async/await? Add the `async` keyword to your outer function/method.
export const getMovies = async () => {
  try {
    const response = await axios.get("/discover/movie");
    return response;
  } catch (error) {
    return error;
  }
};
