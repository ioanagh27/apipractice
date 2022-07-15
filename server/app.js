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
    res.send("Where do you want to go on holiday?");
});

app.get("/countries", (req, res) => {
    let countries = data;
    
    if (req.query.isEu === "true") {
        countries = countries.filter(country => country["isEu"])
    } else if (req.query.isEu === "false"){
        countries = countries.filter(country => !country["isEu"])
    }
    res.json({
        countries: countries.map(country => country.name)
    });
});

app.get("/countries/:name", (req, res) => {
    const id = req.params.name;
    const filteredData = data.filter(f => f["name"] == id)

    // Handle errors
    if (filteredData.length == 1) {
        res.json({
            ...filteredData[0]
        })
    } else {
        res.status(404).json({
            error: "Sorry, this country is not in our database"
        })
    }
});

app.get("/currency/:currency", (req, res) => {
    const currency = req.params.currency
    const filteredData = data.filter(country => country.currency == currency)
    if(filteredData.length >= 1) {
        res.json({...filteredData})
    } else {
        res.status(404).json({
            error: "Sorry, no countries have this currency in our database"
        })
    }
})

app.post("/countries", (req, res) => {
    const newCountry = req.body;
    newCountry.id = data.length +1;
    data.push(newCountry);
    res.status(201).json({
        success: true,
        country: newCountry
    })
})

app.delete("/countries/:id", (req, res) => {
    const reqId = req.params.id;
    const entry = data.filter(item => item.id == reqId)[0];
    
    data.splice(reqId - 1, 1);
    
    res.status(204).json({
        success: true,
        removed: {...entry}
    });
})


module.exports = app;    