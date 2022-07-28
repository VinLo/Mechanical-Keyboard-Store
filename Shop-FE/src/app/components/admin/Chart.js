import React, { useEffect, useRef, useState } from "react";
import ChartsEmbedSDK from "@mongodb-js/charts-embed-dom";

const Chart = ({ filter, chartId, height, width }) => {
  const sdk = new ChartsEmbedSDK({
    baseUrl: "https://charts.mongodb.com/charts-project-0-mykaf",
  });
  const chartDiv = useRef(null);
  const [rendered, setRendered] = useState(false);
  const [chart] = useState(
    sdk.createChart({
      chartId: chartId,
      height: height,
      width: width,
      theme: "dark",
    })
  );

  // const el = document
  //   .getElementById("data-from")
  //   .addEventListener("change", (e) => {
  //     const date = new Date(e.target.value);
  //     chart.setFilter({ createdAt: { $gte: date } });
  //   });

  useEffect(() => {
    chart
      .render(chartDiv.current)
      .then(() => setRendered(true))
      .catch((err) => console.log("Error during Charts rendering.", err));
  }, [chart]);

  useEffect(() => {
    if (rendered) {
      chart
        .setFilter(filter)
        .catch((err) => console.log("Error while filtering.", err));
    }
  }, [chart, filter, rendered]);

  return (
    <>
      <div style={{ padding: "5px" }} className="chart" ref={chartDiv} />
    </>
  );
};

export default Chart;
