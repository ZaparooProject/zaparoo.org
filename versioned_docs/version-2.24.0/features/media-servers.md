---
sidebar_position: 14
description: "Link Zaparoo Core to Plex, Jellyfin, or RomM so cards can play movies, shows, and music on your TV, or download and launch games from your RomM library."
keywords: [zaparoo plex, zaparoo jellyfin, zaparoo romm, nfc plex movie, jellyfin quick connect zaparoo, romm game download]
---

# Media Servers

Zaparoo Core can link to a Plex, Jellyfin, or RomM server and add its library to the [media database](./scraping.md#updating-the-media-database). Plex and Jellyfin cards play movies, shows, and music on a player such as a TV app. RomM cards download a game to the device and launch it.

## Link a server

Link servers from the [Core terminal UI](../core/tui.md):

1. Open **Settings > Media servers**.
2. Under the server's heading, fill in **Server address** if it needs one.
3. Select **Link Plex**, **Link Jellyfin**, or **Link RomM**, and follow the steps on screen.
4. Once it says the server is linked, [update the media database](./scraping.md#updating-the-media-database) to add the library.

Linking saves the server's token to the [auth file](../core/config/service.md#auth-file) and its address to the launcher's [`server_url`](../core/config/launchers.md#server_url).

## Plex

The Plex launchers run on Windows, Linux, SteamOS, Bazzite, ChimeraOS, LibreELEC, Batocera, Knulli, ROCKNIX, and AmberELEC. Media plays on a Plex player, not on the Core device itself.

To link, leave **Server address** blank to use the only server on your Plex account, or enter one. Select **Link Plex**, then enter the code it shows at [plex.tv/link](https://plex.tv/link).

| System | Launcher | Plays |
| ------ | -------- | ----- |
| `Movie` | `PlexMovie` | A movie |
| `TVEpisode` | `PlexTVEpisode` | An episode |
| `TVShow` | `PlexTVShow` | Every episode of a show, in order |
| `MusicTrack` | `PlexSong` | A song |
| `MusicAlbum` | `PlexAlbum` | Every track of an album, in order |
| `MusicArtist` | `PlexArtist` | Every track of an artist |

Core looks for players the server and your Plex account know, and Cast devices on the local network. The newer Plex apps for Android TV and Apple TV are only reachable through Cast. When only one player is found, Core uses it. With more than one, set [which player to use](#choose-a-player).

## Jellyfin

The Jellyfin launchers run on the same platforms as Plex. Media plays on a Jellyfin app, not on the Core device itself.

To link:

1. Turn on Quick Connect on the Jellyfin server, in its dashboard settings.
2. Enter the server's address, like `http://192.168.1.10:8096`, without `/web`.
3. Select **Link Jellyfin**.
4. In a Jellyfin app that is signed in to that server, open **Settings > Quick Connect** and enter the code Core shows.

| System | Launcher | Plays |
| ------ | -------- | ----- |
| `Movie` | `JellyfinMovie` | A movie |
| `TVEpisode` | `JellyfinTVEpisode` | An episode |
| `TVShow` | `JellyfinTVShow` | Every episode of a show, in order |
| `MusicTrack` | `JellyfinSong` | A song |
| `MusicAlbum` | `JellyfinAlbum` | Every track of an album, in order |
| `MusicArtist` | `JellyfinArtist` | Every track of an artist |

Core plays on a Jellyfin app the server can remote control, so open the app on the TV or other player first. When only one is open, Core uses it. With more than one, set [which player to use](#choose-a-player).

## Choose a player

Set `client` on the `Plex` or `Jellyfin` launcher group in the [config file](../core/config/launchers.md#client) to pick a player by name:

```toml
[[launchers.default]]
launcher = "Plex"
client = "Living Room TV"
```

Plex matches the player's name, ignoring case. Jellyfin matches the device name, then the app name, then the device ID.

Cards for Plex and Jellyfin items also store the item's movie, TV, or music database IDs when the server has them, so a card keeps working after the server rebuilds its library.

Plex and Jellyfin media supports the `toggle_pause`, `pause`, `resume`, `stop`, `fast_forward`, `rewind`, `next`, and `previous` [launcher controls](./launchers.md#launcher-controls).

## RomM

[RomM](https://romm.app/) works on every Core platform that launches games from files, including MiSTer. Its games are added to the media database under their usual systems, except games you already have locally.

To link, enter the address you open RomM at, like `http://192.168.1.10:8080`, then select **Link RomM** and approve the code in RomM's web interface. This needs RomM 5.0 or newer. For an older server, add a RomM API token to the [auth file](../core/config/service.md#auth-file) under the server's address:

```toml title="auth.toml"
["http://192.168.1.10:8080"]
bearer = "your-romm-token"
```

Then set the `RomM` launcher's `server_url` in the config file:

```toml title="config.toml"
[[launchers.default]]
launcher = "RomM"
server_url = "http://192.168.1.10:8080"
```

The first time a RomM game launches, Core downloads it into that system's game folder, then launches it with the system's normal launcher. Later launches use the downloaded file. Games made of several files are extracted into a folder named after the game. Core checks for free space before downloading.

While a RomM server is set, the [`romm` scraper](./scraping.md#romm) runs after each media database update and fills in details and artwork from RomM.
