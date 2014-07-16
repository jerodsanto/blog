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
      $('.highlight').each(function() {
        var $this, snippetWidth;
        $this = $(this);
        $this.wrap('<div class="highlight-wrap" />');
        $this.wrap('<div class="highlight-scroll-wrap" />');
        snippetWidth = $this.width();
        return $this.parent('.highlight-scroll-wrap').css('width', snippetWidth);
      });
      $("#st-search-input").swiftype({
        engineKey: "TM8ezPQi8DZRuszeAPuU",
        resultLimit: 10
      });
      $(".main-header-search input").focus(function() {
        $(this).parent().addClass('is-active');
      }).blur(function() {
        $(this).parent().removeClass('is-active');
      });
      randos = ["Whathaveyou", "Tomfoolery", "Jetsam", "Rants", "Highjinks", "Flotsam", "Rando Calrissian"];
      $("#rando").text(randos[Math.floor(Math.random() * randos.length)]);
      $("#content img").each(function() {
        var $self;
        $self = $(this);
        $self.parent().after("<p class='caption'>" + $self.attr("alt") + "</p>");
      });
      return $(".reveal-button").on("click", "a", function(event) {
        var $content, html;
        event.preventDefault();
        $content = $(this).parent().next(".reveal-content");
        html = $content.data("content");
        $content.html(html).removeData("content").slideDown("slow", "easeOutBounce");
        $(this).remove();
      });
    }
  };

  blog.Controller = (function() {
    function Controller() {}

    return Controller;

  })();

  Physics({
    timestep: 1
  }, function(world) {
    var attractor, center, dropInBody, edgeBounce, github, heptagon, int, pent, random, renderer, viewHeight, viewWidth, viewportBounds;
    random = function(min, max) {
      return (Math.random() * (max - min) + min) | 0;
    };
    dropInBody = function() {
      var body;
      body = void 0;
      switch (random(0, 7)) {
        case 0:
          body = Physics.body("circle", {
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            radius: 60,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#d93d4b",
              lineWidth: 2
            }
          });
          body.options = {
            href: 'http://outwithsprout.com'
          };
          body.view = new Image();
          body.view.src = '/images/ows.png';
          break;
        case 1:
          body = Physics.body("rectangle", {
            width: 120,
            height: 100,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: '#80b668',
              lineWidth: 2
            }
          });
          break;
        case 2:
          body = Physics.body("convex-polygon", {
            vertices: pent,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            angle: random(0, 2 * Math.PI),
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#1ead9a",
              lineWidth: 2
            }
          });
          break;
        case 3:
          body = Physics.body("convex-polygon", {
            vertices: heptagon,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            angle: random(0, 2 * Math.PI),
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#1ead9a",
              lineWidth: 2
            }
          });
          break;
        case 4:
          body = Physics.body("convex-polygon", {
            vertices: blog,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            angle: random(0, 2 * Math.PI),
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#cba72c",
              lineWidth: 2
            }
          });
          break;
        case 5:
          body = Physics.body("convex-polygon", {
            vertices: github,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            angle: random(0, 2 * Math.PI),
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#7196BF",
              lineWidth: 2
            }
          });
          break;
        case 6:
          body = Physics.body("rectangle", {
            width: 136,
            height: 56,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: '#9fbaa2',
              lineWidth: 2
            }
          });
      }
      world.add(body);
    };
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight;
    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
    center = Physics.vector(viewWidth, viewHeight).mult(0.5);
    edgeBounce = void 0;
    renderer = void 0;
    renderer = Physics.renderer("canvas", {
      el: "viewport",
      width: viewWidth,
      height: viewHeight
    });
    world.add(renderer);
    world.on("step", function() {
      world.render();
    });
    edgeBounce = Physics.behavior("edge-collision-detection", {
      aabb: viewportBounds,
      restitution: 0.2,
      cof: 0.8
    });
    window.addEventListener("resize", (function() {
      viewWidth = window.innerWidth;
      viewHeight = window.innerHeight;
      renderer.el.width = viewWidth;
      renderer.el.height = viewHeight;
      viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
      edgeBounce.setAABB(viewportBounds);
    }), true);
    pent = [
      {
        x: 50,
        y: 0
      }, {
        x: 25,
        y: -25
      }, {
        x: -25,
        y: -25
      }, {
        x: -50,
        y: 0
      }, {
        x: 0,
        y: 50
      }
    ];
    heptagon = [
      {
        x: 37.8,
        y: 0.7
      }, {
        x: 90.7,
        y: 6.1
      }, {
        x: 119.4,
        y: 50.8
      }, {
        x: 102.4,
        y: 101.2
      }, {
        x: 52.4,
        y: 119.3
      }, {
        x: 7.1,
        y: 91.5
      }, {
        x: 0.6,
        y: 38.7
      }
    ];
    blog = [
      {
        x: 73,
        y: 92
      }, {
        x: 1.9,
        y: 46.5
      }, {
        x: 73,
        y: 1.1
      }, {
        x: 144.2,
        y: 46.5
      }
    ];
    github = [
      {
        x: 277.3,
        y: 89.7
      }, {
        x: 211.7,
        y: 28.7
      }, {
        x: 277.3,
        y: -33.4
      }, {
        x: 342.9,
        y: 28.7
      }
    ];
    int = setInterval(function() {
      if (world._bodies.length > 7) {
        clearInterval(int);
      }
      dropInBody();
    }, 0);
    attractor = Physics.behavior("attractor", {
      pos: center,
      strength: .5,
      order: 1
    });
    world.on({
      "interact:grab": function(data) {
        var grabbed, href;
        grabbed = data.body;
        href = grabbed.options.href;
        console.log(href);
        document.location.href = href;
      },
      "interact:poke": function(pos) {
        attractor.position(pos);
      },
      "interact:release": function() {}
    });
    world.add([
      Physics.behavior("interactive", {
        el: renderer.el
      }), Physics.behavior("constant-acceleration"), Physics.behavior("body-impulse-response"), Physics.behavior("body-collision-detection"), Physics.behavior("sweep-prune"), edgeBounce, attractor
    ]);
    Physics.util.ticker.on(function(time) {
      world.step(time);
    });
    Physics.util.ticker.start();
  });

}).call(this);
