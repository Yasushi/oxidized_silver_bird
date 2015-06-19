/*
  Multiple Timeline Factory - Base class for templates supporting multiple timelines
  (e.g. Lists, Search)
*/
function MultipleTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
MultipleTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible) {
      var currentData = this.template.getUserData();
      if(!currentData || currentData.length === 0) {
        currentData = [null];
      }
      this.template.setUserData(currentData);
      var ret = [];
      for(var i = 0, len = currentData.length; i < len; ++i) {
        ret.push(this._instantiateTimeline(this.template.id + '_' + i, this.tweetManager, this.template, currentData[i], i));
      }
      return ret;
    }
    return [];
  },

  addTimeline: function(uniqueId) {
    var currentData = this.template.getUserData();
    if(!currentData) {
      currentData = [];
    }
    currentData.push(null);
    this.template.setUserData(currentData);
    var index = currentData.length - 1;
    var timeline = this._instantiateTimeline(this.template.id + '_' + uniqueId, this.tweetManager, this.template, currentData[index], index);
    return timeline;
  },

  _instantiateTimeline: function(timelineId, manager, template, data, orderNumber) {
    throw '_instantiateTimeline must be overridden';
  }
});
