module Jekyll
  class AsideBlock < Liquid::Block
    def initialize(tag_name, type, tokens)
      super
      @type = type.empty? ? "notice" : type.strip
    end

    def render(context)
      converter = context.registers[:site].converters.find { |c| c.matches("md") }
      "<div class='#{@type}'>#{converter.convert(super.join)}</div>"
    end
  end
end

Liquid::Template.register_tag('aside', Jekyll::AsideBlock)
