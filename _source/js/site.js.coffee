$(document).on "ready", ->
  MicahMax.init()

MicahMax =
  randomPosition: (item, parent) ->
    # TODO

  equalHeight: (group) ->
    tallest = 0
    group
      .height("auto")
      .each ->
        thisHeight = $(this).height()
        if thisHeight > tallest
          tallest = thisHeight
      .height(tallest)

  sharePopup: (href) ->
    w = 600
    h = 300
    left = (screen.width / 2) - (w / 2)
    top = (screen.height / 2) - (h / 2)
    shareWindow = window.open(
      href
      'MicahMax'
      'location=1,status=1,scrollbars=1,width=' + w + ',height=' + h + ',top=' + top + ',left=' + left
    )
    return false

  onLoad: ->
    MicahMax.onResize()

  onResize: ->

  init: ->
    MicahMax.onLoad()
    $('.projects > a').mouseover( ->
      $this = $(this)
      projectColor = $this.data 'color'
      $(this).css 'color', projectColor
    ).mouseout ->
      $(this).css 'color', '#fff'

class MicahMax.Controller
