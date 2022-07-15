const request = require("supertest");

const app = require('../app');

describe("API", () => {

    let api;

    beforeAll(() => {
        // We start a version of the API that we can test on
        api = app.listen(3030);
    })
    // done - callback from jest to confirm the tests are finished (not totally necessary here)
    afterAll((done) => {
        api.close(done);
    })

    it("Responds to a GET requrest at / with a 200 status", (done) => {
        request(api).get("/").expect(200, done);
    })

    it("Responds to a GET requrest at /countries with a 200 status", (done) => {
        request(api).get("/countries").expect(200, done);
    })

    it("Responds to a GET requrest at /countries with a JSON object", (done) => {
        request(api).get("/countries").expect("Content-Type", /json/, done);
    })

    it("Filters the countries at a GET request at /countries/?isEu=true and returns the JSON object", (done) => {
        request(api).get("/countries/?isEu=true").expect("Content-Type", /json/, done);
    })
    
    it("Filters the countries at a GET request at /countries/?isEu=false and returns the JSON object", (done) => {
        request(api).get("/countries/?isEu=false").expect("Content-Type", /json/, done);
    })
    
    it("Responds to a GET requrest at /countries/:name with a 200 status", (done) => {
        request(api).get("/countries/England").expect(200, done);
    })
        
    it("Responds to an incorrect GET requrest at /countries/:name with a 404 status", (done) => {
        request(api).get("/countries/Engasdfasdfadsfland").expect(404, done);
    })
            
    it("Responds to an incorrect POST requrest at /countries/ with a 404 status", (done) => {
        request(api).post("/countries/", (err, res) => {
            expect(201, done)
        })
    })

})