---
description: "Zaparoo Designer is a free web app for creating custom Zaparoo card label artwork with SVG templates. No account required."
keywords: [zaparoo designer, nfc card labels, game card labels, zaparoo label maker, custom nfc card art]
---

# Zaparoo Designer

[Zaparoo Designer](https://design.zaparoo.org/) is a free web app for creating custom [labels](../labels/index.md) for your [Zaparoo NFC cards](../tokens/nfc/index.md). Use it to build one label or a full set from SVG templates, then export files for printing at home, through a print shop, or with a plotter cutter.

:::warning[Export before you leave]
Designer has no account and no saved-project format. Cards exist only in the current browser tab and are gone after you close or refresh it. Export finished work before leaving the page.
:::

## Features

- No login or account required
- Local image files stay in your browser; built-in artwork search uses external services
- Create custom labels from SVG-based templates
- Choose from a variety of community-contributed templates with different layouts and styles
- Customize colors, layouts, and media types
- Search [IGDB](https://igdb.com) for game artwork and metadata
- Search [SteamGridDB](https://www.steamgriddb.com/) for game images and logos
- Export a print-ready multipage PDF or a ZIP of PNG labels, with page size and crop mark options
- Use media sizes for standard NFC cards, slim NFC cards, mini cards, [upgrade stickers](../labels/index.md#upgrade-stickers), cassette tape cases, foldable sleeves, and the Retro Remake NFC PCB. Blank cards in these sizes are stocked in the <ProductLink href="https://shop.zaparoo.com/" store="shop">Zaparoo Shop</ProductLink>.

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
3. Open **Templates** and choose a template that matches your card or packaging size. A template applies to new cards; to change cards you already have, select them first (or use **Select all**). Changing the media type needs every card selected.
4. Click the card to edit it.
5. Select **Game** to replace or add cover art, screenshots, platform logos, and other images from the selected game.
6. Use **Logos** for company logos in several styles, or **Consoles** for built-in console and controller artwork.
7. Select **Edit** to work with individual layers, add text, change text or shape colors, rotate a layer, reorder it, or delete it.
8. Select **Confirm** in the card editor to keep the changes, or **Cancel** to discard them.

If the template supports it, the wand button under a card fills its title, description, platform logo, and company logo placeholders from the selected game.

You can also start without a search: **Add empty card** and **Upload a file** sit under the current template, and pasting a PNG or JPEG from the clipboard creates a new card. Images dragged from the Game or Logos panels onto an open card become layers you can position and resize on the canvas.

## Templates, images, and layers

A template defines the physical media size and the arrangement of its placeholders. Choosing a game fills supported placeholders with its main image and metadata. Changing the template applies its layout to the card, while added logos, console art, text, and other images remain editable layers.

Click a card to open its canvas. Select a layer on the canvas or in the **Edit** panel, then drag its handles to resize or reposition it. The Edit tools can rotate the selected layer, move it forward or backward, or remove it.

Use the **Game** panel when the selected game has another cover, screenshot, artwork, or platform logo that fits the design better. Selecting another IGDB game while editing replaces the card's game data. If the card already has artwork it keeps it and opens the Game panel so you can choose a new image; dragging a search result onto a card's thumbnail replaces its main image directly.

## Build a collection

Use the duplicate button below a card to copy its template and current layout. Open the copy, search for the next game in **IGDB** and select it, then pick its cover from the **Game** panel (or drag the search result onto the card's thumbnail to swap the image in one step). This is faster than rebuilding a shared design for every card.

## Export and print

Select **Print** after creating your cards. The print options are:

- **PDF** for a print-ready page layout. Vector output preserves template shapes and source image quality. Raster output renders each complete label at 300 DPI and includes the faint shadow around the image that vector output leaves out.
- **Zip file** for separate PNG labels when you want to arrange them in other software or use a custom printing workflow.
- **Cutting marks**: crop marks, an outline, both, or none. The outline also helps line up pre-cut stock.
- **Page size**: A4, A4 with ten slim NFC labels, Letter, 4 by 6, 5 by 7, 8 by 10 inches, or A3.

Vector or raster, cutting marks, and page size only apply to PDF output.

Transparent PNG artwork can still produce an unexpected rectangular background in a printer driver or PDF workflow. If that happens, try raster PDF output, flatten the completed card to one image, or use vector artwork for the affected logo.

Print PDFs at **100%** or **Actual size**, not **Fit to page**. See the [printing guide](../labels/printing-guide.md) for paper, protection, cutting, alignment, and printer settings.

## Troubleshooting

**My cards disappeared.** The page was closed, refreshed, or the tab was discarded. Designer keeps no cards between sessions (only your print options), so export as you go.

**A logo prints with a white or grey box behind it.** Transparent PNG artwork can pick up a background in some printer drivers and PDF workflows. Try raster PDF output, flatten the finished card to one image, or use a vector version of the logo.

**The printed label doesn't fit the card.** The PDF was scaled during printing. Print at 100% or Actual size with Fit to page off, and check one label against a card on plain paper first.

**The artwork sits over the chip area or edges.** Keep important elements inside the template's placeholders. The [label specifications](../labels/index.md#template-specifications) list the margins.

**The template didn't apply to my cards.** Templates apply to new cards. Select the existing cards (or **Select all**), then choose the template again.

**Game search finds nothing.** IGDB and SteamGridDB searches need an internet connection and match on the game's listed title. Try a shorter or alternate title, or drag in your own image.

## Template system

The Designer uses SVG templates with image placeholders and media definitions:

- Templates can use horizontal or vertical layouts
- Image placeholders control where artwork is placed and whether it fits or covers the placeholder area. Placeholders can be the main image, a screenshot, the platform logo, the company logo, the title, or the description, which is what the auto-fill wand fills in
- Media definitions set the target size, such as a standard NFC card, mini card, cassette tape case, or foldable sleeve

## Contributing templates

Interested in creating your own templates? Templates use SVG format with special `zaparoo-placeholder` attributes for image positioning. Contributed templates must include a license in an XML comment and cannot contain copyrighted material or infringe trademarks. See the [template creation guide](https://github.com/ZaparooProject/zaparoo-designer/blob/main/TEMPLATES.md) in the repository for detailed instructions.

Once you have your designs ready, see the [printing guide](../labels/printing-guide.md) for tips on printing and applying your labels to NFC cards and [PCB cards](../tokens/pcb-cards.md).

---

<SponsorCallout variant="sponsor" />
