// Import the app
const app = require('./app.js')

// Start the server

const PORT = 3000

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`)
})