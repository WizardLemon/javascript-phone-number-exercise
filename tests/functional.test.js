import { expect } from "chai";
import solution from "../src";

const { functional: tests } = require("./test-data.json");

describe("Functional paradigm tests", () => {
  tests.map((test) => {
    it(test.description, () => {
      expect(solution(test.input)).to.equal(test.output);
    });
  });
});
