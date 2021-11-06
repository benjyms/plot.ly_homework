
// creating read of the data and printing it to the console
const samples = "static/js/samples.json";

d3.json(samples).then(data => {
    // console.log(data);
});


// creating a function to get the data for the plots and create the plots with over
function getPlots(id) {
    d3.json(samples).then(sampledata => {
        // console.log(sampledata)
        var sample_values = sampledata.samples[0].sample_values;
        // console.log(sample_values);
        var otu_ids = sampledata.samples[0].otu_ids;
        // console.log(otu_ids);
        var otu_labels = sampledata.samples[0].otu_labels;
        // console.log(otu_labels);
        var otu_top = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        // console.log(otu_top);
        var otu_top_labels = otu_labels.slice(0, 10).reverse();
        // console.log(otu_top_labels);
        var otu_top_values = sample_values.slice(0, 10).reverse();
        // console.log(otu_top_values);
        var trace1 = {
            x: otu_top_values,
            y: otu_top,
            text: otu_top_labels,
            type: "bar",
            orientation: "h"
        };
        var data = [trace1];
        var layout = {
            title: "Top 10 OTUs",
            // yaxis: {
            //     autorange: "reversed"
            // },
            height: 500,
            width: 1000
        };
        Plotly.newPlot("bar", data, layout);


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
        var data = [trace2];
        var layout = {
            title: "Bubbles",
            height: 600,
            width: 1200
        };
        Plotly.newPlot("bubble", data, layout);
    });
}


// define selDataset function
function getDemographics(id) {
    d3.json(samples).then(sampledata => {
        // console.log(sampledata)
        var metadata = sampledata.metadata;
        // console.log(metadata);
        var resultArray = metadata.filter(sampleObj => sampleObj.id == id)[0];
        console.log(resultArray);
        var PANEL = d3.select("#sample-metadata");
        PANEL.html("");
        Object.entries(resultArray).forEach(([key, value]) => {
            PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
        }); 
    });
}

function init() {
    // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
    // Use the list of sample names to populate the select options
    d3.json(samples).then((data) => {
        var sampleNames = data.names;
        sampleNames.forEach((sample) => {
            selector
                .append("option")
                .text(sample)
                .property("value", sample);
        });
        // Use the first sample from the list to build the initial plots
        const firstSample = sampleNames[0];
        getPlots(firstSample);
        getDemographics(firstSample);
    });
}

function optionChanged(id) {
    getDemographics(id);
}

init();




