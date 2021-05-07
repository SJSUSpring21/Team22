import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { GoogleCharts } from "google-charts";
import NavBar from "./components/navBar";
import Dashboard from "./components/dashboard";
import Login from "./components/login"
import "./App.css";
import { Route, Link, Switch, Router} from "react-router-dom";

import Predict from "./components/Predict";

function App() {
  let arr = [];

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: "selection",
    },
  ]);

  const [passwords] = useState( [{
    "email":"admin@gmail.com",
    "password": "admin"
  },{
    "email":"vaibhav@gmail.com",
    "password": "Vaibhav135"
  },
  {
    "email":"kesiya@gmail.com",
    "password": "kesiya"
  },
  {
    "email":"sayali@gmail.com",
    "password": "sayali"
  },
  {
    "email":"lekha@gmail.com",
    "password": "lekha"
  }])

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setLoggedIn] = useState(false);

  const onChange =(e) => {
    if(e.target.name === "email"){
      setEmail(e.target.value);
    }else{
      setPassword(e.target.value)
    }
  }

  const onSubmit =(e) => {
    e.preventDefault();

    const userData = {
      email,
      password,
    };
    for (var i=0; i<passwords.length; i++) { 
        if (JSON.stringify(passwords[i]) === JSON.stringify(userData) ) {
                setLoggedIn(true);
         }
   }
}
  return (
    <div className="App">
       
      {isLoggedIn
       ? 
      <React.Fragment>
        <NavBar email={email} isLoggedIn = {isLoggedIn}  setLoggedIn = {setLoggedIn}/> 
       
       <Route exact path="/" component={Dashboard} />
      <Route exact path="/predict" component={Predict} />
</React.Fragment>
      :
      <React.Fragment>
        <NavBar email={email} isLoggedIn = {isLoggedIn} />
        <Login email={email} password={password} onChange={onChange} onSubmit={onSubmit}/>
      </React.Fragment> 
     }
    </div>
  );
  function toggleButtonState() {
    fetch("/getChartDetails")
      .then((res) => res.json())
      .then((data) => {
        arr = data.data;
        GoogleCharts.load(drawChart);
      });
    getOutletIdentifierFromTier("Tier 2");
  }
  function getOutletIdentifierFromTier(tierValue) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: tierValue }),
    };
    fetch("/getOutletNumberBasedOnTier", requestOptions)
      .then((res) => res.json())
      .then((data) => {
        arr = data.data;
        console.log(arr);
      });
  }

  function drawChart() {
    // Standard google charts functionality is available as GoogleCharts.api after load
    //const data = GoogleCharts.api.visualization.arrayToDataTable(arr);
    const pie_1_chart = new GoogleCharts.api.visualization.ColumnChart(
      document.getElementById("chart1")
    );
    var data = GoogleCharts.api.visualization.arrayToDataTable(arr);
    var options = {
      width: "100%",
      height: 400,
      legend: { position: "bottom", maxLines: 3 },
      bar: { groupWidth: "75%" },
      isStacked: true,
    };
    pie_1_chart.draw(data, options);
  }
  function handleSelect(date) {
    console.log(date); // native Date object
  }
}

export default App;
