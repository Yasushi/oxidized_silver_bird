/*
  Search Timeline Factory
*/
function SearchTimelineFactory(template) {
  MultipleTimelineFactory.call(this, template);
}
SearchTimelineFactory.prototype = $.extend({}, MultipleTimelineFactory.prototype, {
  _instantiateTimeline: function(timelineId, manager, template, data, orderNumber) {
    return new SearchTweetsTimeline(timelineId, manager, template, data, orderNumber);
  }
});
