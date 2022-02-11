import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
// import { before, beforeEach } from "mocha";
import User from "../src/models/user";
import { hashPassword } from "../src/helpers/passwordSecurity";
import { join } from "path";

use(chaiHttp);

describe("USER END-POINT TESTING", () => {
  describe("REGISTER USER END-POINT TESTING", () => {
    beforeEach(async () => {
      // clear all user un a database
      await User.deleteMany({});
    });

    it("Should register a user", async () => {
      let res = await request(app)
        .post("/api/v1/user/register/")
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({
          username: "user",
          email: "alanshema2002@gmail.com",
          password: "112@qwerty",
        });
      expect(res).to.have.status([201]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not register a user if no email", async () => {
      let res = await request(app)
        .post("/api/v1/user/register/")
        .type("form")
        .send({
          username: "user",
          password: "112@qwerty",
        });
      expect(res).to.have.status([406]);
    });

    it("Should register a user if no image", async () => {
      let res = await request(app)
        .post("/api/v1/user/register/")
        .type("form")
        .send({
          username: "user",
          email: "alanshema2002@gmail.com",
          password: "112@qwerty",
        });
      expect(res).to.have.status([201]);
      expect(res.type).to.have.equal("application/json");
      expect(res.body.user).to.have.property("image");
    });

    it("Should not register a user if no email already exists", async () => {
      let user = User({
        username: "user",
        email: "alanshema2002@gmail.com",
        password: "112@qwerty",
      });

      await user.save();

      let res = await request(app)
        .post("/api/v1/user/register/")
        .type("form")
        .send({
          username: "user",
          email: "alanshema2002@gmail.com",
          password: "112@qwerty",
        });
      expect(res).to.have.status([409]);
    });
  });

  describe("LOGIN USER END-POINT TESTING", () => {
    before(async () => {
      // clear all user un a database
      await User.deleteMany({});
      let user = User({
        username: "user",
        email: "alanshema2002@gmail.com",
        password: hashPassword("112@qwerty"),
      });

      await user.save();
    });

    it("Should login a user", async () => {
      console.log(await User.find({}));
      let res = await request(app).post("/api/v1/user/login/").send({
        username: "user",
        email: "alanshema2002@gmail.com",
        password: "112@qwerty",
      });
      console.log(res.body)
      expect(res).to.have.status([200]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not login a user if no email", async () => {
      let res = await request(app).post("/api/v1/user/login/").send({
        username: "user",
        password: "112@qwerty",
      });
      expect(res).to.have.status([406]);
    });

    it("Should not login a user if incorrect email", async () => {
      let res = await request(app)
        .post("/api/v1/user/login/")
        .type("form")
        .send({
          username: "user",
          email: "alanshema2002@gmail.co",
          password: "112@qwerty",
        });
      expect(res).to.have.status([403]);
    });

    it("Should not login a user if password is incorrect", async () => {
      let res = await request(app)
        .post("/api/v1/user/login/")
        .type("form")
        .send({
          username: "user",
          email: "alanshema2002@gmail.com",
          password: "112@qwert",
        });
      expect(res).to.have.status([403]);
    });
  });
});
