/*
  Favorites Timeline Factory
*/
function FavoritesTimelineFactory(template) {
  TimelineFactory.call(this, template);
}
FavoritesTimelineFactory.prototype = $.extend({}, TimelineFactory.prototype, {
  create: function() {
    if(this.template.visible || this.template.includeInUnified) {
      return [new FavoritesTweetsTimeline(this.template.id, this.tweetManager, this.template)];
    }
    return [];
  }
});
