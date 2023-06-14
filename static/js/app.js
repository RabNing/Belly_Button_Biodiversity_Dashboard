// Get the sample json:
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
  
// function that contains instructions at page load/refresh
// function does not run until called
function init(){

  // Initialized the page with a dropdown menu and 3 graphics for id=940
  // Dropdown menu: put the name array in tag select using javascript
  var select = document.getElementById("selDataset");
  var options = data.names;

  for(var i = 0; i < options.length; i++) {
      var opt = options[i];
      var el = document.createElement("option");
      el.textContent = opt;
      el.value = opt;
      select.appendChild(el);
  }}
  init();    

  //Show initial Demo info of id=940
  let EN940 = Object.entries(data.metadata[0]);
  //append each pair to the h5 child list of sample-metadata id
  EN940.forEach(([key,value]) => {
  d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
  });

  //Show initial bar chart of id=940
  let trace940 = [{
    x: data.samples[0].sample_values.slice(0,10).reverse(),
    y: data.samples[0].otu_ids.slice(0,10).map((otu_ids) => `OTU ${otu_ids}`).reverse(),
    text: data.samples[0].otu_labels.slice(0,10).reverse(),
    type: 'bar',
    marker: {
      width: 50},
    orientation: "h"
  }];  
  // Use Plotly to plot the chart
  Plotly.newPlot('bar', trace940);

  //Show bubble bar chart of id=940
  let traceB940 = [{
    x: data.samples[0].otu_ids,
    y: data.samples[0].sample_values,
    text: data.samples[0].otu_labels,
    mode: 'markers',
    marker:{
      size: data.samples[0].sample_values,
      color: data.samples[0].otu_ids,
    }
  }];
  // Use Plotly to plot the bubble chart
  Plotly.newPlot("bubble", traceB940);  
  })

// function that runs whenever the dropdown is changed
d3.selectAll("#selDataset").on("change", updateDB);

// This function is called when a dropdown menu item is selected
function updateDB() {
  // Fetch the JSON data and console log it
  d3.json(url).then(function(data){
  // console.log(data);  
  // Use D3 to select the dropdown menu
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let newID = dropdownMenu.property("value");

  //Item 1: Print the id's Demo Info
    // Assign metadata objects to an array
    let metadataArray = data.metadata;
    // Filter the metadata object matchs the dropdown selected id
    let newOJ = metadataArray.filter((i) => i.id == newID);
    // Get the key-value pair format of the first filtered object
    let newEN = Object.entries(newOJ[0]);
    // console.log(newEN);

    //Clear the previous selected id
    d3.select("#sample-metadata").text("");
    //append each pair to the h5 child list of sample-metadata id
    newEN.forEach(([key,value]) => {
    d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });

  //Item 2: Print the Bar chart
    // Assign sample objects to an array
    let sampleArray = data.samples;
    //Filter the sample object matchs the dropdown selected id
    let newSA = sampleArray.filter((i) => i.id == newID);

    // Barchart of the top 10 otus of the first filtered object
    let trace =[{ 
      x: newSA[0].sample_values.slice(0,10).reverse(),
      y: newSA[0].otu_ids.slice(0,10).map((otu_ids) => `OTU ${otu_ids}`).reverse(),
      text: newSA[0].otu_labels.slice(0,10).reverse(),
      type: 'bar',
      orientation: "h"
    }];
    // Use Plotly to plot the bar chart
    Plotly.newPlot('bar', trace);

  //Item 3: Pint the bubble chart
    let traceB = [{
      x: newSA[0].otu_ids,
      y: newSA[0].sample_values,
      text: newSA[0].otu_labels,
      mode: 'markers',
      marker:{
        size: newSA[0].sample_values,
        color: newSA[0].otu_ids,
      }
    }];
    // Use Plotly to plot the bubble chart
    Plotly.newPlot("bubble", traceB);
  })
}