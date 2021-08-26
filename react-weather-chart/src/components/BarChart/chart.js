import * as d3 from "d3";

export const chart = ({ wrapper, data }) => {
  const width = 800;
  const height = 500;
  const margin = {
    left: 25,
    top: 25,
  };
  const calculatedHeight = height - 50 - margin.top;

  const svg = d3
    .select(wrapper)
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .style("background", "white")
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  // scales
  const x = d3
    .scaleBand()
    .range([0, 700], 0.1)
    .padding(0.3)
    .domain(data.map((d) => d.xValue));

  const y = d3
    .scaleLinear()
    .range([calculatedHeight, 0])
    .domain([0, d3.max(data, (d) => d.yValue)]);

  // axes
  const xAxis = d3
    .axisBottom()
    .scale(x)
    .tickFormat((d) => `${d}h`);

  const yAxis = d3
    .axisLeft()
    .scale(y)
    .ticks(5)
    .tickSize(-width)
    .tickFormat((d) => `${d}°C`);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr(
      "transform",
      "translate(" + margin.left + ", " + calculatedHeight + ")"
    )
    .style("font-size", "12px")
    .style("font-weight", "bold")
    .style("color", "black")
    .style("cursor", "pointer")
    .call(xAxis)
    .call((g) => g.select(".domain").remove());

  svg
    .append("g")
    .attr("class", "y axis")
    .attr("transform", "translate(" + margin.left + ",0)")
    .call(yAxis)
    .style("font-size", "12px")
    .style("font-weight", "normal")
    .style("color", "black")
    .call((g) => g.select(".domain").remove())
    .call((g) => g.selectAll(".tick line").style("stroke", "#BBBCBE"));

  // bars
  svg
    .selectAll("rect")
    .data(data)
    .enter()
    .append("rect")
    .style("fill", "lightblue")
    .attr("x", (d) => x(d.xValue) + margin.left)
    .attr("y", (d) => y(d.yValue))
    .attr("height", (d) => calculatedHeight - y(d.yValue))
    .attr("width", x.bandwidth());
};
