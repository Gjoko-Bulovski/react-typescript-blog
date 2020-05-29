import React from "react";
import "../Search/Search.css";

type SearchProps = {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ onSubmit, value, onChange }) => {
  return (
    <>
      <form onSubmit={onSubmit} className="blog-search-form">
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder="Search"
          className="blog-search"
        />
        <button type="submit" className="blog-search-btn" title="search">
          <i className="fas fa-search"></i>
        </button>
      </form>
    </>
  );
};

export default Search;
