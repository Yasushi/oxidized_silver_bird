/*
  DMs Unified Timeline Factory
*/
function UnifiedDMsTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
UnifiedDMsTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible || this.template.includeInUnified) {
      return [new UnifiedDMsTweetsTimeline(this.template.id, this.tweetManager, this.template, this.tweetManager.timelines)];
    }
    return [];
  }
});
