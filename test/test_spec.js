/*global describe it chrome assert*/

// describe("browser action", function() {
//     it("should create a new tab", function() {
//         chrome.browserAction.onClicked.trigger();
//         expect(chrome.tabs.create.called).toBe(true);
//     });
// });

describe("math", function() {
  it("linear function", function() {
    var f = Math.createLinearFunction(2,3);
    assert(f(7)==17);
  });
});
