import { describe, it } from 'mocha';
import chai from 'chai';
import chaiHttp from "chai-http";
import app from "../src/index"; 
import { isExportDeclaration } from 'typescript';

chai.use(chaiHttp);
const expect = chai.expect;

describe("GET /simulation", () => {

    it("should return 200 OK and wins when user send change = true and numberOfGames = 1", () => {
        return chai.request(app).get("/simulation?change=true&numberOfGames=1")
        .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(1);
            expect(res.body.result[0]).to.have.property('playerFinalChoice');
        })
    });

    it("should return 200 OK and wins when user send change = false and numberOfGames = 1", () => {
        return chai.request(app).get("/simulation?change=false&numberOfGames=1")
        .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(1);
            expect(res.body.result[0]).to.not.have.property('playerFinalChoice');
        })
    });

    it("should return 200 OK and wins when user send change = true and numberOfGames = 5", () => {
        return chai.request(app).get("/simulation?change=true&numberOfGames=5")
        .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(5);
        })
    });

    it("should return 200 OK and wins when user send change = false and numberOfGames = 5", () => {
        return chai.request(app).get("/simulation?change=false&numberOfGames=5")
        .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(5);
        })
    });

    it("should return 400 Bad Request when user send change params only", () => {
        return chai.request(app).get("/simulation?change=true")
        .then(res => {
            expect(res).to.have.status(400);
        })
    });

    it("should return 400 Bad Request when user send numberOfGames only", () => {
        return chai.request(app).get("/simulation?numberOfGames=1")
        .then(res => {
            expect(res).to.have.status(400);
        })
    });
});

