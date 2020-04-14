const request = require("supertest");

const server = require("../server.js");

const db = require('../database/dbConfig.js');

//clear and seed testing database
beforeAll(async () => {
	await db.seed.run();
});

//Close worker connection thread
afterAll(async () => {
	await db.destroy();
});

describe("server.js", () => {
  describe("environment", function() {
    it("should set environment to testing", function() {
      expect(process.env.DB_ENV).toBe("testing");
    })
  })
})


// describe("GET", () => {
//   it("should respond with status code 200 OK", async () => {
//     let response = await request(server).get("/");
//     expect(response.status).toEqual(200);
//     // expect(response.body).toEqual("We're live! Please Login.");
//   });
// });

describe('GET ', () => {
  it('should return 200', async () => {
    const res = await request(server).get('/');
    expect(res.status).toBe(200);
  });
  it('should return text', async () =>{
    const res = await request(server).get('/');
    expect(res.type).toBe('text/html')
  })
});

describe('GET /home', () => {
  it('should return 200', async () => {
    const res = await request(server).get('/home');
    expect(res.status).toBe(200);
  });
  it('should return json', async () =>{
    const res = await request(server).get('/home');
    expect(res.type).toBe('application/json')
  })
});

