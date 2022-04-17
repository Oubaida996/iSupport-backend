"use strict";
const server = require("../src/server");
const supertest = require("supertest");
const db = require("../src/db/models/index");
const request = supertest(server.app);

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.drop();
});

  describe("testing  personalProgress route", () => {
    it("testing personal progress for each user", async () => {
      let Auth = await request
        .post("/signin")
        .auth(Users[element].username, Users[element].password);
      let userToken = Auth.body.token;
      const response = await request
        .get(`/community/1/personalProgress`)
        .set("Authorization", `Bearer ${userToken}`);
      expect(response.status).toEqual(200);
    });
  });
