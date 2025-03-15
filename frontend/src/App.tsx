import { ChangeEvent, MouseEvent, useCallback, useState } from "react";
import "./App.css";
import { SearchQuery } from "./types/search/search-query";
import { searchCompaniesByTicker } from "./api/api";
import { CompanySearch } from "./types/company/company";
import Search from "./components/Search/Search";
import CardList from "./components/Card/CardList";
import PortfolioCardList from "./components/Portfolio/PortfolioCardList";

function App() {
  const [searchQuery, setSearchQuery] = useState<SearchQuery>({
    query: "",
    limit: 10,
    exchange: "NASDAQ",
  });
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([]);
  const [lastQuery, setLastQuery] = useState("");
  const [portfolioValues, setPortfolioValues] = useState<CompanySearch[]>([]);

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
        setLastQuery(query);
      } else {
        setSearchResult([]);
      }
    } catch (error) {
      setError("An error occured while fetching companies.");
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, lastQuery]);

  const handleSearchSubmit = async (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    if (!isLoading) fetchCompanies();
  };

  const handleSearchQueryChange = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setSearchQuery((prev) => ({
      ...prev,
      query: e.target.value,
    }));
  };

  const handleAddToPortfolio = (company: CompanySearch) => {
    setPortfolioValues((prevPortfolioValues) => {
      // check if company already in portfolio
      if (prevPortfolioValues.some((c) => c.symbol === company.symbol))
        // TODO: alert user
        return prevPortfolioValues;
      return [...portfolioValues, company];
    });
  };

  const handleDeleteFromPortfolio = (company: CompanySearch) => {
    setPortfolioValues((prev) =>
      prev.filter((c) => c.symbol !== company.symbol)
    );
  };

  return (
    <div className="App">
      <Search
        onSearchSubmit={handleSearchSubmit}
        onSearchQueryChange={handleSearchQueryChange}
      />
      <PortfolioCardList
        companies={portfolioValues}
        deleteFromPortfolio={handleDeleteFromPortfolio}
      />
      <div style={{ marginBottom: "150px" }}></div>
      {isLoading && <h2>Loading...</h2>}
      {!isLoading && searchResult.length > 0 ? (
        <CardList
          companies={searchResult}
          onAddToPortfolio={handleAddToPortfolio}
        />
      ) : (
        error && <p style={{ color: "red" }}>{error}</p>
      )}
    </div>
  );
}

export default App;
