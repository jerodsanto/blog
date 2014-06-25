(function() {
  var blog;

  $(document).on("ready", function() {
    return blog.init();
  });

  blog = {
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
      return blog.randomBGPosition();
    },
    init: function() {
      var randos;
      blog.onLoad();
      $('.service_hackernews a, .service_instapaper a').click(function() {
        blog.sharePopup($(this).attr('href'));
        return false;
      });
      $('.highlight').wrap('<div class="highlight-wrap"></div>');
      randos = ["Whathaveyou", "Tomfoolery", "Jetsam", "Rants", "Highjinks", "Flotsam", "Rando Calrissian"];
      $("#rando").text(randos[Math.floor(Math.random() * randos.length)]);
      return $("#content img").each(function() {
        var $self;
        $self = $(this);
        $self.parent().after("<p class='caption'>" + $self.attr("alt") + "</p>");
      });
    }
  };

  blog.Controller = (function() {
    function Controller() {}

    return Controller;

  })();

}).call(this);
