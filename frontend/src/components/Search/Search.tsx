import React, { ChangeEvent, MouseEvent } from "react";

type Props = {
  onSearchSubmit: (e: MouseEvent<HTMLButtonElement>) => void;
  onSearchQueryChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Search = ({
  onSearchQueryChange: handleSearchChange,
  onSearchSubmit: handleSearchSubmit,
}: Props) => {
  return (
    <div>
      <input type="text" onChange={(e) => handleSearchChange(e)} />
      <button onClick={(e) => handleSearchSubmit(e)}>Search</button>
    </div>
  );
};

export default Search;
