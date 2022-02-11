import { expect, request, use } from "chai";
import chaiHttp from "chai-http";
import app from "../src/app";
import "dotenv/config";
import { before, beforeEach } from "mocha";
import ArticleModel from "../src/models/articleModel";
import { generateToken } from "../src/helpers/jwtFunctions.js";
import { join } from "path";

use(chaiHttp);

describe("ARTICLE END-POINT TESTING", () => {
  describe("GET ARTICLE END-POINT TESTING", () => {
    it("Should retrieve all articles", async () => {
      let res = await request(app).get("/api/v1/articles/");
      expect(res).to.have.status([200]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not retrieve the articles", async () => {
      let res = await request(app).get("/api/v1/aritcle/");
      expect(res).to.have.status([404]);
    });

    it("Should retrieve one article", async () => {
      await ArticleModel.deleteMany({});
      let article = await new ArticleModel({
        title: "title",
        description: "hello",
        image: "none url",
      });
      await article.save();
      console.log(await ArticleModel.find({ _id: article._id }));

      let res = await request(app).get("/api/v1/articles/" + article._id);
      expect(res).to.have.status([200]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not retrieve one article", async () => {
      let article = { _id: "vsdc7c9ac980c0as9" };

      let res = await request(app).get("/api/v1/articles/" + article._id);
      expect(res).to.have.status([404]);
    });
  });

  describe("CREATE ARTICLE END-POINT TESTING", () => {
    let token = null;

    before(async () => {
      try {
        //save an article
        await ArticleModel.deleteMany({});
        let article = await new ArticleModel({
          title: "title",
          description: "hello",
          image: join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
        });
        await article.save();

        //get a token
        token = `Bearer ${generateToken(article._id)}`;
      } catch (error) {
        console.log(error);
      }
    });

    it("Should create an article", async () => {
      await ArticleModel.deleteMany({});

      let res = await request(app)
        .post("/api/v1/articles/")
        .set("Authorization", token)
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({ title: "title", description: "hello" });
      expect(res).to.have.status([201]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not create an article without authentication", async () => {
      let res = await request(app)
        .post("/api/v1/articles/")
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({ title: "title", description: "hello" });
      expect(res).to.have.status([401]);
    });

    it("Should not create an article without title", (done) => {
      console.log(token);
      request(app)
        .post("/api/v1/articles/")
        .set("Authorization", token)
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({ title: "", description: "hello" })
        .end((err, res) => {
          if (err) done(err);
          expect(res).to.have.status([406]);
          done();
        });
    });
  });

  describe("UPDATE ARTICLE END-POINT TESTING", async () => {
    let token = null;
    let article = null;

    beforeEach(async () => {
      try {
        //save an article
        await ArticleModel.deleteMany({});
        article = await new ArticleModel({
          title: "title",
          description: "hello",
          image: join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
        });
        await article.save();
        console.log(await ArticleModel.find({ _id: article._id }));

        //get a token
        token = `Bearer ${generateToken(article._id)}`;
      } catch (error) {
        console.log(error);
      }
    });

    it("Should update an article", async () => {
      console.log(article._id)
      let res = await request(app)
        .patch("/api/v1/articles/" + article._id)
        .set("Authorization", token)
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({ title: "title2", description: "hello2" });
      expect(res).to.have.status([201]);
      expect(res.type).to.have.equal("application/json");
    });

    it("Should not update an article without authentication", async () => {
      let res = await request(app)
        .patch("/api/v1/articles/" + article._id)
        .attach(
          "image",
          join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
          "img.jpg"
        )
        .field({ title: "title2", description: "hello2" });
      expect(res).to.have.status([401]);
    });
  });

  describe("DELETE ARTICLE END-POINT TESTING", async () => {
    let token = null;
    let article = null;

    beforeEach(async () => {
      try {
        //save an article
        await ArticleModel.deleteMany({});
        article = await new ArticleModel({
          title: "title",
          description: "hello",
          image: join(__dirname, "/images/FB_IMG_15760502641137579.jpg"),
        });
        await article.save();

        //get a token
        token = `Bearer ${await generateToken(article._id)}`;
      } catch (error) {
        console.log(error);
      }
    });

    it("Should delete an article", async () => {
      let res = await request(app)
        .delete("/api/v1/articles/" + article._id)
        .set("Authorization", token);
      expect(res).to.have.status([200]);
    });

    it("Should not delete an article without authentication", async () => {
      let res = await request(app).post("/api/v1/articles/" + article._id);
      expect(res).to.have.status([404]);
    });

    it("Should not delete an article that doesn't exist", async () => {
      let res = await request(app)
        .delete("/api/v1/articles/dcljndscasdc7879cads9")
        .set("Authorization", token);
      expect(res).to.have.status([404]);
    });
  });
});
