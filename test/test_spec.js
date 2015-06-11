/*global describe it chrome*/

var assert = require('power-assert');

describe("math", function() {
  it("linear function", function() {
    var f = Math.createLinearFunction(2,3);
    assert(f(7)==17);
  });
});
