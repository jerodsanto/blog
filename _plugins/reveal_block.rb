module Jekyll
  class RevealBlock < Liquid::Block
    def initialize tag_name, text, tokens
      super
      @button_content = text.empty? ? "Reveal Answer" : text
    end

    def render context
      site = context.registers[:site]
      page = context.environments.first["page"]
      converter = site.getConverterImpl ::Jekyll::Converters::Markdown
      content = converter.convert super

      anchor = "#{site.config['url']}#{page['url']}#reveal"

      html  = "<div class='reveal-button'>"
      html += "<a href='#{anchor}'>#{@button_content}</a>"
      html += "</div>"

      html += "<div class='reveal-content' data-content='#{content}'></div>"
      html
    end
  end
end

Liquid::Template.register_tag "reveal", Jekyll::RevealBlock
