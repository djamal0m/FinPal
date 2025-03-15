import { CompanySearch } from "../../types/company/company";
import { v4 as uuidv4 } from "uuid";
import PortfolioCard from "./PortfolioCard";

type Props = {
  companies: CompanySearch[];
  deleteFromPortfolio: (company: CompanySearch) => void;
};

const PortfolioCardList = ({
  companies,
  deleteFromPortfolio: handleDeleteFromPortfolio,
}: Props) => {
  return (
    <>
      <h3>Portfolio</h3>
      {companies.length > 0 ? (
        companies.map((company) => (
          <PortfolioCard
            company={company}
            key={uuidv4()}
            handleDeleteFromPortfolio={handleDeleteFromPortfolio}
          />
        ))
      ) : (
        <div>Portfolio is empty.</div>
      )}
    </>
  );
};

export default PortfolioCardList;
