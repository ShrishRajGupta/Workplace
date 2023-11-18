import React from "react";
import "../css/SearchResult.css";
export const SearchResult = ({result}) => {
    return (
        <div className="search-result" onClick={(e)=>alert(`Person with name ${result.name} is clicked!!`)}>{result.name}</div>
    )
};