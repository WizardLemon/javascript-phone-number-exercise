import { expect } from "chai";
import fs from "fs";
import path from "path";

describe("Temperatures - Benchmark", () => {
  it("Performs performance benchmark between the team alghoritms", () => {
    const results = [...Array(15)].reduce((data, _, index) => {
      try {
        const file = fs.readFileSync(path.join(__dirname, `../benchmark/benchmark-${index + 1}.log`));
        const text = file
          .toString()
          .split("")
          .filter((c) => c.match(/[\x20-\x7E]/))
          .join("");

        const bestTime = text.match(/:\[(.*?)ms\]:/gm)[0] || "Unavailable";
        const largestHeap = text.match(/:\[(.*?)MB\]:/gm)[0] || "Unavailable";

        return { ...data, [`team-${index + 1}`]: { bestTime, largestHeap } };
      } catch {
        return data;
      }
    }, {});

    console.log(results);
    expect(Object.keys(results).length).to.be.above(0);
  });
});
