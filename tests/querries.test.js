import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
import { before, beforeEach } from "mocha";
import QueryModel from "../src/models/queryModel";
import User from "../src/models/user";
import { generateToken } from "../src/helpers/jwtFunctions.js";

use(chaiHttp);

describe("QUERY END-POINT TESTING", () => {
  let token = null;
  let query = null;

  before(async () => {
    try {
      //save an article
      query = new QueryModel({
        description: "hello",
        location: "kigali",
      });
      await query.save();

      //get a token
      token = await generateToken(query._id);
    } catch (error) {
      console.log(error);
    }
  });

  describe("GET QUERY END-POINT TESTING", () => {
    it("Should retrieve all querries", async () => {
      const res = await request(app)
        .get("/api/v1/querries/")
        .set("Authorization", token);
      expect(res).to.have.status([200]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not retrieve the querries", async () => {
      const res = await request(app)
        .get("/api/v1/querri/")
        .set("Authorization", token);
      expect(res).to.have.status([404]);
    });

    it("Should not retrieve all querries without authentication", async () => {
      const res = await request(app).get("/api/v1/querries/");
      expect(res).to.have.status([401]);
      expect(res.type).to.have.equal("application/json");
    });
  });

  describe("CREATE QUERY END-POINT TESTING", async () => {
    it("Should create a querry", async () => {
      const res = await request(app)
        .post("/api/v1/querries/")
        .send({ description: "hello", location: "kigali" });
      expect(res).to.have.status([201]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not create a query without description", async () => {
      const res = await request(app)
        .post("/api/v1/querries/")
        .send({ location: "kigali" });
      expect(res).to.have.status([406]);
    });
  });

  describe("DELETE QUERY END-POINT TESTING", async () => {
    let token = null;
    let query = null;

    beforeEach(async () => {
      try {
        //save an article
        query = new QueryModel({
          description: "hello",
          location: "kigali",
        });
        await query.save();

        //get a token
        token = await generateToken(query._id);
      } catch (error) {
        console.log(error);
      }
    });

    it("Should delete a query", async () => {
      const res = await request(app)
        .delete("/api/v1/querries/" + query._id)
        .set("Authorization", token);
      expect(res).to.have.status([200]);
    });

    it("Should not delete a query without authentication", async () => {
      const res = await request(app).delete("/api/v1/querries/" + query._id);
      expect(res).to.have.status([401]);
    });

    it("Should not delete a query that doesn't exist", async () => {
      const res = await request(app)
        .delete("/api/v1/querries/jnclakjcaa97c0d8")
        .set("Authorization", token);
      expect(res).to.have.status([404]);
    });

    it("Should delete all query", async () => {
      const res = await request(app)
        .delete("/api/v1/querries/")
        .set("Authorization", token);
      expect(res).to.have.status([200]);
    });

    it("Should not delete all query without authentication", async () => {
      const res = await request(app).delete("/api/v1/querries/");
      expect(res).to.have.status([401]);
    });
  });
});
