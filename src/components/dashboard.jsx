import Select from "./common/Select";
import PieChart from "./pieChart";
import { DateRangePicker } from "react-date-range";
import React, { useState, useEffect } from "react";
import { addDays } from "date-fns";
import { isEmpty } from "lodash";

var tier1_outlets = ["OUT049", "OUT046", "OUT019"];
var tier2_outlets = ["OUT045", "OUT035", "OUT017"];
var tier3_outlets = ["OUT027", "OUT013", "OUT018", "OUT010"];
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
      outletLocation: "",
      outletIdentifier: "",
      category: "",
      itemNumber: "",
    },
    time: {
      startDate: new Date(),
      endDate: addDays(new Date(), 4),
      // key: "selection",
    },
  };

  // var selectionRange = {
  //   startDate: new Date(),
  //   endDate: new Date(),
  //   key: "selection",
  // };

  handleSelect = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };
  handleOutletIdentifier = () => {
    const data = { ...this.state.data };
    if (data.outletLocation === "Tier 1") {
      return tier1_outlets;
    } else if (data.outletLocation === "Tier 2") {
      return tier2_outlets;
    } else if (data.outletLocation === "Tier 3") {
      return tier3_outlets;
    } else {
      return [...tier1_outlets, ...tier2_outlets, ...tier3_outlets];
    }
  };
  render() {
    const outletTypes = ["Tier 1", "Tier 2", "Tier 3"];
    return (
      <div>
        <div className=" row container-fluid col-12">
          <div className="col-4">
            <Select
              name="outletLocation"
              value={this.state.data.outletLocation}
              onChange={this.handleSelect}
              options={outletTypes}
              default="Select Tier"
            />
            <Select
              name="outletIdentifier"
              value={this.state.data.outletIdentifier}
              onChange={this.handleSelect}
              options={this.handleOutletIdentifier()}
              default="Select Outlet"
            />
            <Select
              name="category"
              value={this.state.data.category}
              onChange={this.handleSelect}
              options={categories}
              default="Select category"
            />
            <div class="input-group my-3">
              <div class="input-group-prepend">
                <span class="input-group-text" id="inputGroup-sizing-default">
                  Item Number
                </span>
              </div>
              <input
                type="text"
                class="form-control"
                aria-label="Default"
                aria-describedby="inputGroup-sizing-default"
              />
            </div>
            <button class="btn btn-block btn-success"> Search </button>
          </div>
          {/* <div class="col-8"></div> */}
        </div>

        {isEmpty(this.state.data.outletLocation) && <PieChart />}
      </div>
    );
  }
}
export default Dashboard;
