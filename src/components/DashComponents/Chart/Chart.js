import React from "react";
import ChartBar from "./ChartBar";
import "./Chart.css";

const Chart = (props) => {
    const dataPointValues = props.dataPoint.map(dataPoint => dataPoint.value);
    const totalMaximum = Math.max(...dataPointValues); //used spread operator to copy array in
                                                       //list to make it list

  return (
    <div className="chart">
      {props.dataPoint.map((dataPoint) => (
        <ChartBar
          key={dataPoint.label}//cuz every chart bar have diff month name 
          value={dataPoint.value}
          maxValue={totalMaximum}
          label={dataPoint.label}
        />
      ))}
    </div>
  );
};

export default Chart;
