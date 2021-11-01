// construct url to get data from samples.json
const url = "data\samples.json"

// create promise pending
const dataPromise = d3.json(url)
console.log("Data Promise: ", dataPromise)

// // using d3 to read in the sample.json file
// d3.json("..data\samples.json").then((data) => {
//     console.log(data);
//     console.log(data.names);
//     console.log(data.metadata);
//     console.log(data.samples);
// });

    // // create a variable to hold the data
    // let metadata = data.metadata;
    // // console.log(metadata);

    // // create a variable to hold the data
    // let samples = data.samples;
    // // console.log(samples);

    // // create a variable to hold the data
    // let names = data.names;
    // // console.log(names);

    // // create a variable to hold the data
    // let id = data.id;
    // // console.log(id);

    // // create a variable to hold the data
    // let wfreq = data.wfreq;
    // // console.log(wfreq);

    // // create a variable to hold the data
    // let sample_values = data.sample_values;
    // // console.log(sample_values);

    // // create a variable to hold the data
    // let otu_ids = data.otu_ids;
    // // console.log(otu_ids);

    // // create a variable to hold the data
    // let otu_labels = data.otu_labels;
    // // console.log(otu_labels);

    // // create a variable to hold the data
    // let otu_id = data.otu_id;
    // // console.log(otu_id);

    // // create a variable to hold the data
    // let otu_label = data.otu_label;
    // // console.log(otu_label);

    // // create a variable to hold the data
    // let sample_values = data.sample_values;
    // // console.log(sample_values);

    // // create a variable to hold the data
    // let sample_values = data.sample_values;
    // // console.log(sample_values);

    // // create a variable to hold the data