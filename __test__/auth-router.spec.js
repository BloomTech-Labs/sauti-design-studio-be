const server = require("../server");
const request = require("supertest");
const db = require("../database/dbConfig");

//Clear and seed testing database
beforeAll(async () => {
    await db.migrate.rollback(),
    await db.migrate.latest(),
	await db.seed.run();
});

describe("USER ROUTES", () => {
    
    describe("should insert provided user into the database", () => {
      it("POST auth//okta/register", async () => {
        await request(server)
          .post("/auth/okta/register")
          .send({
            firstName: "TESTUSER4",
            lastName: "TESTUSER4",
            email: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@TEST.COM",
            login: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15) + "@TEST.COM",
            credentials: { password: { value: "ANIMALSaregood4" } },
          })
          .then(res => {
            expect(res.status).toBe(201);
          });
      });
      it("insert a new user with duplicate user and throw an error", async () => {
          await request(server)
          .post("/auth/okta/register")
          .send({
            firstName: "TESTUSER4",
            lastName: "TESTUSER4",
            email: "TESTUSER4@TEST.COM",
            login: "TESTUSER4@TEST.COM",
            credentials: { password: { value: "ANIMALSaregood4" } },
          })
          .then(res => {
            expect(res.status).toBe(400);
          });
      })
    });
  });