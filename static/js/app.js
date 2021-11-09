// creating read of the data and printing it to the console
const buttons = "static/js/samples.json";

    d3.json(buttons).then(data => {
        // console.log(data);
    });

// define selDataset function
function getDemographics(id) {

    // read the json file to get the data
    d3.json(buttons).then((data) => {
        // console.log(sampledata)
         
        // read the data for the demographic info
        var metadata = data.metadata;
        // console.log(metadata);
        
        // filter the metadata info by id
        var resultArray = metadata.filter(idobject=> idobject.id == id); 
         
        
        var result = resultArray[0];
        

        // select the demographic panel to put the info
        var PANEL = d3.select("#sample-metadata");

        // clear the demographic panel each time before appending new info
        PANEL.html("");

        // loop through the resultArray and append the info to the demographic panel
        Object.entries(result).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        }); 
    });
}

// creating a function to get the data for the plots and create the plots with over
function getPlots(id) {
    d3.json(buttons).then(sampledata => {
        // console.log(sampledata)
        // console.log(id);
        
        var resultArray = sampledata.samples.filter((idobject)=> idobject.id == id);
        var result = resultArray[0];

        // read the data for the plots
        var sample_values = result.sample_values;
        // console.log(sample_values);

        // capture all id's for the plots
        var otu_ids = result.otu_ids;
        console.log(otu_ids);

        // capture all labels for the plots
        var otu_labels = result.otu_labels;
        // console.log(otu_labels);

        // capture the top 10 otu_ids
        var otu_top = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // console.log(otu_top);

        // capture the top 10 otu_labels
        var otu_top_labels = otu_labels.slice(0, 10).reverse();
        // console.log(otu_top_labels);

        // capture the top 10 sample_values
        var otu_top_values = sample_values.slice(0, 10).reverse();
        // console.log(otu_top_values);
        
        
        var trace1 = {
            x: otu_top_values,
            y: otu_top,
            text: otu_top_labels,
            marker: {
                color: 'blue'},
            type: "bar",
            orientation: "h"
        };
    
        // create the data variable
        var data1 = [trace1];

        // create the layout variable
        var layout1 = {
            title: "Top 10 OTUs",
            yaxis: {
                tickmode: "linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30
            }
    };

    // create the bar chart
    Plotly.newPlot("bar", data1, layout1);

        // create the bubble chart
        var trace2 = {
            x: otu_ids,
            y: sample_values,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids
            },
            text: otu_labels
        };
        
        // create layout variable
        var layout2 = {
            title: "OTU ID",
            height: 600,
            width: 1200
        };

        // create the data variable
        var data2 = [trace2];
        
Plotly.newPlot("bubble", data2, layout2);
    
    });
    
}

// create the function for the change event
function optionChanged(id) {
    console.log(id); 
    getPlots(id);    
    getDemographics(id);
}


// create a function for the initial data to be displayed
function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // console.log(selector);

    // read the json file to get the data
    d3.json(buttons).then((data) => {
        console.log(data);

        // populate the dropdown menu with the id's
        var sampleNames = data.names;
        sampleNames.forEach((name) => {
            selector.append("option").text(name).property("value", name);
        });

        // Use the first sample from the list to build the initial plots
        var firstID = data.names[0];
        getPlots(firstID);
        getDemographics(firstID);
    });
}




// Initialize the dashboard
init();




