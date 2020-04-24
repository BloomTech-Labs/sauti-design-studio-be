const server = require("../server");
const request = require("supertest");
const db = require("../database/dbConfig");

describe("ROUTE TESTING", () => {
  beforeAll(async () => {
    return (
      await db.migrate.rollback(),
      await db.migrate.latest(),
      await db.seed.run()
    );
  });

  afterAll(async () => {
    return await db.migrate.rollback();
  });

  describe("should be in testing environment", () => {
    it("should be in testing environment", () => {
      expect(process.env.DB_ENV).toBe("testing");
    });
  });
  describe("Checking server status", () => {
    describe("sanity check", () => {
      it("should return an OK status code from the index route", async () => {
        const expectedStatus = 200;

        const response = await request(server).get("/");

        expect(response.status).toEqual(expectedStatus);
      });
      it("should return an empty object from the index route because database is empty", async () => {
        const expectedBody = {};

        const response = await request(server).get("/");

        expect(response.body).toEqual(expectedBody);
      });
      it("should return a html object from the index route", async () => {
        const response = await request(server).get("/");

        expect(response.type).toEqual("text/html");
      });
    });
  });

});
