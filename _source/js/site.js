(function() {
  var Edge, Polygon, Vector, blog;

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

  /*
  
    Demonstrates collision detection between convex and non-convex polygons
    and how to detect whether a point vector is contained within a polygon
  
    Possible techniques:
  
      x Bounding box or radii
        Inacurate for complex polygons
  
      x SAT (Separating Axis Theorem)
        Only handles convex polygons, so non-convex polygons must be subdivided
  
      x Collision canvas. Draw polygon A then polygon B using `source-in`
        Slow since it uses getImageData and pixels must be scanned. Algorithm
        can be improved by drawing to a smaller canvas but downsampling effects
        accuracy and using canvas transformations (scale) throws false positives
  
      - Bounding box + line segment intersection
        Test bounding box overlap (fast) then proceed to per edge intersection
        detection if necessary. Exit after first intersection is found since
        we're not simulating collision responce. This technique fails to detect
        nested polygons, but since we're testing moving polygons it's ok(ish)
  */


  Vector = (function() {
    function Vector(x, y) {
      this.x = x;
      this.y = y;
      this.set(x, y);
    }

    Vector.prototype.set = function(x, y) {
      this.x = x != null ? x : 0.0;
      this.y = y != null ? y : 0.0;
      return this;
    };

    Vector.prototype.add = function(vector) {
      this.x += vector.x;
      this.y += vector.y;
      return this;
    };

    Vector.prototype.scale = function(scalar) {
      this.x *= scalar;
      this.y *= scalar;
      return this;
    };

    Vector.prototype.div = function(scalar) {
      this.x /= scalar;
      this.y /= scalar;
      return this;
    };

    Vector.prototype.dot = function(vector) {
      return this.x * vector.x + this.y * vector.y;
    };

    Vector.prototype.min = function(vector) {
      this.x = min(this.x, vector.x);
      return this.y = min(this.y, vector.y);
    };

    Vector.prototype.max = function(vector) {
      this.x = max(this.x, vector.x);
      return this.y = max(this.y, vector.y);
    };

    Vector.prototype.lt = function(vector) {
      return this.x < vector.x || this.y < vector.y;
    };

    Vector.prototype.gt = function(vector) {
      return this.x > vector.x || this.y > vector.y;
    };

    Vector.prototype.normalize = function() {
      var mag;
      mag = sqrt(this.x * this.x + this.y * this.y);
      if (mag !== 0) {
        this.x /= mag;
        return this.y /= mag;
      }
    };

    Vector.prototype.clone = function() {
      return new Vector(this.x, this.y);
    };

    return Vector;

  })();

  Edge = (function() {
    function Edge(pointA, pointB) {
      this.pointA = pointA;
      this.pointB = pointB;
    }

    Edge.prototype.intersects = function(other, ray) {
      var d, dx1, dx2, dx3, dy1, dy2, dy3, r, s;
      if (ray == null) {
        ray = false;
      }
      dy1 = this.pointB.y - this.pointA.y;
      dx1 = this.pointB.x - this.pointA.x;
      dx2 = this.pointA.x - other.pointA.x;
      dy2 = this.pointA.y - other.pointA.y;
      dx3 = other.pointB.x - other.pointA.x;
      dy3 = other.pointB.y - other.pointA.y;
      if (dy1 / dx1 !== dy3 / dx3) {
        d = dx1 * dy3 - dy1 * dx3;
        if (d !== 0) {
          r = (dy2 * dx3 - dx2 * dy3) / d;
          s = (dy2 * dx1 - dx2 * dy1) / d;
          if (r >= 0 && (ray || r <= 1)) {
            if (s >= 0 && s <= 1) {
              return new Vector(this.pointA.x + r * dx1, this.pointA.y + r * dy1);
            }
          }
        }
      }
      return false;
    };

    return Edge;

  })();

  Polygon = (function() {
    function Polygon(vertices, edges) {
      this.vertices = vertices != null ? vertices : [];
      this.edges = edges != null ? edges : [];
      this.colliding = false;
      this.center = new Vector;
      this.bounds = {
        min: new Vector,
        max: new Vector
      };
      this.edges = [];
      if (this.vertices.length > 0) {
        this.computeCenter();
        this.computeBounds();
        this.computeEdges();
      }
    }

    Polygon.prototype.translate = function(vector) {
      var vertex, _i, _len, _ref, _results;
      this.center.add(vector);
      this.bounds.min.add(vector);
      this.bounds.max.add(vector);
      _ref = this.vertices;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vertex = _ref[_i];
        _results.push(vertex.add(vector));
      }
      return _results;
    };

    Polygon.prototype.computeCenter = function() {
      var vertex, _i, _len, _ref;
      this.center.set(0, 0);
      _ref = this.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vertex = _ref[_i];
        this.center.add(vertex);
      }
      return this.center.div(this.vertices.length);
    };

    Polygon.prototype.computeBounds = function() {
      var vertex, _i, _len, _ref, _results;
      this.bounds.min.set(Number.MAX_VALUE, Number.MAX_VALUE);
      this.bounds.max.set(-Number.MAX_VALUE, -Number.MAX_VALUE);
      _ref = this.vertices;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vertex = _ref[_i];
        this.bounds.min.min(vertex);
        _results.push(this.bounds.max.max(vertex));
      }
      return _results;
    };

    Polygon.prototype.computeEdges = function() {
      var index, vertex, _i, _len, _ref, _results;
      this.edges.length = 0;
      _ref = this.vertices;
      _results = [];
      for (index = _i = 0, _len = _ref.length; _i < _len; index = ++_i) {
        vertex = _ref[index];
        _results.push(this.edges.push(new Edge(vertex, this.vertices[(index + 1) % this.vertices.length])));
      }
      return _results;
    };

    Polygon.prototype.contains = function(vector) {
      var edge, intersections, minX, minY, outside, ray, _i, _len, _ref,
        _this = this;
      if (vector.x > this.bounds.max.x || vector.x < this.bounds.min.x) {
        return false;
      }
      if (vector.y > this.bounds.max.y || vector.y < this.bounds.min.y) {
        return false;
      }
      minX = function(o) {
        return o.x;
      };
      minY = function(o) {
        return o.y;
      };
      outside = new Vector(Math.min.apply(Math, this.vertices.map(minX)) - 1, Math.min.apply(Math, this.vertices.map(minY)) - 1);
      ray = new Edge(vector, outside);
      intersections = 0;
      _ref = this.edges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        edge = _ref[_i];
        if (ray.intersects(edge, true)) {
          ++intersections;
        }
      }
      return !!(intersections % 2);
    };

    Polygon.prototype.collides = function(polygon) {
      var edge, other, overlap, _i, _j, _len, _len1, _ref, _ref1;
      overlap = true;
      if (polygon.bounds.min.gt(this.bounds.max)) {
        overlap = false;
      }
      if (polygon.bounds.max.lt(this.bounds.min)) {
        overlap = false;
      }
      overlap = false;
      _ref = this.edges;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        edge = _ref[_i];
        _ref1 = polygon.edges;
        for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
          other = _ref1[_j];
          if (edge.intersects(other)) {
            return true;
          }
        }
      }
      return false;
    };

    Polygon.prototype.wrap = function(bounds) {
      var ox, oy;
      ox = (this.bounds.max.x - this.bounds.min.x) + (bounds.max.x - bounds.min.x);
      oy = (this.bounds.max.y - this.bounds.min.y) + (bounds.max.y - bounds.min.y);
      if (this.bounds.max.x < bounds.min.x) {
        this.translate(new Vector(ox, 0));
      } else if (this.bounds.min.x > bounds.max.x) {
        this.translate(new Vector(-ox, 0));
      }
      if (this.bounds.max.y < bounds.min.y) {
        return this.translate(new Vector(0, oy));
      } else if (this.bounds.min.y > bounds.max.y) {
        return this.translate(new Vector(0, -oy));
      }
    };

    Polygon.prototype.draw = function(ctx) {
      var color, vertex, _i, _len, _ref;
      color = this.colliding ? '#FF0051' : this.color;
      ctx.strokeStyle = color;
      ctx.fillStyle = color;
      ctx.beginPath();
      _ref = this.vertices;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        vertex = _ref[_i];
        ctx.lineTo(vertex.x, vertex.y);
      }
      ctx.closePath();
      ctx.globalAlpha = 0;
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.lineWidth = 2;
      return ctx.stroke();
    };

    return Polygon;

  })();

  Sketch.create({
    COLORS: ['#d93d4b', '#d16936', '#cca712', '#80b668', '#9fbaa2', '#2da4b6', '#1ead9a'],
    bounds: {
      min: new Vector,
      max: new Vector
    },
    makePolygon: function() {
      var mv, polygon, radius, side, sides, step, theta, vertices, _i, _ref;
      sides = random(4, 7);
      step = TWO_PI / sides;
      mv = 100;
      vertices = [];
      for (side = _i = 0, _ref = sides - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; side = 0 <= _ref ? ++_i : --_i) {
        theta = (step * side) + random(step);
        radius = random(30, 90);
        vertices.push(new Vector(radius * cos(theta), radius * sin(theta)));
      }
      polygon = new Polygon(vertices);
      polygon.translate(new Vector(random(this.width), random(this.height)));
      polygon.velocity = new Vector(random(-mv, mv), random(-mv, mv));
      polygon.color = random(this.COLORS);
      return polygon;
    },
    setup: function() {
      var i;
      return this.polygons = (function() {
        var _i, _results;
        _results = [];
        for (i = _i = 0; _i <= 12; i = ++_i) {
          _results.push(this.makePolygon());
        }
        return _results;
      }).call(this);
    },
    draw: function() {
      var dts, index, n, other, polygon, _i, _j, _k, _len, _len1, _ref, _ref1, _ref2, _ref3, _results;
      dts = max(0, this.dt / 6000);
      this.globalCompositeOperation = 'lighter';
      _ref = this.polygons;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        polygon = _ref[_i];
        polygon.colliding = false;
      }
      _ref1 = this.polygons;
      _results = [];
      for (index = _j = 0, _len1 = _ref1.length; _j < _len1; index = ++_j) {
        polygon = _ref1[index];
        polygon.translate(polygon.velocity.clone().scale(dts));
        if (!polygon.colliding) {
          for (n = _k = _ref2 = index + 1, _ref3 = this.polygons.length - 1; _k <= _ref3; n = _k += 1) {
            other = this.polygons[n];
            if (polygon.collides(other)) {
              polygon.colliding = true;
              other.colliding = true;
            }
          }
        }
        _results.push(polygon.draw(this));
      }
      return _results;
    },
    resize: function() {
      return this.bounds.max.set(this.width, this.height);
    }
  });

}).call(this);
