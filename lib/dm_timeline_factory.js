/*
  Regular DM Timeline Factory
*/
function DMTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
DMTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible || this.template.includeInUnified || TimelineTemplate.getTemplate(TimelineTemplate.DMS).visible) {
      return [new TweetsTimeline(this.template.id, this.tweetManager, this.template)];
    }
    return [];
  }
});
