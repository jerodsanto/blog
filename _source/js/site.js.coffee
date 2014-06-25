$(document).on "ready", ->
  blog.init()

blog =
  sharePopup: (href) ->
    w = 600
    h = 300
    left = (screen.width / 2) - (w / 2)
    top = (screen.height / 2) - (h / 2)
    shareWindow = window.open(
      href
      'jerod'
      'location=1,status=1,scrollbars=1,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left
    )
    return false

  randomBGPosition: ->
    $body = $('body')
    $body.addClass 'show-bg'
    randomX = Math.floor(Math.random() * 1000)
    randomY = Math.floor(Math.random() * 1000)
    $body.css 'background-position', randomX + 'px ' + randomY + 'px'

  onLoad: ->
    $.bigfoot()
    blog.randomBGPosition()

  init: ->
    blog.onLoad()

    $('.service_hackernews a, .service_instapaper a').click ->
      blog.sharePopup $(this).attr 'href'
      false

    $('.highlight').wrap '<div class="highlight-wrap"></div>'

    # TODO: Blog home only
    randos = [
      "Whathaveyou"
      "Tomfoolery"
      "Jetsam"
      "Rants"
      "Highjinks"
      "Flotsam"
      "Rando Calrissian"
    ]
    $("#rando").text randos[Math.floor(Math.random() * randos.length)]

    $("#content img").each ->
      $self = $(this)
      $self.parent().after "<p class='caption'>" + $self.attr("alt") + "</p>"
      return

class blog.Controller
