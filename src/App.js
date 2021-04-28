import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { GoogleCharts } from "google-charts";
import NavBar from "./components/navBar";
import Dashboard from "./components/dashboard";
import "./App.css";

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
  return (
    <div className="App">
      <NavBar />
      <Dashboard />
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
