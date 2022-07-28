import "./Dashboard.css";
import { useEffect, useState } from "react";
import axios from "axios";
import Chart from "./Chart";
import MetaData from "../layout/MetaData";
import Sidebar from "./Sidebar.js";
const DashboardChart = () => {
  return (
    <div className="dashboard">
      <MetaData title="Dashboard - Admin Panel" />
      <Sidebar />
      <div className="main-content">
        <div className="main-content-dashboard">
          <h2 className="dashboard-title">Chart</h2>
          <div className="main-content-dashboard-chart">
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"62becc90-f6cc-4580-8465-6bde72e2734e"}
            />
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"895797bc-b147-4021-aced-2e623cc70e0d"}
            />
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"62bece88-d694-400b-8022-a13c4af4ea3e"}
            />
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"62bfde55-7e6a-4438-8cd7-26c53d25dfdb"}
            />
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"5143ad16-f04e-4fe9-afb5-7ca7af338189"}
            />
            <Chart
              height={"400px"}
              width={"640px"}
              chartId={"624a63ec-c1e7-4304-b2fe-760b8b48b51f"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardChart;
