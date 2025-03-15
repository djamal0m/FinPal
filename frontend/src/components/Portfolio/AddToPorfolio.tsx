import React from "react";
import { CompanySearch } from "../../types/company/company";

type Props = {
  company: CompanySearch;
  handleAddToPortfolio: (company: CompanySearch) => void;
};

const AddToPortfolio = ({ company, handleAddToPortfolio }: Props) => {
  return (
    <div>
      <button onClick={() => handleAddToPortfolio(company)}>
        Add to portfolio
      </button>
    </div>
  );
};

export default AddToPortfolio;
