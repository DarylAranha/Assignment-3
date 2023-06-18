"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DisplayMovieList = void 0;
const movies_1 = __importDefault(require("../Models/movies"));
function DisplayMovieList(req, res, next) {
    movies_1.default.find({})
        .then(function (data) {
        res.json(data);
    })
        .catch(function (err) {
        console.log(err);
    });
}
exports.DisplayMovieList = DisplayMovieList;
//# sourceMappingURL=movies.js.map