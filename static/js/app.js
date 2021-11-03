const samples = "static/js/samples.json";

d3.json(samples).then(data => {
    console.log(data);
});

function getPlots(id) {
    d3.json(samples).then(sampledata => {
        console.log(sampledata)
        var sample_values = sampledata.samples[0].sample_values;
        console.log(sample_values);
        var otu_ids = sampledata.samples[0].otu_ids;
        console.log(otu_ids);
        var otu_labels = sampledata.samples[0].otu_labels;
        console.log(otu_labels);
        var otu_top = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        console.log(otu_top);
        var otu_top_labels = otu_labels.slice(0, 10).reverse();
        console.log(otu_top_labels);
        var otu_top_values = sample_values.slice(0, 10).reverse();
        console.log(otu_top_values);
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

        // var trace2 = {
        //     x: otu_top,
        //     y: otu_top_values,
        //     text: otu_top_labels,
        //     type: "bar",
        //     orientation: "v"
        // };
        // var data = [trace2];
        // var layout = {
        //     title: "Top 10 OTUs",
        //     xaxis: {
        //         autorange: "reversed"
        //     },
        //     height: 500,
        //     width: 1000
        // };
        // Plotly.newPlot("bar2", data, layout);

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



function getDemographics() {
    d3.json(samples).then(sampledata => {
        console.log(sampledata)
        var metadata = sampledata.metadata;
        console.log(metadata);
        var panel = d3.select("#sample-metadata");
        panel.html("");
        Object.entries(metadata).forEach(([key, value]) => {
            panel.append("h6").text(`${key}: ${value}`);
        });
    });
}

function init() {
    getPlots(940);
    getDemographics(940);
}

function optionChanged(id) {
    getPlots(id);
    getDemographics(id);
}

init();




