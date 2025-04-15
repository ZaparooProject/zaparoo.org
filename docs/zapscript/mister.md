# MiSTer

These commands are only available on the MiSTer platform.

## Change the Active MiSTer.ini File (mister.ini)

Loads the specified MiSTer.ini file and relaunches the menu core if open.
Specify the .ini file with its index in the list shown in the MiSTer menu. Numbers `1` to `4`.

For example:

```
**mister.ini:1
```

This switch will not persist after a reboot, same as loading it through the OSD.

## Launch a Core RBF File (mister.core)

This command will launch a MiSTer core .rbf file directly. For example:

```
**mister.core:_Console/SNES
```

Or:

```
**mister.core:_Console/PSX_20220518
```

It uses the exact same format as the `rbf` tag in a .mgl file, where the ending of a filename can be omitted. The path is relative to the SD card.

## Launch a Script (mister.script)

It's possible to launch a MiSTer script which already exists on the MiSTer:

```
**mister.script:update_all.sh
```

Zaparoo will **close the currently running game** back to the menu core if necessary, then launch the script on screen as if it were launched from the Scripts menu. The script must exist already in `/media/fat/Scripts` or it won't be run.

Arguments to the script are allowed, just type them after the filename as you would on a shell. Arguments are escaped for security.
