# Homepage Switchboard
Physics
  timestep: 0.25
, (world) ->

  # bounds of the window
  # create a renderer
  # add the renderer
  # render on each step
  # constrain objects to these bounds
  # resize events

  # update the boundaries
  random = (min, max) ->
    (Math.random() * (max - min) + min) | 0
  dropInBody = (number) ->
    body = undefined
    switch number
      #add a circle
      when 0
        body = Physics.body("circle",
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          radius: 60
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#d93d4b"
            lineWidth: 2
            #angleIndicator: "#d93d4b"
        )
        body.options =
          href: 'http://outwithsprout.com'
        body.view = new Image()
        body.view.src = '/images/shape-ows.svg'

      # add a square for interface school
      when 5
        body = Physics.body("rectangle",
          width: 120
          height: 100
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: '#80b668'
            lineWidth: 2
            #angleIndicator: "#80b668"
        )
        body.options =
          href: 'http://interfaceschool.com'
        body.view = new Image()
        body.view.src = '/images/shape-interface.svg'

      # blog shape
      when 3
        body = Physics.body("convex-polygon",
          vertices: blog
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#cba72c"
            lineWidth: 2
        )
        body.options =
          href: 'http://blog.jerodsanto.net'
        body.view = new Image()
        body.view.src = '/images/shape-blog.svg'

      # github shape
      when 4
        body = Physics.body("convex-polygon",
          vertices: github
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#7196BF"
            lineWidth: 2
        )
        body.options =
          href: 'http://github.com/jerodsanto'
        body.view = new Image()
        body.view.src = '/images/shape-github.svg'

      # changelog shape
      when 6
        body = Physics.body("rectangle",
          width: 136
          height: 56
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: '#9fbaa2'
            lineWidth: 2
        )
        body.options =
          href: 'http://changelog.com/'
        body.view = new Image()
        body.view.src = '/images/shape-changelog.svg'

      # rdio shape
      when 1
        body = Physics.body("convex-polygon",
          vertices: rdio
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#BA8AB7"
            lineWidth: 2
        )
        # body.options =
        #   href: 'http://rdio.com/jerodsanto'
        # body.view = new Image()
        # body.view.src = '/images/shape-rdio.svg'

      # twitter shape
      when 2
        body = Physics.body("convex-polygon",
          vertices: twitter
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#2CA4B5"
            lineWidth: 2
        )
        body.options =
          href: 'http://twitter.com/jerodsanto'
        body.view = new Image()
        body.view.src = '/images/shape-twitter.svg'

      # Object Lateral
      when 7
        body = Physics.body("convex-polygon",
          vertices: heptagon
          x: viewWidth / 2
          y: viewHeight / 2
          vx: random(-5, 5) / 100
          restitution: 0.9
          styles:
            fillStyle: "transparent"
            strokeStyle: "#1ead9a"
            lineWidth: 2
            #angleIndicator: "#1ead9a"
        )
        # body.options =
        #   href: 'http://objectlateral.com'
        # body.view = new Image()
        # body.view.src = '/images/shape-objectlateral.svg'

    world.add body
    return
  viewWidth = window.innerWidth
  viewHeight = window.innerHeight - 84
  viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
  center = Physics.vector(viewWidth, viewHeight).mult(0.5)
  edgeBounce = undefined
  renderer = undefined
  renderer = Physics.renderer("canvas",
    el: "switchboard"
    width: viewWidth
    height: viewHeight
  )
  world.add renderer
  world.on "step", ->
    world.render()
    return

  edgeBounce = Physics.behavior("edge-collision-detection",
    aabb: viewportBounds
    restitution: 0.2
    cof: 0.8
  )
  window.addEventListener "resize", (->
    viewWidth = window.innerWidth
    viewHeight = window.innerHeight - 84
    renderer.el.width = viewWidth
    renderer.el.height = viewHeight
    viewportBounds = Physics.aabb(0, 0, viewWidth, viewHeight)
    edgeBounce.setAABB viewportBounds
    return
  ), true

  heptagon = [
    { x: 37.8, y: 0.7 }
    { x: 90.7, y: 6.1 }
    { x: 119.4, y: 50.8 }
    { x: 102.4, y: 101.2 }
    { x: 52.4, y: 119.3 }
    { x: 7.1, y: 91.5 }
    { x: 0.6, y: 38.7 }
  ]
  blog = [
    { x: 73, y: 92 }
    { x: 1.9, y: 46.5 }
    { x: 73, y: 1.1 }
    { x: 144.2, y: 46.5 }
  ]
  github = [
    { x: 277.3, y: 89.7 }
    { x: 211.7, y: 28.7 }
    { x: 277.3, y: -33.4 }
    { x: 342.9, y: 28.7 }
  ]
  rdio = [
    { x: 0, y: 104 }
    { x: 0, y: 0 }
    { x: 91, y: 52 }
    { x: 0, y: 104 }
  ]
  twitter = [
    { x: -40, y: 64 }
    { x: 0, y: 0 }
    { x: 120, y: 0 }
    { x: 80, y: 64 }
    { x: -40, y: 64 }
  ]

  int = setInterval(->
    clearInterval int  if world._bodies.length > 9
    dropInBody(world._bodies.length)
    return
  , 10)

  # add some fun interaction
  # attract bodies to a point
  attractor = Physics.behavior("attractor",
    pos: center
    strength: 1
    order: 1
  )
  world.on
    "interact:grab": (data) ->
      grabbed = data.body # the body that was grabbed
      href = grabbed.options.href
      document.location.href = href
      return

    "interact:poke": (pos) ->
      attractor.position pos
      return

  # add things to the world
  world.add [
    Physics.behavior("interactive",
      el: renderer.el
    )
    Physics.behavior("constant-acceleration")
    Physics.behavior("body-impulse-response")
    Physics.behavior("body-collision-detection")
    Physics.behavior("sweep-prune")
    edgeBounce
    attractor
  ]

  # subscribe to ticker to advance the simulation
  Physics.util.ticker.on (time) ->
    world.step time
    return

  # start the ticker
  Physics.util.ticker.start()
  return
