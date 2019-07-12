const request = require("supertest");
const server = require("./server.js");
// const db = require('../database/dbConfig.js');

// describe("GET", () => {
//   it("should respond with status code 200 OK", async () => {
//     let response = await request(server).get("/");
//     expect(response.status).toEqual(200);
//     // expect(response.body).toEqual("We're live! Please Login.");
//   });
// });

describe('GET', () => {
  it('should return 200', async () => {
    const res = await request(server).get('/home');
    expect(res.status).toBe(200);
  });
});
