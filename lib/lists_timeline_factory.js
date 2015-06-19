/*
  Lists Timeline Factory
*/
function ListsTimelineFactory(template) {
  MultipleTimelineFactory.call(this, template);
}
ListsTimelineFactory.prototype = $.extend({}, MultipleTimelineFactory.prototype, {
  _instantiateTimeline: function(timelineId, manager, template, data, orderNumber) {
    return new ListsTweetsTimeline(timelineId, manager, template, data, orderNumber);
  }
});
