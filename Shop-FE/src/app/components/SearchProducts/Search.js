import React, { useState, Fragment } from "react";
import MetaData from "../layout/MetaData";
import "./Search.css";
const Search = ({ history }) => {
  const [keyword, setKeyword] = useState("");
  const searchSubmitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      history.push(`/products/${keyword}`);
    } else {
      history.push("/productsSearch");
    }
  };

  return (
    <Fragment>
      <MetaData title="SEARCH -- PENGUIN" />
      <form className="searchBox" onSubmit={searchSubmitHandler}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm ..."
          onChange={(e) => setKeyword(e.target.value)}
        />
        <input type="submit" value="Search" />
      </form>
    </Fragment>
  );
};

export default Search;
