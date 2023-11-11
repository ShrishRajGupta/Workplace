import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router';

import {Profile,FriendsList} from './profile';
import "../css/userdashboard.css";
const home="http://localhost:3001";

// @desc    User dashboard
// @route   GET /in/:username/dashboard

const Dashboard = () => {
  // use-states
  const [user, setUser] = useState(null);
  const { username } = useParams();

  const getUser = async()=>{
    const response = await fetch(`${home}/in/${username}`,{
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      // credentials: "include",
    });
    const data = await response.json();
    setUser(data);
  }

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <div style={{display: "flex"}}>
      <div className="dashboard">
        <p> </p>
        <Profile user={user} />
      </div>
      <div style={{marginTop:"25px"}}>
      <FriendsList />
      </div>
    
    </div>
  );
};

export default Dashboard;

/*
Search bar 
import * as React from "react";
import { View, SearchForm, TextInput } from "react-native";
import { useSearchParams } from "react-router-native";

function App() {
  let [searchParams, setSearchParams] = useSearchParams();
  let [query, setQuery] = React.useState(
    searchParams.get("query")
    );

  function handleSubmit() {
    setSearchParams({ query });
  }
  
  return (
    <View>
      <SearchForm onSubmit={handleSubmit}>
        <TextInput value={query} onChangeText={setQuery} />
      </SearchForm>
    </View>
  );
}
*/



// const ll=this.props.match.params.id;
// console.log(ll);

// useEffect(() => {
//    fetch(`${home}/in/${username}/dashboard`)
//       .then((res) => res.json())
//       .then((data) => {
//          console.log(data);
//          setData(data);
//       })
//       .catch((err) => {
//          console.log(err.message);
//       });
// }, []);