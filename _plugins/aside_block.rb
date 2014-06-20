module Jekyll
  class AsideBlock < Liquid::Block
    def initialize tag_name, text, tokens
      super
      @type = text.empty? ? "notice" : text.strip
    end

    def render context
      site = context.registers[:site]
      converter = site.getConverterImpl ::Jekyll::Converters::Markdown
      "<div class='#{@type}'>#{converter.convert(super)}</div>"
    end
  end
end

Liquid::Template.register_tag "aside", Jekyll::AsideBlock
