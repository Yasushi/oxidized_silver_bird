/*
  Default Timeline Factory
*/
function DefaultTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
DefaultTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible || this.template.includeInUnified) {
      return [new TweetsTimeline(this.template.id, this.tweetManager, this.template)];
    }
    return [];
  }
});
