---
sidebar_position: 1
description: "Install the official Zaparoo plugin for Decky Loader on Steam Deck: write tags, stop media, index media, pair clients, and link Zaparoo Online from the Quick Access Menu."
keywords: [zaparoo decky, decky loader zaparoo, steam deck zaparoo plugin, quick access menu nfc]
---

# Decky Loader Plugin


The optional official [Zaparoo plugin](https://github.com/ZaparooProject/zaparoo-decky) for [Decky Loader](https://decky.xyz/) puts common controls in Steam's Quick Access Menu. Core must remain installed and running; the plugin is a controller-native Core client and does not contain a second copy of Core.

From the Quick Access Menu you can:

- Write the current Core media or selected Steam game to an NFC tag
- Stop current media
- See the latest scanned token and pending Core notifications
- Update or cancel media database indexing with live progress, and resume it when paused
- Adjust scan behavior and pair client devices
- Link Zaparoo Online and separately opt into play history sync or automatic cloud backup
- Open the full web UI for advanced settings

Current media takes priority over the Steam game shown in the Steam interface. **Write to Tag** is unavailable when no writable reader is connected, and the writer selector appears only when multiple writable readers are available. Leave the tag on the reader until the write succeeds, then remove it before scanning again. The plugin does not alter Steam game pages.

Core Inbox messages remain pending under **Notifications** until you dismiss them. Closing the notification viewer leaves them in the Inbox.

## Install the plugin

Install Decky Loader first. The plugin needs Core v2.17.0 or newer. It is not listed in the Decky Loader store, so use one of the two methods below.

The Core installer offers the plugin when it finds Decky Loader already installed. Rerun the standard install command and answer yes when it asks:

```bash
curl -fsSL https://zaparoo.org/install.sh | bash
```

The prompt defaults to no. Accepting it requires admin access and briefly restarts Decky Loader. The installer:

- Verifies the latest stable plugin before installing it to `~/homebrew/plugins/Zaparoo`.
- Restores the previous plugin if Decky Loader does not restart.
- Skips the plugin without failing when Decky Loader is absent or the installed Core version is older than v2.17.0.

To install it from Decky Loader instead:

1. Open **Settings > General** in Decky Loader and turn on **Developer mode**.
2. Open **Settings > Developer**.
3. Under **Third-Party Plugins**, enter `https://zaparoo.org/decky` in the **URL** field and select **Install**.

This path works before Core is installed. Open Zaparoo in the Quick Access Menu afterwards and select **Install Core**.

## Update and remove the plugin

Rerunning the Core installer updates the plugin to the latest stable release, or reports that it is already current. It will not replace a newer installed plugin with an older stable one. Repair mode leaves the plugin alone.

Decky Loader does not remember a manually installed URL and cannot update plugins that are absent from its store, so repeat the URL installation above to update a manual install.

Removing the plugin leaves Core, its service, configuration, and databases installed. Removing Core leaves the plugin installed in a disconnected state.

