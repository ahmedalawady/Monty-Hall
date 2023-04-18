"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mocha_1 = require("mocha");
const chai_1 = __importDefault(require("chai"));
const chai_http_1 = __importDefault(require("chai-http"));
const index_1 = __importDefault(require("../src/index"));
chai_1.default.use(chai_http_1.default);
const expect = chai_1.default.expect;
(0, mocha_1.describe)("GET /simulation", () => {
    (0, mocha_1.it)("should return 200 OK and wins when user send change = true and numberOfGames = 1", () => {
        return chai_1.default.request(index_1.default).get("/simulation?change=true&numberOfGames=1")
            .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(1);
            expect(res.body.result[0]).to.have.property('playerFinalChoice');
        });
    });
    (0, mocha_1.it)("should return 200 OK and wins when user send change = false and numberOfGames = 1", () => {
        return chai_1.default.request(index_1.default).get("/simulation?change=false&numberOfGames=1")
            .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(1);
            expect(res.body.result[0]).to.not.have.property('playerFinalChoice');
        });
    });
    (0, mocha_1.it)("should return 200 OK and wins when user send change = true and numberOfGames = 5", () => {
        return chai_1.default.request(index_1.default).get("/simulation?change=true&numberOfGames=5")
            .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(5);
        });
    });
    (0, mocha_1.it)("should return 200 OK and wins when user send change = false and numberOfGames = 5", () => {
        return chai_1.default.request(index_1.default).get("/simulation?change=false&numberOfGames=5")
            .then(res => {
            expect(res).to.have.status(200);
            expect(res.body).to.be.an('object');
            expect(res.body).to.have.property('status');
            expect(res.body).to.have.property('result');
            expect(res.body.result).to.have.lengthOf(5);
        });
    });
    (0, mocha_1.it)("should return 400 Bad Request when user send change params only", () => {
        return chai_1.default.request(index_1.default).get("/simulation?change=true")
            .then(res => {
            expect(res).to.have.status(400);
        });
    });
    (0, mocha_1.it)("should return 400 Bad Request when user send numberOfGames only", () => {
        return chai_1.default.request(index_1.default).get("/simulation?numberOfGames=1")
            .then(res => {
            expect(res).to.have.status(400);
        });
    });
});
