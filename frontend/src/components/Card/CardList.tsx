import React from "react";
import { CompanySearch } from "../../types/company/company";
import Card from "./Card";

type Props = {
  companies: CompanySearch[];
};

const CardList = ({ companies }: Props) => {
  return (
    <div>
      {companies.length > 0 ? (
        companies.map((company) => (
          <Card key={company.symbol} company={company} />
        ))
      ) : (
        <div>no data to display</div>
      )}
    </div>
  );
};

export default CardList;
