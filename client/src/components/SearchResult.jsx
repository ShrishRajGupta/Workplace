import React, { useEffect, useState } from "react";
import "../css/SearchResult.css";
import axios from "axios";
import {Navigate, useNavigate } from "react-router-dom";

export const SearchResult = ({result,onResultClick}) => {
    const [user,setUser] = useState("");
    const navigate = useNavigate();
    
    console.log(result);
           const handleClick = async (e)=>{
                navigate(`/user/profile/${result._id}`)
           }
    
    return (
        <div className="search-result" onClick={handleClick} >{result.username}</div>
    )
};