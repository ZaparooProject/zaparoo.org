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
- Search [IGDB](https://igdb.com) for game artwork and metadata
- Search [SteamGridDB](https://www.steamgriddb.com/) for game images and logos
- Export print-ready files in PDF or PNG formats with printer/plotter configuration options
- Use media sizes for standard NFC cards, slim NFC cards, mini cards, Zap Trading Cards, cassette tape cases, foldable sleeves, and supported PCB card designs

## Community creations

Zaparoo users have turned Designer output into cards, cassette packaging, and foldable sleeves:

<Gallery media={[
  { src: "/img/showcase/Schlarp_game_cards.webp", width: 1200, height: 900, alt: "Collection of game-themed NFC cards made with Zaparoo Designer" },
  { src: "/img/showcase/wonderloid3455_first_card_case.webp", width: 901, height: 1200, alt: "Matching arcade-themed NFC card and cassette case" },
  { src: "/img/showcase/Zag_sleeve1.webp", width: 546, height: 1200, alt: "Printed foldable sleeve for an NFC card" },
]} />

*Creations by Schlarp from [Community Showcase #2](/blog/community-showcase-2), wonderloid3455 from [Community Showcase #5](/blog/community-showcase-5), and Zag from [Community Showcase #3](/blog/community-showcase-3).*

## Create a card

1. Open [Zaparoo Designer](https://design.zaparoo.org/).
2. Select **IGDB** or **Steam**, then enter a game name and choose an image. IGDB includes game metadata with its artwork. Steam searches SteamGridDB for images and logos. Designer creates a card from the selected image.
3. Open **Templates** and choose a template that matches your card or packaging size.
4. Click the card to edit it.
5. Select **Game** to replace or add cover art, screenshots, platform logos, and other images from the selected game.
6. Use **Logos** for company logos or **Consoles** for built-in console and controller artwork.
7. Select **Edit** to work with individual layers, add text, change text or shape colors, rotate a layer, reorder it, or delete it.
8. Select **Confirm** to keep the card changes.

You can also drag a local image file into Designer or paste an image from the clipboard. When you add artwork while a card is open, it becomes a layer that you can position and resize on the canvas.

## Templates, images, and layers

A template defines the physical media size and the arrangement of its placeholders. Choosing a game fills supported placeholders with its main image and metadata. Changing the template applies its layout to the card, while added logos, console art, text, and other images remain editable layers.

Click a card to open its canvas. Select a layer on the canvas or in the **Edit** panel, then drag its handles to resize or reposition it. The Edit tools can rotate the selected layer, move it forward or backward, or remove it.

Use the **Game** panel when the selected game has another cover, screenshot, artwork, or platform logo that fits the design better. Selecting another IGDB game while editing replaces the card's game data and main image.

## Build a collection

Use the duplicate button below a card to copy its template and current layout. Open the copy, search for the next game in **IGDB**, and select that game to replace the game-specific content. This is faster than rebuilding a shared design for every card.

Designer has no account or saved-project format. Cards exist only in the current browser session and cannot be reopened after the page is closed or refreshed. Export completed work before leaving the page.

## Export and print

Select **Print** after creating your cards. Designer offers:

- **PDF** for a print-ready page layout. Vector output preserves template shapes and source image quality. Raster output renders each complete label at 300 DPI and can better match effects that vector output does not support.
- **ZIP file** for separate label images when you want to arrange them in other software or use a custom printing workflow.

Transparent PNG artwork can still produce an unexpected rectangular background in a printer driver or PDF workflow. If that happens, try raster PDF output, flatten the completed card to one image, or use vector artwork for the affected logo.

Print PDFs at **100%** or **Actual size**, not **Fit to page**. See the [printing guide](../labels/printing-guide.md) for paper, protection, cutting, alignment, and printer settings.

## Template system

The Designer uses SVG templates with image placeholders and media definitions:

- Community templates can include their own license information
- Templates can use horizontal or vertical layouts
- Image placeholders control where artwork is placed and whether it fits or covers the placeholder area
- Media definitions set the target size, such as a standard NFC card, mini card, cassette tape case, or foldable sleeve

## Contributing templates

Interested in creating your own templates? Templates use SVG format with special `zaparoo-placeholder` attributes for image positioning. Contributed templates must include license information and cannot contain copyrighted material or infringe trademarks. See the [template creation guide](https://github.com/ZaparooProject/zaparoo-designer/blob/main/TEMPLATES.md) in the repository for detailed instructions.

Once you have your designs ready, see the [printing guide](../labels/printing-guide.md) for tips on printing and applying your labels to NFC cards and [PCB cards](../tokens/pcb-cards).
