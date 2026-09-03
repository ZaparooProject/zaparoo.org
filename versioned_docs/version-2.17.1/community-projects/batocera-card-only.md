---
description: "Community recipe for a Batocera cabinet that shows an Insert Game Card screen while Zaparoo launches hidden games from physical tokens."
keywords: [batocera insert game card, batocera kiosk, zaparoo arcade cabinet, nfc only batocera]
---

# Card-Only Batocera Cabinet

This community recipe turns Batocera's visible system list into a single empty **Insert Game Card** system. Zaparoo Core continues indexing and launching the games hidden from EmulationStation, so the cabinet can be operated entirely with physical tokens.

This recipe adapts a card-only cabinet setup shared by Discord community member **BFOOT** to Batocera's current custom-system format.

:::warning Community customization
This is an EmulationStation customization, not an officially supported Zaparoo feature. Batocera or theme updates may require adjustments. Keep a copy of the custom configuration so you can remove it while troubleshooting or restore it after an update.
:::

## Before you start

Install Zaparoo Core and confirm that your tokens already launch games on [Batocera](../platforms/batocera/index.md). This recipe only changes what EmulationStation displays.

Batocera supports persistent system overlays named `es_systems_<name>.cfg` under `/userdata/system/configs/emulationstation/`. See Batocera's [Customize ES Systems](https://wiki.batocera.org/emulationstation:customize_systems) guide for the underlying format.

## Create the empty system

1. Create an empty folder at `/userdata/roms/igc`.
2. Find a current `<command>` line in `/usr/share/emulationstation/es_systems.cfg`. Copy the whole line. Batocera can change its Python and config-generator paths between releases, so do not reuse a command copied from an older guide.
3. Create `/userdata/system/configs/emulationstation/es_systems_nfc.cfg` with the following content. Replace the marked command line with the current line copied in the previous step.

```xml title="es_systems_nfc.cfg"
<?xml version="1.0"?>
<systemList>
  <system>
    <fullname>Insert Game Card</fullname>
    <name>insertgamecard</name>
    <manufacturer>Zaparoo</manufacturer>
    <hardware>console</hardware>
    <path>/userdata/roms/igc</path>
    <extension>.zip</extension>
    <!-- Replace this line with a current command from Batocera's es_systems.cfg. -->
    <command>COPY THE CURRENT BATOCERA COMMAND HERE</command>
    <platform>zaparoo</platform>
    <theme>insertgamecard</theme>
    <emulators>
      <emulator>
        <cores>
        </cores>
      </emulator>
    </emulators>
  </system>
</systemList>
```

The network-share path for the same file is:

```text
\\BATOCERA\share\system\configs\emulationstation\es_systems_nfc.cfg
```

Restart EmulationStation after saving the file.

## Show only the card prompt

1. Open **Main Menu > Game Collection Settings**.
2. Enable **Show Empty Systems**.
3. Exit the menus so EmulationStation refreshes its systems.
4. Return to **Game Collection Settings > Systems Displayed**.
5. Choose **Select None**.
6. Enable only **Insert Game Card**.
7. Exit the menus again to refresh the display.

The other systems are hidden from EmulationStation, not removed from disk. Zaparoo can still launch their indexed games from tokens.

## Add prompt artwork

The `<theme>insertgamecard</theme>` value asks the active Batocera theme for an `insertgamecard` system design. Theme structure varies, so use the theme's own customization instructions to add a static **Insert Game Card** background or logo.

If the theme has no matching entry, the empty system can still appear with its text name. Test the system display before investing time in custom artwork.

## Undo the customization

Delete `es_systems_nfc.cfg`, then restart EmulationStation. Your original systems remain installed and can be enabled again under **Systems Displayed**.
