import { expect } from "chai";
import solution from "../src";

const { basic: tests } = require("./test-data.json");

describe("Basic functionality tests", () => {
  tests.map((test) => {
    it(test.description, () => {
      expect(solution(test.input)).to.equal(test.output);
    });
  });
});
