import React from "react";
import { CompanySearch } from "../../types/company/company";

type Props = {
  company: CompanySearch;
  handleDeleteFromPortfolio: (company: CompanySearch) => void;
};

const PortfolioCard = ({ company, handleDeleteFromPortfolio }: Props) => {
  return (
    <>
      <h4>{company.name}</h4>
      <button onClick={() => handleDeleteFromPortfolio(company)}>x</button>
    </>
  );
};

export default PortfolioCard;
