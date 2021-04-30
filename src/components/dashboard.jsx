import React from "react";
import { isEmpty } from "lodash";
import Select from "./common/Select";
import PieChart from "./pieChart";
import OutletOverview from "../components/outletOverview";
import TierOverview from "../components/tierOverview";

var tier1_outlets = ["OUT049", "OUT046", "OUT019"];
var tier2_outlets = ["OUT045", "OUT035", "OUT017"];
var tier3_outlets = ["OUT027", "OUT013", "OUT018", "OUT010"];
class Dashboard extends React.Component {
  state = {
    data: {
      selectedoutletLocation: "",
      selectedoutletIdentifier: "",
      selectedCategory: "",
      itemNumber: "",
      overallSalesOfSelectedOutlet: [],
      overallSalesOfSelectedTier: {},
      itemsInCategory: [],
    },
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

  handleItemsForSelectedCategory = async (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ category: e.currentTarget.value }),
    };
    let response = await fetch("/getitemnoBasedOnCategory", requestOptions);
    response = await response.json();
    data.itemsInCategory = response.data;
    this.setState({ data });
  };

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
            <button class="btn btn-block btn-success"> Search </button>
          </div>
          <div className="col">
            <Select
              name="selectedCategory"
              value={this.state.data.selectedCategory}
              onChange={this.handleItemsForSelectedCategory}
              options={Object.keys(
                this.state.data.overallSalesOfSelectedOutlet
              )}
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
            <button class="btn btn-block btn-success"> Predict </button>
          </div>
        </div>

        {isEmpty(this.state.data.selectedoutletLocation) &&
          isEmpty(this.state.data.selectedoutletIdentifier) && (
            <div className="mt-5">
              <PieChart />
            </div>
          )}
        {!isEmpty(this.state.data.selectedoutletIdentifier) &&
          isEmpty(this.state.data.selectedCategory) && (
            <OutletOverview
              data={this.state.data.overallSalesOfSelectedOutlet}
            />
          )}
        {!isEmpty(this.state.data.selectedoutletLocation) &&
          isEmpty(this.state.data.selectedoutletIdentifier) &&
          isEmpty(this.state.data.selectedCategory) && (
            <TierOverview
              tierLtevelData={this.state.data.overallSalesOfSelectedTier}
              tier={this.state.data.selectedoutletLocation}
            />
          )}
      </div>
    );
  }
}
export default Dashboard;
