"use strict";

var assert = require('power-assert');
var proxyquire = require('proxyquireify')(require);


describe("Persistence", function() {
  beforeEach(function(){
    this.localStorage = {
      removeItem: function(key){ delete this[key]; }
    };
    var stub = {
      './persistence_require': {
        localStorage: this.localStorage
      }
    };
    this.Persistence = proxyquire('../lib/persistence.js', stub);
  });
  describe("defined", function() {
    it("object", function() {
      assert(typeof this.Persistence === 'object');
    });
  });
  describe("value", function() {
    it("add string", function() {
      var v = this.Persistence.load("hoge");
      assert(this.localStorage['hoge'] === undefined);
      assert(typeof v.val() === 'undefined');
      v.save("huga");
      assert(v.val() === 'huga');
      assert(this.localStorage['hoge'] === 'huga');
    });
    it("add object", function() {
      var v = this.Persistence.load("obj");
      assert(typeof this.localStorage['obj'] === 'undefined');
      v.save({a:1});
      assert(v.val()['a'] === 1);
      assert(this.localStorage['obj'] === '{"a":1}');
    });
    it("get existing key of version", function() {
      this.localStorage['version'] = '1234.567.89';
      assert(this.Persistence.version().val() === '1234.567.89');
    });
    it("remove", function() {
      assert(typeof this.Persistence.load("v1").remove() === 'undefined');
      this.localStorage.v2="v2";
      assert(this.Persistence.load("v2").val() === 'v2');
      assert(typeof this.Persistence.load("v2").remove() === 'undefined');
      assert(typeof this.Persistence.load("v2").val() === 'undefined');
    });
  });
  it("cleanup old data", function() {
    this.localStorage.password='password';
    this.localStorage.logged='logged';
    this.localStorage.username='username';
    this.localStorage.remember='remember';
    this.localStorage.currentTheme='currentTheme';
    this.localStorage.hoge='huga';
    this.Persistence.cleanupOldData();
    assert(typeof this.localStorage.password === 'undefined');
    assert(typeof this.localStorage.logged === 'undefined');
    assert(typeof this.localStorage.username === 'undefined');
    assert(typeof this.localStorage.remember === 'undefined');
    assert(typeof this.localStorage.currentTheme === 'undefined');
    assert(this.localStorage.hoge === 'huga');
  });

  it("accessors", function() {
    this.localStorage.options="options";
    this.localStorage.selected_lists="selected_lists";
    this.localStorage.timeline_order="timeline_order";
    this.localStorage.oauth_token_data="oauth_token_data";
    this.localStorage.oauth_token_service="oauth_token_service";
    this.localStorage.version="version";
    this.localStorage.popup_size="popup_size";
    this.localStorage.window_position="window_position";
    assert(this.Persistence.options().val() === "options");
    assert(this.Persistence.selectedLists().val() === "selected_lists");
    assert(this.Persistence.timelineOrder().val() === "timeline_order");
    assert(this.Persistence.oauthTokenData().val() === "oauth_token_data");
    assert(this.Persistence.oauthTokenService().val() === "oauth_token_service");
    assert(this.Persistence.version().val() === "version");
    assert(this.Persistence.popupSize().val() === "popup_size");
    assert(this.Persistence.windowPosition().val() === "window_position");
  });
});
