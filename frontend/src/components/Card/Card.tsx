import React from "react";
import { CompanySearch } from "../../types/company/company";

type Props = {
  company: CompanySearch;
};

const Card = ({ company }: Props) => {
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
    </div>
  );
};

export default Card;
