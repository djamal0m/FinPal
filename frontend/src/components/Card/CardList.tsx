import React from "react";
import { CompanySearch } from "../../types/company/company";
import Card from "./Card";

type Props = {
  companies: CompanySearch[];
  onAddToPortfolio: (company: CompanySearch) => void;
};

const CardList = ({
  companies,
  onAddToPortfolio: handleAddToPortfolio,
}: Props) => {
  return (
    <div>
      {companies.length > 0 ? (
        companies.map((company) => (
          <Card
            company={company}
            key={company.symbol}
            handleAddToPortfolio={handleAddToPortfolio}
          />
        ))
      ) : (
        <div>no data to display</div>
      )}
    </div>
  );
};

export default CardList;
