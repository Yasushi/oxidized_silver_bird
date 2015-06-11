/*global describe it chrome*/

var assert = require('power-assert');
var Transforms = require('../lib/tweet_transforms');

describe("Transforms", function() {
  describe("transformEntities", function() {
    assert(Transforms.transformEntities("abc") === "abc");
    assert(Transforms.transformEntities("&lt;&amp;&#x61;&#x62;&#x63;") === "<&abc");
  });

  describe("transformFactory", function() {
    var transforms= [
      { "expression": /abc/i,
        "replacement": function(matchGroup) {
          return document.createTextNode('xyz');
        }
      },
      { "expression": /f(.)(.)/i,
        "replacement": function(matchGroup) {
          return document.createTextNode(matchGroup.toString());
        }
      }
    ];
    var t = Transforms.transformFactory(transforms);
    assert(t('abc') instanceof HTMLSpanElement);
    assert(t('abc').innerHTML === 'xyz');
    assert(t('bfarx').innerHTML === 'bfar,a,rx');
  });
});
