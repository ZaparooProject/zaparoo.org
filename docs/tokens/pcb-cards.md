---
description: "Custom PCB game cards for Zaparoo: order PCB blanks, add NFC stickers, and print labels for a unique physical game collection."
keywords: [zaparoo pcb cards, custom nfc game cards, pcb nfc zaparoo, diy game cards]
---

# PCB Cards

<img className="docHeroImage" src="/img/docs/tokens/PCB_cards_with_NFC_card.jpg" alt="PCB cards with an NFC card" width="300" />

PCB cards are custom circuit-board blanks that you can turn into Zaparoo tokens with an NFC sticker and a printed label. The Switch-sized cards need smaller rectangular NFC stickers. Medium cards have more room and can use a wider range of NFC sticker shapes.

The PCB cards project for Zaparoo was created by [TheTrain](https://github.com/TheTrainGoes).

## Ordering

### Which PCB type to order?

These cards are designed around small PCB runs from JLCPCB. The files in the hardware repo include Switch and Medium card designs.

JLCPCB's low-cost options change over time, but the main tradeoff is usually board layer count, finish, color, and maximum board size. Green 6-layer PCBs with ENIG gold finish can be a good fit for small cards when that offer is available. Other colors or larger cards may need 2-layer PCB options instead.

JLCPCB's 2-layer PCB options usually support larger board sizes, but the standard finish is silver instead of gold.

Download the Gerber files from the Zaparoo hardware repo and upload them to your PCB manufacturer:

- [Switch Card PCB](https://github.com/ZaparooProject/zaparoo-hardware/tree/main/pcb-cards/Switch%20Card%20PCB)
- [Medium Card PCB](https://github.com/ZaparooProject/zaparoo-hardware/tree/main/pcb-cards/Medium%20Card%20PCB)

<Gallery photos={[
  {
    src: "/img/docs/tokens/Full_size_PCB_cards.jpg",
    width: 1845,
    height: 1805,
    alt: "Full-size PCB cards"
  },
  {
    src: "/img/docs/tokens/Medium_size_PCB_cards.jpg",
    width: 2784,
    height: 2816,
    alt: "Medium-size PCB cards"
  },
  {
    src: "/img/docs/tokens/Switch_size_PCB_cards.jpg",
    width: 2552,
    height: 2552,
    alt: "Switch-size PCB cards"
  }
]} />

### 2-layer PCBs from JLCPCB

1. Go to [JLCPCB.com](https://jlcpcb.com/).
2. Click **Order Now**.
3. Click **Add Gerber file** and choose the Gerber zip you want to fabricate.
4. Choose the following options for the board:
   - Base Material = FR-4
   - Layers = 2 (should auto-populate)
   - Dimensions = (should auto-populate)
      - 21.5mm x 31.1mm for the Switch cards
      - 30.25mm x 50.25mm for the medium-sized cards
   - PCB Qty = 5
   - Product Type = Industrial/Consumer electronics
   - Different Design = 1
   - Delivery Format = Single PCB
   - PCB Thickness = 1.6mm
   - PCB Color = any color you like
   - Silkscreen = (defaults to white for all except white boards which is black)
   - Surface Finish = HASL(with lead)
   - Outer Copper Weight = 1oz
   - Via Covering = Tented
   - Board Outline Tolerance = +0.2mm(regular)
   - Confirm Production file = No
   - Remove Order Number = Yes
   - Flying Probe Test = Fully Test
   - Gold Fingers = No
   - Castellated Holes = No
   - Edge Plating = No
   - No advanced options
5. Click **Save to Cart**.
6. Go through checkout and choose Global Standard Direct Line shipping if you want to keep costs low.

### 6-layer PCBs from JLCPCB

1. Go to [JLCPCB.com](https://jlcpcb.com/).
2. Click **Order Now**.
3. Click **Add Gerber file** and choose the Gerber zip you want to fabricate.
4. Choose the following options for the board:
   - Base Material = FR-4
   - Layers = 6 (should auto-populate)
   - Dimensions = (should auto-populate)
      - 21.5mm x 31.1mm for the Switch cards
      - 30.25mm x 50.25mm for the medium-sized cards
   - PCB Qty = 5
   - Product Type = Industrial/Consumer electronics
   - Different Design = 1
   - Delivery Format = Single PCB
   - PCB Thickness = 1.6mm
   - PCB Color = Green
   - Silkscreen = White
   - Surface Finish = ENIG
   - Gold Thickness = 2 U"
   - Outer Copper Weight = 1 oz
   - Inner Copper Weight = 0.5 oz
   - Specific Layer Sequence = No
   - Impedance Control = No
   - Via Covering = Epoxy Filled & Capped
   - Min via hole size/diameter = 0.3mm/(0.4/0.45mm)
   - Board Outline Tolerance = +0.2mm(Regular)
   - Confirm Production file = No
   - Remove Order Number = Specify a location
   - Flying Probe Test = Fully Test
   - Gold Fingers = No
   - Castellated Holes = No
   - Edge Plating = No
5. Click **Save to Cart**.
6. Go through checkout and choose Global Standard Direct Line shipping if you want to keep costs low.

## Labels

See the [Labels](../labels/index.md) page for advice on designing and printing card labels.

Label dimensions:

- Switch: 20mm x 20mm
- Medium: 28mm x 28mm
