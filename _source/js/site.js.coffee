$(document).on "ready", ->
  JMS.init()

JMS =
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
    JMS.randomBGPosition()

  init: ->
    JMS.onLoad()

    $('.service_hackernews a, .service_instapaper a').click ->
      JMS.sharePopup $(this).attr 'href'
      false

    $(".highlight").each ->
      $this = $(this)
      $this.wrap "<div class='highlight-wrap' />"
      $this.wrap "<div class='highlight-scroll-wrap' />"
      snippetWidth = $this.outerWidth()
      $this.parent(".highlight-scroll-wrap").css "width", snippetWidth

    # Swiftype Autocomplete
    $("#st-search-input").swiftypeSearch
      resultContainingElement: '#search-results'
      engineKey: "TM8ezPQi8DZRuszeAPuU"
      perPage: 10

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

    $(".reveal-button").on "click", "a", (event) ->
      event.preventDefault()
      $content = $(this).parent().next(".reveal-content")
      html = $content.data("content")
      $content.html(html).removeData("content").slideDown "slow", "easeOutBounce"
      $(this).remove()
      return

    $("iframe").css("width", "100%")

    # Focus on Search form when landing on Search page
    $('.search-form input').focus()
