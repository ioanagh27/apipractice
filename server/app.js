const express = require('express');
const cors = require('cors')
let data = require('./data');


// Create express
const app = express();

// Middleware
// Tell the app to listen to JSON bodies on POST requests
app.use(express.json());
// CORS - Add headers to each response, saying we're ok sharing this resource
app.use(cors());

// Set up routes
app.get("/", (req, res) => {
    res.send("welcome to the Ice Ceam API");
});

app.get("/flavours", (req, res) => {
    let flavours = data;
    
    if (req.query.vegan) {
        flavours = flavours.filter(f => f["vegan"])
    }
    res.json({
        flavours: flavours.map(f => f.flavour)
    });
});

app.get("/flavours/:id", (req, res) => {
    const id = req.params.id;
    const filteredData = data.filter(f => f["id"] == id)

    // Handle errors
    if (filteredData.length == 1) {
        res.json({
            flavour: filteredData[0]
        })
    } else {
        res.status(404).json({
            error: "No such ice cream"
        })
    }


});

app.post("/flavours", (req, res) => {
    const newId = data.length + 1;
    const newFlavour = req.body;
    newFlavour.id = newId;
    data.push(newFlavour);
    res.status(201).json({
        success: true
    })
})

app.delete("/flavours/:id", (req,res) => {
    const reqId = req.params.id;
    const entry = data.filter(f => f.id == reqId)[0];
    const index = entry.id;
    
    data.splice(index - 1, 1);
    
    res.status(200).json({
        success: true,
        removed: {...entry}
    });
})


module.exports = app;    