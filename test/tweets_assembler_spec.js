/*global describe it chrome*/

var assert = require('power-assert');
var moment = require('moment');

var FORMAT = 'ddd MMM DD YYYY HH:mm:ss ZZ';

describe("Renderer", function() {
  beforeEach(function(){
    this.Renderer = require('../lib/tweets_assembler');
  });

  it("defined", function() {
    assert(typeof this.Renderer === 'object');
  });

  describe("getTimestampText", function() {
    it("is now", function() {
      assert(this.Renderer.getTimestampText(new Date().toString()) === 'justNow');
      assert(this.Renderer.getTimestampText(moment().subtract(14, 'seconds').format(FORMAT)) === 'justNow');
      assert(this.Renderer.getTimestampText(moment().subtract(15, 'seconds').format(FORMAT)) === 'minuteAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(59, 'seconds').format(FORMAT)) === 'minuteAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(60, 'seconds').format(FORMAT)) === 'minutes');
      assert(this.Renderer.getTimestampText(moment().subtract(3599, 'seconds').format(FORMAT)) === 'minutes');
      assert(this.Renderer.getTimestampText(moment().subtract(3600, 'seconds').format(FORMAT)) === 'timeAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(86399, 'seconds').format(FORMAT)) === 'timeAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(86400, 'seconds').format(FORMAT)) === 'timeAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(60 * 60 * 24 * 30, 'seconds').format(FORMAT)) === 'timeAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(60 * 60 * 24 * 30 * 11 - 1, 'seconds').format(FORMAT)) === 'timeAgo');
      assert(this.Renderer.getTimestampText(moment().subtract(60 * 60 * 24 * 30 * 12, 'seconds').format(FORMAT)) === 'yearsAgo');
    });
  });

  describe("renderTweet", function() {
    it("render", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/card.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
      // document.body.appendChild(space);
      // TODO assert
    });
    it("render reply", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      window.tweetManager.getInReplyToTweet = function(cb) {
        cb(true, require('./fixtures/card.json'))
      };
      var tweet = require('./fixtures/reply.json');
      tweet.replyVisible = true;
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render newline", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/newline.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render gif", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/gif.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render mov", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/mov.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render rt", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/rt.json');
      var space = this.Renderer.renderTweet(tweet, true, 'screen_name');
    });
    it("render quote", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/quote.json');
      window.tweetManager.readTweet(tweet.id_str);
      var space = this.Renderer.renderTweet(tweet, true, 'name');
    });
    it("render hash", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/hash.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render witout entities", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/noentity.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
    it("render geo", function() {
      this.TweetManager = require('../lib/tweet_manager');
      window.tweetManager = this.TweetManager.instance;
      var tweet = require('./fixtures/geo.json');
      var space = this.Renderer.renderTweet(tweet, true, 'both');
    });
  });
});
