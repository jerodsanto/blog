(function() {
  var MicahMax;

  $(document).on("ready", function() {
    return MicahMax.init();
  });

  MicahMax = {
    randomPosition: function(item, parent) {},
    equalHeight: function(group) {
      var tallest;
      tallest = 0;
      return group.height("auto").each(function() {
        var thisHeight;
        thisHeight = $(this).height();
        if (thisHeight > tallest) {
          return tallest = thisHeight;
        }
      }).height(tallest);
    },
    sharePopup: function(href) {
      var h, left, shareWindow, top, w;
      w = 600;
      h = 300;
      left = (screen.width / 2) - (w / 2);
      top = (screen.height / 2) - (h / 2);
      shareWindow = window.open(href, 'MicahMax', 'location=1,status=1,scrollbars=1,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left);
      return false;
    },
    onLoad: function() {
      return MicahMax.onResize();
    },
    onResize: function() {},
    init: function() {
      MicahMax.onLoad();
      return $('.projects > a').mouseover(function() {
        var $this, projectColor;
        $this = $(this);
        projectColor = $this.data('color');
        return $(this).css('color', projectColor);
      }).mouseout(function() {
        return $(this).css('color', '#fff');
      });
    }
  };

  MicahMax.Controller = (function() {
    function Controller() {}

    return Controller;

  })();

}).call(this);
