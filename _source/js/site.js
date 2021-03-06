(function() {
  var JMS;

  $(document).on("ready", function() {
    return JMS.init();
  });

  JMS = {
    sharePopup: function(href) {
      var h, left, shareWindow, top, w;
      w = 600;
      h = 300;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
      shareWindow = window.open(href, 'jerod', 'location=1,status=1,scrollbars=1,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
      return false;
    },
    randomBGPosition: function() {
      var $body, randomX, randomY;
      $body = $('body');
      $body.addClass('show-bg');
      randomX = Math.floor(Math.random() * 1000);
      randomY = Math.floor(Math.random() * 1000);
      return $body.css('background-position', randomX + 'px ' + randomY + 'px');
    },
    onLoad: function() {
      $.bigfoot();
      return this.randomBGPosition();
    },
    init: function() {
      this.onLoad();
      $(".service_hackernews a, .service_instapaper a").on("click", function() {
        JMS.sharePopup($(this).attr('href'));
        return false;
      });
      $(".highlight").each(function() {
        var $this, snippetWidth;
        $this = $(this);
        $this.wrap("<div class='highlight-wrap' />");
        $this.wrap("<div class='highlight-scroll-wrap' />");
        snippetWidth = $this.outerWidth();
        return $this.parent(".highlight-scroll-wrap").css("width", snippetWidth);
      });
      $("#st-search-input").swiftypeSearch({
        resultContainingElement: '#search-results',
        engineKey: "TM8ezPQi8DZRuszeAPuU",
        perPage: 10
      });
      $(".post img").each(function() {
        var $self;
        $self = $(this);
        $self.closest("p").after("<p class='caption'>" + $self.attr("alt") + "</p>");
      });
      $("a.main-header-more").on("click", function(event) {
        return $(this).siblings().css("display", "block").end().hide();
      });
      $(".reveal-button").on("click", "a", function(event) {
        var $content, html;
        event.preventDefault();
        $content = $(this).parent().next(".reveal-content");
        html = $content.data("content");
        $content.html(html).removeData("content").slideDown("slow", "easeOutBounce");
        $(this).remove();
      });
      $("iframe").css("width", "100%");
      return $('.search-form input').focus();
    }
  };

}).call(this);
