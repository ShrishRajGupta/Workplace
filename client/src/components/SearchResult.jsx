import React, { useEffect, useState } from "react";
import "../css/SearchResult.css";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({result}) => {
    
    const navigate = useNavigate();
    const [results, setResults] = ([]);
    console.log(result);
           const handleClick = async (e)=>{
                navigate(`/user/profile/${result._id}`)
                
           }
    
    return (
        <div className="search-result" onClick={handleClick} >{result.username}</div>
    )
};
