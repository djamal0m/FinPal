import React, { ChangeEvent, MouseEvent } from "react";

type Props = {
  handleClick: (e: MouseEvent<HTMLButtonElement>) => void;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  query: string;
};

const Search = ({ handleChange, handleClick, query }: Props) => {
  return (
    <div>
      <input type="text" onChange={(e) => handleChange(e)} />
      <button onClick={(e) => handleClick(e)}>Search</button>
    </div>
  );
};

export default Search;
