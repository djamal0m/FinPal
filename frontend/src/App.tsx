import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import "./App.css";
import { SearchQuery } from "./types/search/search-query";
import { searchCompaniesByTicker } from "./api/api";
import { CompanySearch } from "./types/company/company";
import Search from "./components/Search/Search";
import CardList from "./components/Card/CardList";

function App() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    query: "",
    limit: 10,
    exchange: "NASDAQ",
  });
  const [error, setError] = useState<string | null>("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [lastQuery, setLastQuery] = useState("");

  const fetchCompanies = useCallback(async () => {
    const query = searchQuery.query.trim();
    if (!query) {
      setError("Query cannot be empty.");
      return;
    }
    if (query === lastQuery) {
      console.log("Query unchanged. Skipping API call.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchCompaniesByTicker(searchQuery);
      if (data.length > 0) {
        setSearchResult(data);
        setLastQuery(searchQuery.query.trim());
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      setError("An error occured while fetching companies.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, lastQuery]);

  const handleClick = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!isLoading) fetchCompanies();
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery((prev) => ({
      ...prev,
      query: e.target.value,
    }));
  };

  return (
    <div className="App">
      <Search
        handleClick={handleClick}
        handleChange={handleChange}
        query={searchQuery.query}
      />
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && searchResult.length > 0 ? (
        <CardList companies={searchResult} />
      ) : (
        error && <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default App;
