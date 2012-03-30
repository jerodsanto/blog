module Jekyll
  class AsideBlock < Liquid::Block
    def initialize(tag_name, text, tokens)
      super
      @type = text.empty? ? "notice" : text.strip
    end

    def render(context)
      converter = context.registers[:site].converters.find { |c| c.matches("md") }
      "<div class='#{@type}'>#{converter.convert(super)}</div>"
    end
  end
end

Liquid::Template.register_tag("aside", Jekyll::AsideBlock)
