// @TODO: YOUR CODE HERE!
// Define SVG area dimensions
var svgWidth = window.innerWidth;
var svgHeight = window.innerHeight;

// Define the chart's margins as an object
var chartMargin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 50
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;


// Select body, append SVG area to it, and set the dimensions
var svg = d3.select("#scatter ")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

  // Append a group to the SVG area and shift ('translate') it to the right and to the bottom
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from health data
d3.csv("assets/data/data.csv").then(function(trendsData) {

  console.log(trendsData);

  // Cast each poverty and obesity using the unary + operator
  trendsData.forEach(function(data) {
    data.obesity = +data.obesity;
    data.poverty = +data.poverty;
    console.log("State:", data.abbr);
    console.log("Obesity:", data.obesity);
    console.log("Poverty:", data.poverty);
  });
  // Create a linear scale for the horizontal axis.
  var xLinearScale = d3.scaleLinear()
    .domain([0, d3.max(trendsData, d => d.poverty)])
    .range([0, chartWidth]);

  // Create a linear scale for the vertical axis.
  var yLinearScale = d3.scaleLinear()
    .domain([0, d3.max(trendsData, d => d.obesity)])
    .range([chartHeight, 0]);

  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xLinearScale);
  var leftAxis = d3.axisLeft(yLinearScale).ticks(10);

  // Append two SVG group elements to the chartGroup area,
  // and create the bottom and left axes inside of them
  chartGroup.append("g")
    .call(leftAxis);

  chartGroup.append("g")
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(bottomAxis);


  // log a list of states
  var states = trendsData.map(data => data.abbr);
  console.log("state:", states);

  chartGroup.selectAll(".stateCircle")
    .data(trendsData)
    .enter()
    .append("circle")
    .attr("class", "stateCircle")
    .attr("cx", d => xLinearScale(d.poverty))
    .attr("cy", d => yLinearScale(d.obesity))
    .attr("r", 12)
    .text();

  chartGroup.selectAll('.stateText')
  	.data(trendsData)
  	.enter()
  	.append('text')
  	.attr("class", "stateText")
  	.text(d=>d.abbr)
  	.attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.obesity)+6)

    //axis labels
  chartGroup.append("text")
    .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + chartMargin.top + 20})`)
    .classed("aText", true)
    .text("In Poverty (%)");

  chartGroup.append("text")
    .attr("y", 0 - (chartMargin.left/2))
    .attr("x",0 - (chartHeight / 2))
    .attr("transform", "rotate(-90)")
    .classed("aText", true)
    .text("Obesity (%)");

}).catch(function(error) {
  console.log(error);
});

//"C:\Users\nowla\Documents\DU_Bootcamp\HW\D3-Challenge\D3_data_journalism\assets\data\data.csv"