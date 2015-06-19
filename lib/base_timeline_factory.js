/*
TimelineFactory contract:
 - TimelineFactory(Template)
 # create() -> [Timeline1, Timeline2]
 # addTimeline() -> Timeline
*/
function TimelineFactory(template) {
  this.tweetManager = template.tweetManager;
  this.template = template;
}
TimelineFactory.prototype = {
  addTimeline: function() {
    /* Default addTimeline should do nothing */
    return null;
  }
};
