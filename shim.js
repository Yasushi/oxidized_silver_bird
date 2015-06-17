module.exports = {
  './lib/send_queue.js': {
    exports: 'SendQueue'
  },
  './lib/tweet_transforms.js': {
    exports: 'Transforms'
  },
  './lib/twitter_lib.js': {
    exports: 'TwitterLib',
    depends: {
      './target/src/lib/secret_keys.js': "SecretKeys"
    }
  },
  './lib/popup/composer.js': {
    exports: 'Composer'
  },
  './lib/tweets_assembler.js': {
    exports: 'Renderer',
    depends: {
      './lib/twitter_lib.js': 'TwitterLib',
      './lib/tweet_transforms.js': 'Transforms',
      './lib/popup/composer.js': 'Composer'
    }
  },
  './lib/options_backend.js': {
    exports: 'OptionsBackend',
    depends: {
      'jquery': '$',
      './lib/persistence.js': 'Persistence'
    }
  },
  './lib/base_timeline_factory.js': {
    exports: 'TimelineFactory'
  },
  './lib/default_timeline_factory.js': {
    exports: 'DefaultTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory'
    }
  },
  './lib/unified_dms_timeline_factory.js': {
    exports: 'UnifiedDMsTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory',
      './lib/timelines/unified_dms_timeline.js': "UnifiedDMsTweetsTimeline"

    }
  },
  './lib/stream_listener.js': {
    exports: "StreamListener"
  },
  './lib/timelines/timeline.js': {
    exports: "TweetsTimeline",
    depends: {
      './lib/stream_listener.js': "StreamListener"
    }
  },
  './lib/timelines/unified_timeline.js': {
    exports: "UnifiedTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/timeline.js': "TweetsTimeline"
    }
  },
  './lib/timelines/unified_dms_timeline.js': {
    exports: "UnifiedDMsTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/unified_timeline.js': "UnifiedTweetsTimeline"
    }
  },
  './lib/timelines/favorites_timeline.js': {
    exports: "FavoritesTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/timeline.js': "TweetsTimeline"
    }
  },
  './lib/timelines/multiple_timeline.js': {
    exports: "MultipleTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/timeline.js': "TweetsTimeline"
    }
  },
  './lib/timelines/lists_timeline.js': {
    exports: "ListsTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/multiple_timeline.js': "MultipleTweetsTimeline"
    }
  },
  './lib/timelines/search_timeline.js': {
    exports: "SearchTweetsTimeline",
    depends: {
      'jquery': '$',
      './lib/timelines/multiple_timeline.js': "MultipleTweetsTimeline"
    }
  },
  './lib/unified_timeline_factory.js': {
    exports: 'UnifiedTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory',
      './lib/timelines/unified_timeline.js': "UnifiedTweetsTimeline"
    }
  },
  './lib/dm_timeline_factory.js': {
    exports: 'DMTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory'
    }
  },
  './lib/favorites_timeline_factory.js': {
    exports: 'FavoritesTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory',
      './lib/timelines/favorites_timeline.js': "FavoritesTweetsTimeline"
    }
  },
  './lib/multiple_timeline_factory.js': {
    exports: 'MultipleTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/base_timeline_factory.js': 'TimelineFactory'
    }
  },
  './lib/lists_timeline_factory.js': {
    exports: 'ListsTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/multiple_timeline_factory.js': 'MultipleTimelineFactory',
      './lib/timelines/lists_timeline.js': "ListsTweetsTimeline"

    }
  },
  './lib/search_timeline_factory.js': {
    exports: 'SearchTimelineFactory',
    depends: {
      'jquery': '$',
      './lib/multiple_timeline_factory.js': 'MultipleTimelineFactory',
      './lib/timelines/search_timeline.js': "SearchTweetsTimeline"
    }
  },
  './lib/timeline_template.js': {
    exports: 'TimelineTemplate',
    depends: {
      'jquery': '$',
      './lib/unified_timeline_factory.js': 'UnifiedTimelineFactory',
      './lib/default_timeline_factory.js': 'DefaultTimelineFactory',
      './lib/unified_dms_timeline_factory.js': 'UnifiedDMsTimelineFactory',
      './lib/dm_timeline_factory.js': 'DMTimelineFactory',
      './lib/favorites_timeline_factory.js': 'FavoritesTimelineFactory',
      './lib/lists_timeline_factory.js': 'ListsTimelineFactory',
      './lib/search_timeline_factory.js': 'SearchTimelineFactory'
    }
  },
  './lib/send_queue.js': {
    exports: 'SendQueue'
  },
  './lib/icon_creator.js': {
    exports: 'IconCreator'
  },
  './lib/tweet_manager.js': {
    exports: 'TweetManager',
    depends: {
      // "jquery": "$",
      './lib/options_backend.js': 'OptionsBackend',
      './lib/send_queue.js': 'SendQueue',
      './lib/icon_creator.js': 'IconCreator',
      './lib/timeline_template.js': 'TimelineTemplate'
    }
  }
}
