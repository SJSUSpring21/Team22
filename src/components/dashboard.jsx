import React from "react";
import { isEmpty } from "lodash";
import Select from "./common/Select";
import PieChart from "./pieChart";
import OutletOverview from "../components/outletOverview";
import Autocomplete from 'react-autocomplete'
import Table from 'react-bootstrap/Table'
import Itemsales from "../components/itemsales";
import TierOverview from "../components/tierOverview";
import CategoryView from "../components/CategoryView";

var tier1_outlets = ["OUT049", "OUT046", "OUT019"];
var tier2_outlets = ["OUT045", "OUT035", "OUT017"];
var tier3_outlets = ["OUT027", "OUT013", "OUT018", "OUT010"];
const tableData = [{
  "id": "1",
  "name": "Ghost in The Wires",
  "author": "Kevin Mitnick",
  "released": "08/15/2011"
},
{
  "id": "2",
  "name": "Console Wars",
  "author": "Blake J. Harris",
  "released": "05/13/2014"
},
{
  "id": "3",
  "name": "The Phoenix Project",
  "author": "Gene Kim, Kevin Behr, George Spafford",
  "released": "12/01/2017"
}]
var categories = [
  "Snack Foods",
  "Fruits and Vegetables",
  ,
  "Household",
  "Frozen Foods",
  "Dairy",
  "Baking Goods",
  "Canned",
  "Meat",
  "Health and Hygiene",
  "Soft Drinks",
  "Others",
  "Breads",
  "Breakfast",
  "Hard Drinks",
  "Seafood",
  "Starchy Foods",
];
class Dashboard extends React.Component {
  state = {
    data: {
      selectedoutletLocation: "",
      selectedoutletIdentifier: "",
      selectedCategory: "",
      itemNumber: "",
      overallSalesOfSelectedOutlet: [],
      overallSalesOfSelectedTier: {},
      overallSalesOfSelectedCategory: {},
      itemsInCategory: [],
    },
    value: '',
    itemIdentifier : [],
    tableData : [],
    itemsalesData : []
  };
  baseState = { ...this.state };

  handleOutletChangeFetchCategories = async (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ outlet: e.currentTarget.value }),
    };
    let response = await fetch("/getOutletOverview", requestOptions);
    response = await response.json();
    data.overallSalesOfSelectedOutlet = response;
    this.setState({ data });
  };
  
  searchData = async (e) => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "Item_no":this.state.value,
        "category" :this.state.data.selectedCategory,
         "outlet" : this.state.data.selectedoutletIdentifier
      }),
    };
    let response = await fetch("/getitemdetailbasedOnitem", requestOptions);
    response = await response.json();
    console.log(response)
    let tableData = response.data
    this.setState({tableData})
  }
  searchsData = async(e) =>{
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        "Item_no":this.state.value,
      }), 
    };
    let response = await fetch("/compareitemsalesacrossoutlets", requestOptions);
    response = await response.json();
    let itemsalesData =  [
      ['Outlet','Sales' ]
    ]
    for(let i=0;i<response.data.length;i++){
      let arr = [];
      arr.push(response.data[i].Outlet);
      arr.push(response.data[i].Sales);
      itemsalesData.push(arr)
    }
    this.setState({itemsalesData})
  }
 
  handleTierlevelData = async (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ tier: e.currentTarget.value }),
    };
    let response = await fetch("/getTierLevelOverview", requestOptions);
    response = await response.json();
    let arr = [];
    for(let i=0;i<response.data.length;i++){
      let obj = {};
      obj["id"] = i;
      obj["label"] = response.data[i]
      arr.push(obj);
    }
    data.itemsInCategory = arr
    this.setState({ data });
  };

  handleSelect = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    data.overallSalesOfSelectedTier = response;
    this.setState({ data });
  };
  handleOutletIdentifier = () => {
    const data = { ...this.state.data };
    if (data.selectedoutletLocation === "Tier 1") {
      return tier1_outlets;
    } else if (data.selectedoutletLocation === "Tier 2") {
      return tier2_outlets;
    } else if (data.selectedoutletLocation === "Tier 3") {
      return tier3_outlets;
    } else {
      return [...tier1_outlets, ...tier2_outlets, ...tier3_outlets];
    }
  };

  handleCategoryLevelData = async (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        outlet: this.state.data.selectedoutletIdentifier,
        category: e.currentTarget.value,
      }),
    };
    let response = await fetch("/getItemFatContent", requestOptions);
    response = await response.json();
    console.log(response);
    data.overallSalesOfSelectedCategory = response;
    this.setState({ data });
  };

  render() {
    const outletTypes = ["Tier 1", "Tier 2", "Tier 3"];
    return (
      <div>
        <div className="row container-fluid col-12">
          <div className="col">
            <Select
              name="selectedoutletLocation"
              value={this.state.data.selectedoutletLocation}
              onChange={this.handleTierlevelData}
              options={outletTypes}
              default="Select Tier"
            />
            <Select
              name="selectedoutletIdentifier"
              value={this.state.data.selectedoutletIdentifier}
              onChange={this.handleOutletChangeFetchCategories}
              options={this.handleOutletIdentifier()}
              default="Select Outlet"
            />
            <button class="btn btn-block btn-success" onClick={this.searchData}> Search </button>
            
          </div>
          <div className="col">
            <Select
              name="selectedCategory"
              value={this.state.data.selectedCategory}
              onChange={this.handleCategoryLevelData}
              options={Object.keys(
                this.state.data.overallSalesOfSelectedOutlet
              )}
              default="Select category"
            />
            <div class="input-group my-3">
             <Autocomplete style="width:100%"
              items={this.state.data.itemsInCategory}
              shouldItemRender={(item, value) => item.label.toLowerCase().indexOf(value.toLowerCase()) > -1}
              getItemValue={item => item.label}
              renderItem={(item, highlighted) =>
                <div key={item.id} style={{ backgroundColor: highlighted ? '#eee' : 'transparent'}}>{item.label}</div>
              }
              value={this.state.value}
              onChange={e => this.setState({ value: e.target.value })}
              onSelect={value => this.setState({ value })}
            />
            </div>
            <button class="btn btn-block btn-success"> Predict </button>
            
          </div>
        </div>
        
        {isEmpty(this.state.data.selectedoutletLocation) && isEmpty(this.state.data.selectedoutletIdentifier) && isEmpty(
          this.state.tableData) && (
            <div className="mt-5">
              <PieChart />
            </div>
        )}
        {!isEmpty(this.state.data.selectedoutletIdentifier) && isEmpty(this.state.tableData) && (
          <OutletOverview data={this.state.data.overallSalesOfSelectedOutlet} />
        )}
       {!isEmpty(this.state.data.selectedoutletLocation) &&
          isEmpty(this.state.data.selectedoutletIdentifier) &&
          isEmpty(this.state.data.selectedCategory) && (
            <TierOverview
              tierLtevelData={this.state.data.overallSalesOfSelectedTier}
              tier={this.state.data.selectedoutletLocation}
            />
          )}

        {!isEmpty(this.state.tableData) && (
          <div className="row mt-5 container-fluid">
        
            <button class="btn btn-success" onClick={this.searchsData}> Compare item sales across Outlets </button>
            
            <Table striped bordered hover variant="dark">
          <thead>
            <tr>
              <th>Fat Content</th>
              <th>Item Identifier</th>
              <th>MRP</th>
              <th>Outlet Sales</th>
              <th>Item Type</th>
              <th>Item Visibility</th>
              <th>Item Weight</th>
              <th>Outlet Estd Year</th>
              <th>Outlet Identifier</th>
              <th>Outlet Location Type</th>
              <th>Outlet Size</th>
              <th>Outlet Type</th>
            </tr>
          </thead>
          <tbody>
            
          {this.state.tableData.map((value, index) => {
                return <tr>
                <td>{value.Item_Fat_Content}</td>
                <td>{value.Item_Identifier}</td>
                <td>{value.Item_MRP}</td>
                <td>{value.Item_Outlet_Sales}</td>
                <td>{value.Item_Type}</td>
                <td>{value.Item_Visibility}</td>
                <td>{value.Item_Weight}</td>
                <td>{value.Outlet_Establishment_Year}</td>
                <td>{value.Outlet_Identifier}</td>
                <td>{value.Outlet_Location_Type}</td>
                <td>{value.Outlet_Size}</td>
                <td>{value.Outlet_Type}</td>
              </tr>
                
              })}
          </tbody>
        </Table>
          </div>
          
        )}
        {!isEmpty(this.state.itemsalesData) && (
          <Itemsales data={this.state.itemsalesData} />
        )}
      </div>     
  

   
  
          )};
       
        }
      
export default Dashboard;
