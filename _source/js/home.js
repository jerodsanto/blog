(function() {
  Physics({
    timestep: 0.7
  }, function(world) {
    var attractor, blog, center, dropInBody, edgeBounce, github, heptagon, int, random, rdio, renderer, twitter, viewHeight, viewWidth, viewportBounds;
    random = function(min, max) {
      return (Math.random() * (max - min) + min) | 0;
    };
    dropInBody = function(number) {
      var body;
      body = void 0;
      switch (number) {
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
          body.view.src = '/images/shape-ows.svg';
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
          body.options = {
            href: 'http://interfaceschool.com'
          };
          body.view = new Image();
          body.view.src = '/images/shape-interface.svg';
          break;
        case 3:
          body = Physics.body("convex-polygon", {
            vertices: blog,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#cba72c",
              lineWidth: 2
            }
          });
          body.options = {
            href: 'http://blog.jerodsanto.net'
          };
          body.view = new Image();
          body.view.src = '/images/shape-blog.svg';
          break;
        case 4:
          body = Physics.body("convex-polygon", {
            vertices: github,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#7196BF",
              lineWidth: 2
            }
          });
          body.options = {
            href: 'http://github.com/jerodsanto'
          };
          body.view = new Image();
          body.view.src = '/images/shape-github.svg';
          break;
        case 5:
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
          body.options = {
            href: 'http://changelog.com/'
          };
          body.view = new Image();
          body.view.src = '/images/shape-changelog.svg';
          break;
        case 6:
          body = Physics.body("convex-polygon", {
            vertices: rdio,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#BA8AB7",
              lineWidth: 2
            }
          });
          break;
        case 2:
          body = Physics.body("convex-polygon", {
            vertices: twitter,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#2CA4B5",
              lineWidth: 2
            }
          });
          body.options = {
            href: 'http://twitter.com/jerodsanto'
          };
          body.view = new Image();
          body.view.src = '/images/shape-twitter.svg';
          break;
        case 7:
          body = Physics.body("convex-polygon", {
            vertices: heptagon,
            x: viewWidth / 2,
            y: viewHeight / 2,
            vx: random(-5, 5) / 100,
            restitution: 0.9,
            styles: {
              fillStyle: "transparent",
              strokeStyle: "#1ead9a",
              lineWidth: 2
            }
          });
          body.options = {
            href: 'http://objectlateral.com'
          };
          body.view = new Image();
          body.view.src = '/images/shape-objectlateral.svg';
      }
      world.add(body);
    };
    viewWidth = window.innerWidth;
    viewHeight = window.innerHeight - 84;
    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
    center = Physics.vector(viewWidth, viewHeight).mult(0.5);
    edgeBounce = void 0;
    renderer = void 0;
    renderer = Physics.renderer("canvas", {
      el: "switchboard",
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
      viewHeight = window.innerHeight - 84;
      renderer.el.width = viewWidth;
      renderer.el.height = viewHeight;
      viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight);
      edgeBounce.setAABB(viewportBounds);
    }), true);
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
    rdio = [
      {
        x: 0,
        y: 104
      }, {
        x: 0,
        y: 0
      }, {
        x: 91,
        y: 52
      }, {
        x: 0,
        y: 104
      }
    ];
    twitter = [
      {
        x: -40,
        y: 64
      }, {
        x: 0,
        y: 0
      }, {
        x: 120,
        y: 0
      }, {
        x: 80,
        y: 64
      }, {
        x: -40,
        y: 64
      }
    ];
    int = setInterval(function() {
      if (world._bodies.length > 9) {
        clearInterval(int);
      }
      dropInBody(world._bodies.length);
    }, 10);
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
        document.location.href = href;
      },
      "interact:poke": function(pos) {
        attractor.position(pos);
      }
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
