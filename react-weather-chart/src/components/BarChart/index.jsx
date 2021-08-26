/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef } from "react";
import { chart } from "./chart";

const BarChart = ({ chartData }) => {
  const chartWrapRef = useRef(null);

  const renderChart = () => {
    chart({ wrapper: chartWrapRef.current, data: chartData });
  };

  useEffect(() => {
    renderChart();
  }, [chartData]);

  return <div ref={chartWrapRef} />;
};

export default BarChart;
