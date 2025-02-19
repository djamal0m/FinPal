import axios, { AxiosInstance } from "axios";
import { SearchResponse } from "../types/search/search-response";
import { SearchQuery } from "../types/search/search-query";

const apiKey = process.env.REACT_APP_API_KEY;
const baseURL = process.env.REACT_APP_FMP_BASE_URL;

if (!apiKey || !baseURL) {
  throw new Error("Missing environment variables.");
}

const client: AxiosInstance = axios.create({
  baseURL: baseURL,
  headers: { "Content-Type": "application/json" },
});

const searchCompaniesByTicker = async (searchQuery: SearchQuery) => {
  try {
    const { query, limit, exchange } = searchQuery;
    const result = await client
      .get<SearchResponse>("/api/v3/search", {
        params: {
          query,
          limit,
          exchange,
          apikey: apiKey,
        },
      })
      .then((res) => res.data);
    return result;
  } catch (error) {
    console.error("An error occured while fetching companies.");
    throw new Error(
      axios.isAxiosError(error) ? error.message : "An unexpected error occured."
    );
  }
};

export { searchCompaniesByTicker };
