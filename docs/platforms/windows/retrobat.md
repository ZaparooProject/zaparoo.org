# RetroBat

EmulationStation does not officially support Zaparoo on Windows, but this can be worked around with the help of an additional program.

For the purposes of this guide, it's recommended you use [Retrobat](https://www.retrobat.org/), a fork of Emulation Station, that has an automated setup process, scraping functionality, and the added benefit of supporting Windows titles (Steam games) as well as Emulators.

### What you will need

- [Zaparoo for Windows](https://github.com/ZaparooProject/zaparoo-core/releases/latest) (Get the latest release)
- [AutoHotKey](https://www.autohotkey.com/)

This tutorial will assume you have already set up Retrobat and installed AutoHotKey. Please do so before you proceed.

## How To

Using the AutoHotKey language (.ahk), you can create a program that, when executed by Zaparoo, will tell Emulation Station to Launch and/or Exit the requested title.

There are two possible approaches to this task:

1.  Telling Emulation Station to find a specific title, then launching it.
2.  Launching a game directly from Emulation Station.

Option 1 is a slightly less smooth experience but is much easier to setup and maintain. Option 2 is a smoother experience but is more time-consuming to setup and when adding new titles.

### Option 1 Method

- In Emulation Station open the Main Menu and navigate to Controller Mapping via `Control Settings` > `Controller Mapping`.
- Using a keyboard, bind `Q` to the B button, `W` to the A button, `E` to the Y button and `R` to the X button. Positionally, it should be `Q` for the bottom button, `W` for the right button, `E` for the left button and `R` for the top button. The other bindings do not matter after these 4 buttons; just press and hold down a button to skip every subsequent binding.
- Create a new `.ahk` script and use the code provided below.

```ahk
#Requires AutoHotkey v2.0
; This top section allows the bottom section to work no matter what submenu is open in emulation station.
Send("e")
Sleep 50
Send("{Enter}")
Sleep 50
Send("r")
Sleep 50
Send("w")


Send("e")
Sleep 50
Sendtext("GameName") ; replace GameName with title of the game you intend to launch.
Sleep 50
Send("{Enter}")
Sleep 50
Send("i")
Sleep 500 ; This wait time is required but may vary depending on hardware.
Send("q")
```

- This code will open the Search Menu, input the game you wish to launch's name, confirm the selection, wait a few milliseconds and then launch the selected game.
- Using Ahk2Exe (comes with AutoHotKey), convert the script to a `.exe` file (using V2.0 32bit compiling), name it as the game you intend to launch, e.g., `Golden Eye.exe` and place it in your Zaparoo installation folder.
- Edit the `zaparoo.ini` (see [Configuration](../../core/config.md)) to enable Zaparoo to safely launch the exe you just made by adding its path to the `allowedExecutables` list.
- Using the Zaparoo app, write a new card pointing to the exe we just made. It should look something like `C:\Path\To\Zaparoo\Golden Eye.exe` (adjust the path as needed).
- Run `Zaparoo.exe` and `retrobat.exe`.

With Retrobat running, you can now launch a specific game by tapping your newly written NFC card. The game will also close when pressing the combination of Start+Select by default.

**But what if you want to be able to exit the game when tapping a new card?**

#### Adding Exit Game Functionality

- Create a text file called `gamelist.txt` and place it in your Zaparoo folder. On each line in `gamelist.txt`, type in the `.exe` name of all the emulators you are using in Retrobat. You can check the name of the emulator running by opening Task Manager and going into the "Details" tab.

  It should look a little something like this:

```text
retroarch.exe
dolphin.exe
flycast.exe
redream.exe
Project64.exe
PCSX2.exe
Xemu.exe
Ryujinx.exe
```

    **NOTE:** This is an example; you will need to check the real `.exe` names of the emulators you intend to use with Retrobat.

- Now for some new code:

```ahk
#Requires AutoHotkey v2.0
FoundGame := False
GameList := FileRead("C:\Path\To\Zaparoo\gamelist.txt") ; Adjust path as needed
GameList_array := StrSplit(GameList, "`r`n") ; why its needs split on both "carriage return" AND "line break" is a mystery to me but absolutely required.
For game in GameList_array {
    if (ProcessExist(game)){
        ProcessClose(game)
    }
}

;This code will check if any of your emulators are running (if a game is running) and close it.
```

- Combining Everything:

```ahk
#Requires AutoHotkey v2.0
FoundGame := False
GameList := FileRead("C:\Path\To\Zaparoo\gamelist.txt") ; Adjust path as needed
GameList_array := StrSplit(GameList, "`r`n")
For game in GameList_array {
    if (ProcessExist(game)){
        ProcessClose(game)
        FoundGame := True
    }
}

If (FoundGame == True){
    Goto Skip
}

; Launch sequence from before
Send("e")
Sleep 50
Send("{Enter}")
Sleep 50
Send("r")
Sleep 50
Send("w")

Send("e")
Sleep 50
Sendtext("GameName") ; Remember to change GameName to the game's name you intend to launch. MUST match whats listed in emulation station.
Sleep 50
Send("{Enter}")
Sleep 50
Send("i")
Sleep 500 ; Adjust sleep time if needed
Send("q")

Skip:
Sleep 10

; If a game is running, close it and skip to the end of the code.
; If a game is NOT running (FoundGame = False), search for the game intended and launch it.
```

- If a game is running, it will require 2 taps of the NFC. First to close the game, second to launch the new game.
- You COULD replace the `FoundGame`/ `Skip` functionality with a `Sleep` command so it only requires 1 tap, but different programs take different amounts of time to exit. You would need to calibrate the `Sleep` for each system, maybe for each game, and it would also depend on your hardware. Two taps is a simpler compromise.

So for each game, use the combined code as provided, but change the `GameName` for the game name listed in Retrobat. A new `.exe` must be compiled for each game, each new `.exe` must be added to `allowedExecutables` in `zaparoo.ini`, and each `.exe` must be written to an NFC card via the Zaparoo app.

_(Note: The original author mentioned intending to create a batch file to automate this process, but it was not provided.)_
