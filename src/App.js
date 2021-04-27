import React, { useState,useEffect } from 'react';
import { addDays } from 'date-fns';
import {GoogleCharts} from 'google-charts';
import logo from './logo.svg';
import './App.css';
import { DateRangePicker } from 'react-date-range';

function App() {
  let arr = [];
  
  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  }
  
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      key: 'selection'
    }
  ]);
  return (
    
    <div className="App">
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <a class="navbar-brand" href="#">GrocerSmart</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Features</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" href="#">Pricing</a>
            </li>
          </ul>
          <ul class="nav navbar-nav navbar-right ml-auto">
          <li class="nav-item">
              <a class="nav-link" href="#">Kesiya Raj</a>
            </li>
            <li class="nav-item">
            <a class="navbar-brand" href="#">
      <img src="/download.png" alt="" width="30" height="24"/>
    </a>
            </li>
        </ul>
        </div>
      </nav>
      <div class="row container-fluid">
        <div class="col-4">
        <div class="col-12" style={{padding: 10 + 'px'}}>
            <div class="input-group mb-3">
            <div class="input-group-prepend">
              <span class="input-group-text" id="inputGroup-sizing-default">Item Number</span>
            </div>
            <input type="text" class="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
            </div>
          </div>
          <div class="col-12" style={{padding: 10 + 'px'}}>
            <select class="form-select" aria-label="Default select example" >
              <option selected>Select Tier</option>
              <option value="1">Tier 1</option>
              <option value="2">Tier 2</option>
              <option value="3">Tier 3</option>
            </select>
          </div>
          <div class="col-12" style={{padding: 10 + 'px'}}>
            <select class="form-select" aria-label="Default select example">
              <option selected>Select Outlet</option>
              <option value="1">Outlet 1</option>
              <option value="2">Outlet 2</option>
              <option value="3">Otlet 3</option>
            </select>
          </div>
          
          <div class="col-12" style={{padding: 10 + 'px'}}>
            <select class="form-select" aria-label="Default select example">
                <option selected>Select Category</option>
                <option value="1">Grocery</option>
                <option value="2">Beverages</option>
                <option value="3">Drinks</option>
              </select>
          </div>
          <div class="col-12" style={{padding: 10 + 'px'}}>
            <select class="form-select" aria-label="Default select example">
                <option selected>Select Visibilty</option>
                <option value="1">Daily</option>
                <option value="2">Weekly</option>
                <option value="3">Monthly</option>
              </select>
          </div>
        </div>
        <div class="col-8">
          <div class="col-12">
          <DateRangePicker
            onChange={item => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={2}
            ranges={state}
            direction="horizontal"
          />
          </div>
        </div>
      </div>
      <div class="container-fluid">
        <button class="btn btn-block btn-success" onClick={toggleButtonState}> Search </button>
      </div>
      <div class="container-fluid">
      <div id="chart1"></div>

      </div>
      
      
    </div>
  );
  function toggleButtonState(){
    fetch('/getChartDetails').then(res => res.json()).then(data => {
      arr = data.data;
      GoogleCharts.load(drawChart);

    });
    getOutletIdentifierFromTier("Tier 2");
  }
  function getOutletIdentifierFromTier(tierValue){
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ tier: tierValue})
    };
    fetch('/getOutletNumberBasedOnTier',requestOptions).then(res => res.json()).then(data => {
      arr = data.data;
      console.log(arr)
    });
  }
  
  function drawChart() {
 
    // Standard google charts functionality is available as GoogleCharts.api after load
    //const data = GoogleCharts.api.visualization.arrayToDataTable(arr);
    const pie_1_chart = new GoogleCharts.api.visualization.ColumnChart(document.getElementById('chart1'));
    var data = GoogleCharts.api.visualization.arrayToDataTable(arr); 
    var options = {
      width: '100%',
      height: 400,
      legend: { position: 'bottom', maxLines: 3 },
      bar: { groupWidth: '75%' },
      isStacked: true
    };
    pie_1_chart.draw(data,options);
  }
  function handleSelect(date){
    console.log(date); // native Date object
  }
  
  
}

export default App;
