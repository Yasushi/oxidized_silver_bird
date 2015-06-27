var WorkList = {
  bindEvents: function() {
    $(".worklist_container .worklist_cancel_trigger").bind('click', WorkList.cancelMessage.bind(WorkList));
  },

  init: function() {
    if(tweetManager.sendQueue.queueSize() !== 0) {
      $("#queue_loading").show();
    }
    tweetManager.sendQueue.onQueueEmpty(function(lastSent) {
      if(!window) {
        return;
      }
      WorkList.sendQueueEmpty(lastSent);
    });
    tweetManager.sendQueue.onTweetEnqueued(function() {
      if(!window) {
        return;
      }
      WorkList.tweetEnqueued();
    });
    tweetManager.sendQueue.onSendFailed(function() {
      if(!window) {
        return;
      }
      WorkList.sendFailed();
    });
    // Just checking
    WorkList.sendFailed();
  },

  cancelMessage: function() {
    var queueItems = tweetManager.sendQueue.queue;
    if(queueItems.length > 0) {
      queueItems[0].cancel();
    }
  },

  sendQueueEmpty: function(lastSent) {
    $("#queue_loading").hide();
    var updateTimelineId = TimelineTemplate.HOME;
    if(lastSent && lastSent.message.indexOf('d ') === 0) {
      updateTimelineId = TimelineTemplate.SENT_DMS;
    }
    loadTimeline(true, updateTimelineId);
  },

  tweetEnqueued: function() {
    $("#queue_loading").show();
  },

  sendFailed: function() {
    var abortedQueue = tweetManager.sendQueue.abortedStatus();
    if(!abortedQueue || abortedQueue.length === 0) {
      return;
    }
    // If we're here that's because something went wrong
    if(!Composer.isVisible()) {
      // For now let's just show the first enqueued message
      var topMessage = abortedQueue[0];
      Composer.initMessage(topMessage.message, topMessage.replyId, topMessage.replyUser, true);
    }
    Renderer.showError(chrome.i18n.getMessage("tweet_send_error"));
  }
};
