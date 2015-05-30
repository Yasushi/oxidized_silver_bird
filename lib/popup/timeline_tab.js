var TimelineTab = {
  init: function() {
    $("#tabs").tabs({
      active: 0,
      beforeActivate: function(event, ui) {
        tweetManager.previousTimelineId = tweetManager.currentTimelineId;
        tweetManager.currentTimelineId = ui.newPanel.selector.split('-')[1];
        prepareAndLoadTimeline();
      },
      activate: function(event, ui) {
        $('.inner_timeline', ui.panel).scrollTop(tweetManager.getCurrentTimeline().currentScroll);
      }
    });
  },

  addNewTab: function(templateId, automaticallyAdded) {
    var createdTimelines = tweetManager.showTimelineTemplate(templateId);
    if(templateId == TimelineTemplate.LISTS) {
      Lists.init();
    } else {
      for(var i = 0, len = createdTimelines.length; i < len; ++i) {
        var timeline = createdTimelines[i];
        pos = tweetManager.getTimelinePosition(timeline.timelineId);
        if(pos == -1) {
          pos = undefined;
        }
        if(templateId == TimelineTemplate.SEARCH) {
          SearchTab.addSearchTab(timeline.timelineId, pos, !automaticallyAdded);
        } else {
          TimelineTab.addTab(timeline.timelineId, timeline.template.timelineName, pos);
        }
      }
      ThemeManager.handleWindowResizing();
    }
    ThemeManager.updateTabsOrder();
    return createdTimelines;
  },

  addNewSearchTab: function(searchQuery, isBackground) {
    var searchTimeline;
    tweetManager.eachTimeline(function(timeline) {
      if(timeline.template.id == TimelineTemplate.SEARCH && timeline.getSearchQuery() == searchQuery) {
        searchTimeline = timeline;
        return false;
      }
      return true;
    });
    if(!searchTimeline) {
      searchTimeline = TimelineTab.addNewTab(TimelineTemplate.SEARCH, true)[0];
    }
    if(searchQuery) {
      SearchTab.updateSearch(searchTimeline.timelineId, searchQuery, isBackground);
    }
  },

  addTab: function(timelineId, tabName, pos) {
    var tabId = '#timeline-' + timelineId;
    var tabA = $("<li id='tab_" + tabId + "' class='timeline_tab'><a href='" + tabId + "'><span>" + tabName + "</span></a></li>");
    var tabs=$("#tabs .ui-tabs-nav > li");
    if (!!tabs[pos-1]) {
      tabA.insertAfter(tabs[pos-1]);
    } else {
      tabA.appendTo("#tabs .ui-tabs-nav");
    }
    $('<div class="timeline"><div class="inner_timeline"></div></div>')
      .attr("id", 'timeline-' + timelineId)
      .addClass("ui-tabs-panel ui-widget-content ui-corner-bottom")
      .data("ui-tabs-destroy", true)
      .appendTo("#tabs");
    $("#tabs").tabs("refresh");

    var tabEl = $("#timeline-" + timelineId + ' .inner_timeline');
    tabEl.scroll(function(e) {
      var $this = $(this);
      var timeline = tweetManager.getTimeline(timelineId);
      var threshold = 50;
      timeline.currentScroll = $this.scrollTop();
      var maxScroll = $this.prop("scrollHeight") - $this.height();
      if(maxScroll - $this.scrollTop() < threshold) {
        if(!loadingNewTweets) {
          Paginator.nextPage();
        }
      }
    });
    ContextMenu.initSingleTimeline(timelineId);
  },

  removeTab: function(timelineId) {
    if(timelineId == tweetManager.currentTimelineId && tweetManager.previousTimelineId) {
      this.select(tweetManager.previousTimelineId);
    }

    $("#tabs > ul li:has(a[href])").each(function(index, el) {
      if($(el).attr('id') == 'tab_#timeline-' + timelineId) {
        var tab = $(el).remove();
        var panelId = tab.attr("aria-controls");
        $("#" + panelId).remove();
        $("#tabs").tabs("refresh");
        return false;
      }
    });
    tweetManager.hideTimeline(timelineId);
    ThemeManager.handleWindowResizing();
    ThemeManager.updateTabsOrder();
  },

  select: function(timelineId) {
    var anchors = $("#tabs > ul li a");
    var index = anchors.index(anchors.filter( "[href$='#timeline-" + timelineId + "']"));
    $("#tabs").tabs('option', 'active', index);
  }
};
