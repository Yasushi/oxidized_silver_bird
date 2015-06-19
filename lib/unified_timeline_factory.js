/*
  Unified Timeline Factory
*/
function UnifiedTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
UnifiedTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible) {
      return [new UnifiedTweetsTimeline(this.template.id, this.tweetManager, this.template, this.tweetManager.timelines)];
    }
    return [];
  }
});
