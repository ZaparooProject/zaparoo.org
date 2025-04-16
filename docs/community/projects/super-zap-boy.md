# Super Zap Boy

**Super TapTo Boy** is a custom case project created by **Phoenix** that utilizes an SNES shell with an **SBC** inside, designed to work with a Super Game Boy for reading games. The Super Game Boy contains a PN532 **NFC** **reader** connected to an SBC (either a DE-10 Nano or its clone boards), which is housed inside the SNES shell. These components are connected internally via a wired USB connection.

The games' paths are written onto an NFC chip or tag using the Zaparoo app. This chip is then placed inside a Game Boy cartridge, which is read by the NFC reader located within the Super Game Boy. This process initiates the game on the desired hardware. More information on using the Zaparoo app to write games to NFC chips can be found [here](../../getting-started.md).

Since the original purpose of the items are being changed in this build (playing GameBoy and SNES games), from here on out I will be referring to the Super Game Boy as the **Super TapTo Boy** and the SNES (Super Nintendo Entertainment System) as the **SMES** (Super MiSTer Entertainment System).

**UPDATE:** Since TapTo has officially been re-branded to Zaparoo, future incarnations of this project will be called "Super Zap Boy".

## Introduction

This project started its life after contemplating on how best to use physical media together with software or hardware emulation. Since the MiSTer Project and the multitude of Linux-based Emulation operating systems have no physical media for games, a lot of people resort to modding and using their own classic consoles for the most nostalgic looking and feeling experience. Currently software and hardware emulation have come a long way and are in some cases (almost) interchangeable with original hardware accuracy-wise. The absence of physical media keeps people from viewing this route as a 'complete' and authentic experience.

The TapTo project introduces a new way for people to fill this gap with physical NFC cards. Super TapTo Boy tries to improve upon this concept with physical cartridges to replicate the feeling of inserting games and having a classic console to look at while keeping the cost relatively low compared to modding original hardware for the same performance.

## The build

In this section, I will discuss the building process of the SMES and Super TapTo Boy. As a disclaimer, this process requires some soldering skills and involves cutting or removing parts of your existing hardware. I would rank this process as intermediate. If you enjoy tinkering, read on. Otherwise, consider seeking help from others before attempting any irreversible modifications.

With that out of the way, below is a list of the requirements for this build. Try to acquire as many of these items as possible before you begin. I divided it into two sections, so you can choose what parts to get or omit.

Firstly, you will need either a European Super Nintendo or a Japanese Super Famicom. The American Super Nintendo might work as well, but due to its different shape and size, and since I do not own one, I cannot guarantee that all steps will work perfectly, so your experience may vary.

Secondly, you will need a Super Game Boy and some Game Boy cartridges. The latter can be purchased online in the form of empty shells or you can use your own cartridges that you want to put an NFC chip into (more on that later).

Preferably, you will also need a 3D printer to print some parts for the build, although these are cosmetic and not mandatory.

Additionally, you will need some cables and other items. Keep in mind that we have limited space in the case, so the smaller or shorter the items are, the better:

### SMES

**Mandatory:**

- A small USB hub for inside the case to hook your devices to. Don't make this too big or it won't fit. Also don't hook up too many (power hungry) devices to it as all of it needs to be powered by the board
- DuPont cables (female to female)
- General tools like a plier and screwdrivers (including a 4.5 mm Gamebit screwdrivers for the Super Nintendo)
- Double sided tape (I used 3M heavy duty tape)

**Optional:**

- Female USB-A and C ports
- A Bluetooth dongle
- A Wi-Fi dongle
- Some heat shrink tubes
- An Arduino board (Arduino Pro Micro ATMega32U4) for the front controller ports
- Soldering iron and wire

### Super TapTo Boy

**Mandatory:**

- A USB-C to USB-A cable for the NFC reader
- Round NFC tags (NTAG 215) for the cartridges
- A PN532 NFC reader with USB-C ([like this one](../../readers/nfc/pn532-type-c.md))
- General tools like a plier and screwdrivers (including a 3.8 mm for the Super Game Boy and Game Boy cartridges)
- Double sided tape (I used 3M heavy duty tape)
- Gameboy cartridges. These can be empty or populated ones, it doesn't matter

**Optional:**

- A 90 degrees angled USB-C to USB-A cable would be better for positioning
- A sticker to apply on the front of the case. The logo on the top of this wiki can be used for this as it's made to scale.

## Readying the Super TapTo Boy

**Steps:**

1.  **Open the Super Game Boy:** Open up the Super Game Boy and remove everything, including the PCB board. Take the back of the shell and cut some of the support bars to make room for the NFC reader. Cut everything in the green area.
2.  **Prepare the Shell:** After you're done, it should look like this. Ensure the cut areas are flat and won't scratch the back of your NFC reader. You can sand these off, but be careful not to overdo it.
3.  **Position the NFC Reader:** Position the NFC reader to the back of the Super Game Boy case as shown. Ensure the NFC reader is positioned so that the USB-C cable can still be plugged into it. I made the mistake of placing the NFC reader too flat in the center, which caused my USB-C cable not to fit anymore. Test the position with the cable and the NFC reader to get it just right before applying the double-sided tape.
4.  **Adhere the NFC Reader:** After finding a good position where both fit, adhere the reader to the back. Note that having the NFC reader on the shell doesn't guarantee it will read the NFC tags in your cartridges because the cartridge slot remains in a fixed position. You can adjust by applying the tags slightly more to the right in your Game Boy cartridges to compensate for any misalignment.
5.  **Align the NFC Tag:** Depending on the position of your NFC reader, you may need to adjust the position of the NFC tag in your Game Boy cartridges to align as much as possible. This will give you the highest chance of a successful scan and game read. It doesn't matter if the NFC reader is off-center, as long as the NFC tag is in a similar position.
6.  **Cut an Opening for the USB Cable:** The final step for the Super Game Boy is to cut a small opening for the USB cable to fit through. I initially tried routing it through the bottom, but that didn't work well as the cartridge slot of the Super Nintendo didn't accommodate it. If you cut at a low position as shown in the picture of step 6, this cut won't be visible once the Super Game Boy is inserted into the case. I deemed this a necessary shell modification for the project.
7.  **Fit the Super Game Boy into the SMES Case:** This is where the USB cable should pass through to get inside the SMES case. It requires some wiggling and fidgeting to get it in, so ensure it fits without forcing it too much.

## Checkpoint!

At this point, you've reached a **checkpoint**. You can either:

1.  Continue with the main build to complete the project.
2.  Use the Super TapTo Boy as a standalone reader via USB.

If you decide to stop at this stage and use the Super TapTo Boy as a standalone reader, the only thing left to do is:

- **Create** custom labels for your games.
- Start **playing** your games through the reader!

Now that you have your Super TapTo Boy, I invite everyone to get creative with how you display it. Here are some ideas:

- Design and 3D print a stand for your Super TapTo Boy, allowing it to be neatly displayed or slotted into something cool.
- Get inventive with how you display your cases and games.

The sky's the limit when it comes to **customization** and **presentation**!

## The Main Dish: Readying the Super MiSTer Entertainment System

If you've made it this far, **congratulations** on building your own **Super** **TapTo Boy**! Now, let's take it to the next level by integrating it with the **Super MiSTer** and completing the project.

In this final section, we will house a Single-Board Computer (SBC), such as the **Raspyberry Pi,** the **DE-10 Nano** or one of its clones, inside the **SMES** case.

> **Note**: As of writing this tutorial, TapTo is **not yet officially supported** on the Raspberry Pi. Support will be added in the future. For now, you'll need to use a **Terasic DE-10 Nano** or a clone board like the **QMTECH** or **MiSTer Pi.**

### Step 1: Disassembly

To begin, you'll need to disassemble the SMES case.

1.  **Tools Required**:
    - Regular screwdriver
    - Gamebit screwdriver
2.  **Unscrew & Open**:
    - Start by unscrewing all visible screws and open up the case. Be sure to save the screws for later use.
3.  **Remove Internal Components**:
    - Take out **everything** inside the case, **except** for the power switch.
    - You can also choose to keep the **cartridge slot** intact if you plan to use the Super TapTo Boy. Keeping it will prevent the Super TapTo Boy from moving around when inserting and removing Gameboy cartridges.
    - **Remove** the **eject mechanism** as it takes up too much space and will no longer be needed since the Super GameBoy will be **permanently slotted**.
    - For now, **remove** the **cartridge slot** (it can be re-installed later if desired).

---

### Step 2: Trimming

Next, we need to make room inside the SMES case for the board and cables.

1.  **Grab a Plier**:
    - Use the plier to **trim** away the **excess** plastic from the inside of the case.
    - Remove as much unnecessary plastic as possible to make room for the DE-10 Nano (or its clones) and the cables.
2.  **Check the Fit**:
    - Position everything carefully to ensure the board and components fit **snugly** without obstructing anything.
    - Trim as needed until it matches the reference pictures (see images below).

---

### Step 3: Securing the Components

Once everything is positioned correctly:

1.  **Use Electrical or Double-Sided Tape**:
    - Secure the components in place with **electrical tape** and/or **double-sided tape**.
    - Ensure everything is firmly adhered and that no parts are loose or shifting inside the case.

---

You're almost done! After these steps, your TapTo Boy combined with Super MiSTer should be **good to go**. Keep tinkering with the positioning and trimming until everything is in its place and functioning as expected!

## Optional: Power Switch for SMES

You can repurpose the **original** SNES power switch to power the MiSTer setup using a **Male DC Barrel Jack** and a **Female USB-C Breakout Board**. This setup allows you to turn your MiSTer on and off with the SNES switch.

### Required Parts (Available on AliExpress):

- [DC Power Pigtail Male Cable](https://www.aliexpress.com/item/1005007404205142.html)
- [USB Type-C Connector Board](https://www.aliexpress.com/item/1005006846325447.html)

---

### Wiring Instructions

1.  **Snip off** the connector from the end of the **SNES power switch**.
2.  **Cut** the **black cable** of the barrel jack in half.
3.  **Solder** the black cable (just cut) to the **GND** through-hole of the female USB-C breakout board.
4.  **Solder** the red cable of the barrel jack to the **VBUS** through-hole of the USB-C breakout board.
5.  **Solder one end** of the SNES power switch (either end) to the black cable coming from the **USB-C breakout board**.
6.  **Solder the other end** of the SNES power switch to the **black cable** of the barrel jack.

---

### Final Assembly

1.  **Plug the male DC barrel jack** into the female DC barrel jack on your DE-10 Nano or QMTECH board.
    - If you are using a MiSTER Pi, you will need a **Female Barrel Jack to USB-C converter**.
2.  You now have the **female USB-C breakout board** acting as a **DC input** for your MiSTer, and the SNES power switch will control its power.

---

### Power Supply Recommendation

For powering the SMES I recommend using a **Raspberry Pi USB-C power supply** to ensure consistent and safe power delivery. The recommended power for the MiSTer is 5V 3A.

## Optional: Reset Button

You can, should you wish, also get the **reset button** working on your SMES. For this you only need some **glue,** a 3D-printed **mount** found on our GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes), some wires and an actuation button (I bought one of [these](https://www.aliexpress.us/item/1005007217364224.html)).

You need an **actuation button** and some wires for soldering. I used small clicky buttons found on AliExpress. The button will need to be attached to the mount and then placed beneath the reset button's mechanism so that when pressed down it activates your button that is on the mount.

**3D print** the mount and place the switch on it. Then apply them on the stem of the reset button. Make sure it's properly seated all the way. It's advised to use (super) glue to make sure it stays in place. If you press on the reset button too hard, it could be pushed out from underneath! So be careful when pressing.

The wires will need to go on **pin 12** and **pin 17** on the **GPIO1 header**. This will activate the `RESET` function of the board. You can also have it set to `OSD` or `USER` if you want. In this case the cable that goes to **pin 17** should go to either **pin 13** (OSD) or **pin 15** (USER) instead.

I recommend using **bare wires** on one end and **female dupont** headers on the other end. This way you can easily remove them should you want to in the future.

If you are using the **QMTECH** board, you will need to bridge **pin 10** together with **pin 30**, otherwise it will not work! Just do this with a simple female dupont to female dupont cable and try it out for yourself first to see if it works for you.

## Optional: Customizing the SNES Case Logo

If you'd like, you can **remove the original logo** on the top front of the SNES case and replace it with a **custom-made logo** for this project.

### Materials Needed:

- **100% transparent sticker paper** (for applying the custom logo)
- **Magic Eraser sponge** (acts like sanding paper but is gentler on the case)

### Step-by-Step Instructions:

1.  **Prepare the Sponge**:
    - Wet the **Magic Eraser sponge**. It will be used to gently remove the original logo.
2.  **Wet Sanding Process**:
    - Begin rubbing the sponge on the logo in a **circular motion**.
    - Apply some pressure—the sponge is soft enough to not damage the shell.
3.  **Be Patient**:
    - The wet sanding process can take about **15-20 minutes**.
    - Gradually, the original logo will **fade away**. Keep sanding until you're satisfied with the result.

Once the logo is removed, you can then apply your custom logo using the **transparent sticker paper** for a sleek, professional look.

## Optional: 3D-Printed Backplate

You can choose to make your own backplate, or opt to **3D print** one specifically designed for this project.

- **3D Printable File**: You can find the file on our TapTo GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes).

### Important Note

The backplate is designed to fit **specific parts** (as mentioned earlier in the guide). If you choose to use different parts, there's a chance that the backplate may **not fit perfectly**.

## Optional: Front Controller Ports & System LED

You can use the front controller ports of the SMES, which offer **extremely low latency** due to being wired and support a **1000Hz polling rate**.

Another neat feature of this mod is that the power to the front controller ports is the **same** power that lights up the **LED** on the SMES. So, you get two mods for the price of one!

### What You'll Need

To set this up, you'll need the following components:

- **Arduino Pro Micro (ATMega32U4)** board (available for around $5 on sites like AliExpress)
  - You only need **one board** to support **two controllers**.

This guide assumes you want to use **both controller ports** since the same board supports both.

1.  **Remove the front controller ports** carefully.
2.  **Detach the ribbon cable**—you won't need it for this mod.

---

### Soldering Guide:

To complete this mod, you'll need to do some soldering. Follow the instructions below carefully.

Check the diagram of the Arduino board and solder to the following points:

- **LATCH**: 2x
- **CLOCK**: 2x
- **GROUND**: 2x
- **VCC**: 2x
- **DATA1**: 1x (for Controller 1)
- **DATA2**: 1x (for Controller 2)

### Important: Software Setup

The Arduino board requires specific software to work with the original SNES controllers.

1.  Go to the following link for the necessary software: [DaemonBite-Retro-Controllers-USB Software](https://github.com/MickGyver/DaemonBite-Retro-Controllers-USB)
2.  Follow the instructions provided on the page.

### CAUTION!

When soldering the controller ports, **remember that the pins for Controller 2 are inverted**. If you start from the left on Controller 1, start from the **opposite side** on Controller 2, or vice versa.

### Final Check

If you've soldered everything correctly, your setup should look something like this:

## Final Result:

This is it guys, the finish line! If you did everything correctly so far it should look a little something like this.

Now if you don't have it exactly like this, that's completely okay! You can mix and match different items, it doesn't really matter. The important part is that you have a functional Super TapTo Boy and a SMES. As long as that's working and you can enjoy games with it, that's all that matters!

If somehow this wiki was not clear enough on a certain subject and you have questions still, then hit me up @Phoenix on the TapTo discord ([wizzo.dev](https://wizzo.dev/)).

## Optional: Cassette Cases and other cosmetics

Wallpapers for this project can be found on our GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes/Wallpapers). It includes multiple **16:9 1920x1080** versions and one that is compatible with CRT's in **4:3 640x480**. Use the one that you like the best. If you plan on using these, I recommend you turning off the the MiSTer logo in the menu in order to not obstruct the wallpaper. You can do this in the MiSTer.ini file on the root of your SD card. Simply find "logo=1" on line nr. 236 and change the "1" to a "0". This disables the menu logo.

And if you want one of those beautiful cases with the custom cover to go along with your cartridges, you can check out the great work done by Anime0t4ku on his wiki page [here](../cassette-cases.md).

## Credits:

_Project created, coordinated and wiki entry written, by Phoenix_

_BedroomNinja: Rewired the power switch, 3D designed and printed the backplate and the mount for the reset button_

_Anime0t4ku: Designed the SMES logo, SMES wallpapers and the final version of the Super TapTo Boy logo_

_ArielAces: Made cartridge label templates, printed labels_

_Tim Wilsie: Created design of the Super TapTo Boy logo_

_Wizzo: Supported and sent positive vibes :D_

_MickGyver: Created software for the Daemonbite Retro USB adapter which we used for the controller port_

Thank you so much to everyone who helped out! The complete SMES wouldn't be possible without BedroomNinja and his skills and a special thanks to Anime0t4ku, ArielAces and Tim Wilsie for helping out and Wizzo for making this all possible in the first place! Happy building everyone!
