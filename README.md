## Chromed Bird ##

1. What is it?

    Chromed Bird is a general purpose Chromium twitter extension.

2. Installing

    [Install it now](http://cloud.github.com/downloads/cezarsa/chromed_bird/chromed_bird_current.crx)

3. Compatibility

    Currently only Dev channel releases of Google Chrome support extensions. Check [http://dev.chromium.org/getting-involved/dev-channel](http://dev.chromium.org/getting-involved/dev-channel).

4. Features

    Chromed Bird is only starting but it already lets you do basic stuff like view your friends timeline, compose tweets, and replying and retweeting. Let's try to summarize this:

    * Follow your friends timeline and navigate through older tweets
    * Tweets caching to avoid hitting Twitter's API rate limit (Only hit Twitter after 1 minute or when fetching uncached pages)
    * Compose, reply, and RT tweets
    * It uses Chromium autoupdate feature, so you won't be left behind.

5. Wishlist

    There are lots of missing stuff, some of them seem to be limitations from Chromium's current extensions API.

    * It should automatically notify on new tweets, but I couldn't find a way to open a popup from the background page.
    * It'd be nice to track read / unread tweets.
    * There seem to be some issues with popup window resizing, it doesn't shrink back as content shrinks.
    * Use OAuth authentication (Although I think it's a little cumbersome to have users copying and pasting the PIN number)

6. License

    This project uses the very simple and permissive MIT license. Check the LICENSE file.
