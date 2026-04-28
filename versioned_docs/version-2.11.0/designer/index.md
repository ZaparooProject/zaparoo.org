---
description: "Zaparoo Designer is a free web app for creating custom Zaparoo card label artwork with SVG templates. No account required."
keywords: [zaparoo designer, nfc card labels, game card labels, zaparoo label maker, custom nfc card art]
---

# Zaparoo Designer

Zaparoo Designer is a web app for creating custom [labels](../labels/index.md) for your [Zaparoo NFC cards](../tokens/nfc/index.md). Use it to build one label or a full set from SVG templates, then export files for printing at home, through a print shop, or with a plotter cutter.

## Features

- No login or account required
- Local image files stay in your browser; built-in artwork search uses external services
- Create custom labels from SVG-based templates
- Choose from a variety of community-contributed templates with different layouts and styles
- Customize colors, layouts, and media types
- Search for game artwork from [IGDB](https://igdb.com)
- Export print-ready files in PDF or PNG formats with printer/plotter configuration options
- Use media sizes for standard NFC cards, slim NFC cards, mini cards, Zap Trading Cards, cassette tape cases, foldable sleeves, and supported PCB card designs

## Getting started

1. Navigate to [Zaparoo Designer](https://design.zaparoo.org/)
2. Select **Add files** to upload a local image or **Search image** to find game artwork from IGDB
3. Choose a template that matches your media type (horizontal or vertical layouts available)
4. Customize colors, layout, and other template options
5. Repeat steps 2-4 for each label you want to create in this session
6. Select **Print** and configure the output that works best for your printer or plotter
7. Press **Download** to get your PDF file or ZIP of PNG files
8. Print the output files on your printer

## Template system

The Designer uses SVG templates with image placeholders and media definitions:

- Community templates can include their own license information
- Templates can use horizontal or vertical layouts
- Image placeholders control where artwork is placed and whether it fits or covers the placeholder area
- Media definitions set the target size, such as a standard NFC card, mini card, cassette tape case, or foldable sleeve

## Contributing templates

Interested in creating your own templates? Templates use SVG format with special `zaparoo-placeholder` attributes for image positioning. Contributed templates must include license information and cannot contain copyrighted material or infringe trademarks. See the [template creation guide](https://github.com/ZaparooProject/zaparoo-designer/blob/main/TEMPLATES.md) in the repository for detailed instructions.

Once you have your designs ready, see the [printing guide](../labels/printing-guide.md) for tips on printing and applying your labels to NFC cards and [PCB cards](../tokens/pcb-cards).
