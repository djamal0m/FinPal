import React from "react";
import { CompanySearch } from "../../types/company/company";
import AddToPortfolio from "../Portfolio/AddToPorfolio";

type Props = {
  company: CompanySearch;
  handleAddToPortfolio: (company: CompanySearch) => void;
};

const Card = ({ company, handleAddToPortfolio }: Props) => {
  return (
    <div className="card">
      <img alt="Company Logo" />
      <div className="details">
        <h2>
          {company.name} - {company.symbol}
        </h2>
        <p>{company.currency}</p>
      </div>
      <p>
        {company.exchangeShortName} - {company.stockExchange}
      </p>
      <AddToPortfolio
        company={company}
        handleAddToPortfolio={handleAddToPortfolio}
      />
    </div>
  );
};

export default Card;
