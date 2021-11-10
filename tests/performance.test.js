import { expect } from "chai";
import { performance } from "perf_hooks";
import solution from "../src";

const { performance: tests } = require("./test-data.json");
const test = tests[0];

const snapshot = { time: () => performance.now(), memory: () => process.memoryUsage() };

describe("Performance tests", function () {
  const memory = [];
  const time = [];
  beforeEach(() => {
    memory.push(snapshot.memory().heapUsed);
  });

  afterEach(() => {
    memory.push(snapshot.memory().heapUsed);
  });

  [...Array(5)].forEach((_, i) => {
    it(`Execute performance test #${i + 1}`, () => {
      const start = snapshot.time();
      const result = solution(test.input);
      const stop = snapshot.time();
      expect(result).to.equal(test.output);

      time.push(stop - start);
    }).timeout(30000);
  });

  after(() => {
    const bestTime = time.sort((a, b) => a - b)[0];
    console.log(bestTime && `Best time :[${Math.round(bestTime)}ms]:`);

    const memoryDifferences = [...Array(5)].map((_, index) => {
      const [start, stop] = memory.slice(index * 2, index * 2 + 2);
      return stop - start;
    });

    const largestHeapSize = memoryDifferences.sort((a, b) => b - a)[0];

    console.log(bestTime && `Largest heap size :[${Math.round(largestHeapSize / 1024 ** 2)}MB]:`);
  });
});
