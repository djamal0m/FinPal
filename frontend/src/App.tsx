import React, { useState } from "react";
import "./App.css";
import { SearchQuery } from "./types/search/search-query";
import { searchCompaniesByTicker } from "./api/api";

function App() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    query: "",
    limit: 10,
    exchange: "NASDAQ",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState([]);

  const handleClick = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!searchQuery.query.trim()) {
        setError("Query cannot be empty.");
        return;
      }
      //const data = await searchCompaniesByTicker(searchQuery).then((res)=>);
      //setSearchResult(data);
    } catch (error) {}
  };

  return (
    <div className="App">
      <button onClick={(e) => handleClick(e)}>Search</button>
    </div>
  );
}

export default App;
