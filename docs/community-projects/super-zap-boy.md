# Super Zap Boy

Super Zap Boy is a custom case project created by Phoenix that utilizes an SNES shell with an SBC inside, designed to work with a Super Game Boy for reading games. The Super Game Boy contains a PN532 NFC reader connected to an SBC (either a DE-10 Nano or it's clone boards), which is housed inside the SNES shell. These components are connected internally via a wired USB connection.

The games' paths are written onto an NFC chip or tag using the Zaparoo app. This chip is then placed inside a Game Boy cartridge, which is read by the NFC reader located within the Super Game Boy. This process initiates the game on the desired hardware. More information on using the Zaparoo app to write games to NFC chips can be found [here](https://tapto.wiki/Getting_Started).

Since the original purpose of the items are being changed in this build (playing GameBoy and SNES games), from here on out I will be referring to the Super Game Boy as the Super Zap Boy and the SNES (Super Nintendo Entertainment System) as the SMES (Super MiSTer Entertainment System).

<img src="/img/docs/community-projects/super-zap-boy/Logo_Printable.png" alt="Super Zap Boy Logo" width="300"/>

## Introduction

<img src="/img/docs/community-projects/super-zap-boy/Sgb_inside.jpg" alt="Inside of a Super Zap Boy" width="300"/>

This project started its life after contemplating on how best to use physical media together with software or hardware emulation. Since the MiSTer Project and the multitude of Linux-based Emulation operating systems have no physical media for games, a lot of people resort to modding and using their own classic consoles for the most nostalgic looking and feeling experience. Currently software and hardware emulation have come a long way and are in some cases (almost) interchangeable with original hardware accuracy-wise. The absence of physical media keeps people from viewing this route as a 'complete' and authentic experience.

The Zaparoo project introduces a new way for people to fill this gap with physical NFC cards. Super Zap Boy tries to improve upon this concept with physical cartridges to replicate the feeling of inserting games and having a classic console to look at while keeping the cost relatively low compared to modding original hardware for the same performance.

## The build

:::warning[Before You Begin]

This process requires some soldering skills and involves cutting or removing parts of your existing hardware. I would rank this process as intermediate. If you enjoy tinkering, read on. Otherwise, consider seeking help from others before attempting any irreversible modifications.

:::

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

### Super Zap Boy

**Mandatory:**

- A USB-C to USB-A cable for the NFC reader
- Round NFC tags (NTAG 215) for the cartridges
- A PN532 NFC reader with USB-C (black one)
- General tools like a plier and screwdrivers (including a 3.8 mm for the Super Game Boy and Game Boy cartridges)
- Double sided tape (I used 3M heavy duty tape)
- Gameboy cartridges. These can be empty or populated ones, it doesn't matter

**Optional:**

- A 90 degrees angled USB-C to USB-A cable would be better for positioning
- A sticker to apply on the front of the case. The logo on the top of this wiki can be used for this as it's made to scale.

## Readying the Super Zap Boy

**Steps:**

1. **Open the Super Game Boy:** Open up the Super Game Boy and remove everything, including the PCB board. Take the back of the shell and cut some of the support bars to make room for the NFC reader. Cut everything in the green area.
2. **Prepare the Shell:** After you're done, it should look like this. Ensure the cut areas are flat and won't scratch the back of your NFC reader. You can sand these off, but be careful not to overdo it.
3. **Position the NFC Reader:** Position the NFC reader to the back of the Super Game Boy case as shown. Ensure the NFC reader is positioned so that the USB-C cable can still be plugged into it.

:::tip[Positioning Tip]

Test the position with both the cable and the NFC reader to get it just right before applying the double-sided tape. I made the mistake of placing the NFC reader too flat in the center, which caused my USB-C cable not to fit anymore.

:::

4. **Adhere the NFC Reader:** After finding a good position where both fit, adhere the reader to the back. Note that having the NFC reader on the shell doesn't guarantee it will read the NFC tags in your cartridges because the cartridge slot remains in a fixed position. You can adjust by applying the tags slightly more to the right in your Game Boy cartridges to compensate for any misalignment.
5. **Align the NFC Tag:** Depending on the position of your NFC reader, you may need to adjust the position of the NFC tag in your Game Boy cartridges to align as much as possible. This will give you the highest chance of a successful scan and game read. It doesn't matter if the NFC reader is off-center, as long as the NFC tag is in a similar position.
6. **Cut an Opening for the USB Cable:** The final step for the Super Game Boy is to cut a small opening for the USB cable to fit through. I initially tried routing it through the bottom, but that didn't work well as the cartridge slot of the Super Nintendo didn't accommodate it. If you cut at a low position as shown in the picture of step 6, this cut won't be visible once the Super Game Boy is inserted into the case. I deemed this a necessary shell modification for the project.
7. **Fit the Super Game Boy into the SMES Case:** This is where the USB cable should pass through to get inside the SMES case. It requires some wiggling and fidgeting to get it in, so ensure it fits without forcing it too much.

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/Screenshot_2024-06-29-16-37-46-74_6012fa4d4ddec268fc5c7112cbb265e7.jpg",
    width: 900,
    height: 1200,
    alt: "Step 1: Opening the Super Game Boy"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/DSbrhST9.png",
    width: 1200,
    height: 900,
    alt: "Step 2: Cutting support bars to make room for NFC reader"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/WhatsApp_Image_2024-07-09_at_11.47.19.jpg",
    width: 1200,
    height: 900,
    alt: "Step 3: Positioning the NFC reader"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Screenshot_2024-09-09_111623.png",
    width: 1200,
    height: 900,
    alt: "Step 4: Test positioning with USB cable"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Cartridge_with_nfc.jpg",
    width: 900,
    height: 1200,
    alt: "Step 5: NFC tag alignment in Game Boy cartridge"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_im.jpg",
    width: 1200,
    height: 900,
    alt: "Step 6: Cutting opening for USB cable"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Passthrough.jpg",
    width: 1200,
    height: 900,
    alt: "Step 7: USB cable passthrough to SMES case"
  }
]} />

## Checkpoint!

At this point, you've reached a **checkpoint**. You can either:

<img src="/img/docs/community-projects/super-zap-boy/SMB3.png" alt="Example custom label" width="300"/>

1. Continue with the main build to complete the project.
2. Use the Super Zap Boy as a standalone reader via USB.

If you decide to stop at this stage and use the Super Zap Boy as a standalone reader, the only thing left to do is:

- **Create** custom labels for your games.
- Start **playing** your games through the reader!

Now that you have your Super Zap Boy, I invite everyone to get creative with how you display it. Here are some ideas:

- Design and 3D print a stand for your Super Zap Boy, allowing it to be neatly displayed or slotted into something cool.
- Get inventive with how you display your cases and games.

The sky's the limit when it comes to **customization** and **presentation!**

## The Main Dish: Readying the Super MiSTer Entertainment System

<img src="/img/docs/community-projects/super-zap-boy/SMES.png" alt="Super MiSTer Entertainment System" width="300"/>

If you've made it this far, **congratulations** on building your own **Super Zap Boy**! Now, let's take it to the next level by integrating it with the **Super MiSTer** and completing the project.

In this final section, we will house a Single-Board Computer (SBC), such as the **Raspyberry Pi,** the **DE-10 Nano** or one of its clones, inside the **SMES** case.

:::note
As of writing this tutorial, Zaparoo is **not yet officially supported** on the Raspberry Pi. Support will be added in the future. For now, you'll need to use a **Terasic DE-10 Nano** or a clone board like the **QMTECH** or **MiSTer Pi.**
:::

### Step 1: Disassembly

To begin, you'll need to disassemble the SMES case.

1. **Tools Required:**
   - Regular screwdriver
   - Gamebit screwdriver
2. **Unscrew & Open:**
   - Start by unscrewing all visible screws and open up the case. Be sure to save the screws for later use.
3. **Remove Internal Components:**
   - Take out **everything** inside the case, **except** for the power switch.
   - You can also choose to keep the **cartridge slot** intact if you plan to use the Super Zap Boy. Keeping it will prevent the Super Zap Boy from moving around when inserting and removing Gameboy cartridges.
   - **Remove** the **eject mechanism** as it takes up too much space and will no longer be needed since the Super GameBoy will be **permanently slotted**.
   - For now, **remove** the **cartridge slot** (it can be re-installed later if desired).

### Step 2: Trimming

Next, we need to make room inside the SMES case for the board and cables.

1. **Grab a Plier:**
   - Use the plier to **trim** away the **excess** plastic from the inside of the case.
   - Remove as much unnecessary plastic as possible to make room for the DE-10 Nano (or its clones) and the cables.
2. **Check the Fit:**
   - Position everything carefully to ensure the board and components fit **snugly** without obstructing anything.
   - Trim as needed until it matches the reference pictures (see images below).

### Step 3: Securing the Components

Once everything is positioned correctly:

1. **Use Electrical or Double-Sided Tape:**
   - Secure the components in place with **electrical tape** and/or **double-sided tape**.
   - Ensure everything is firmly adhered and that no parts are loose or shifting inside the case.

You're almost done! After these steps, your Zap Boy combined with Super MiSTer should be **good to go**. Keep tinkering with the positioning and trimming until everything is in its place and functioning as expected!

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_image_picker_lib_temp_7212091b-5724-4648-b029-1bf5dfc4bc6e.jpg",
    width: 900,
    height: 1200,
    alt: "Trimming excess plastic from inside the SMES case"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Screenshot_2024-09-09_111623.png",
    width: 1200,
    height: 900,
    alt: "Component placement and positioning inside the case"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Remix-0bcf1e7b-0318-47a1-8419-039ae7173e7f.png",
    width: 1200,
    height: 900,
    alt: "Final assembly with components secured"
  }
]} />

## Optional: Power Switch for SMES

You can repurpose the **original** SNES power switch to power the MiSTer setup using a **Male DC Barrel Jack** and a **Female USB-C Breakout Board**. This setup allows you to turn your MiSTer on and off with the SNES switch.

### Required Parts (Available on AliExpress):

- <ProductLink href="https://www.aliexpress.com/item/1005007404205142.html" store="aliexpress">DC Power Pigtail Male Cable</ProductLink>
- <ProductLink href="https://www.aliexpress.com/item/1005006846325447.html" store="aliexpress">USB Type-C Connector Board</ProductLink>

### Wiring Instructions

1. **Snip off** the connector from the end of the **SNES power switch**.
2. **Cut** the **black cable** of the barrel jack in half.
3. **Solder** the black cable (just cut) to the **GND** through-hole of the female USB-C breakout board.
4. **Solder** the red cable of the barrel jack to the **VBUS** through-hole of the USB-C breakout board.
5. **Solder one end** of the SNES power switch (either end) to the black cable coming from the **USB-C breakout board**.
6. **Solder the other end** of the SNES power switch to the **black cable** of the barrel jack.

### Final Assembly

1. **Plug the male DC barrel jack** into the female DC barrel jack on your DE-10 Nano or QMTECH board.
   - If you are using a MiSTER Pi, you will need a **Female Barrel Jack to USB-C converter**.
2. You now have the **female USB-C breakout board** acting as a **DC input** for your MiSTer, and the SNES power switch will control its power.

### Power Supply Recommendation

For powering the SMES I recommend using a **Raspberry Pi USB-C power supply** to ensure consistent and safe power delivery. The recommended power for the MiSTer is 5V 3A.

## Optional: Reset Button

You can, should you wish, also get the **reset button** working on your SMES. For this you only need some **glue,** a 3D-printed **mount** found on our GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes), some wires and an actuation button (I bought one of <ProductLink href="https://www.aliexpress.us/item/1005007217364224.html" store="aliexpress">these</ProductLink>).

You need an **actuation button** and some wires for soldering. I used small clicky buttons found on AliExpress. The button will need to be attached to the mount and then placed beneath the reset button's mechanism so that when pressed down it activates your button that is on the mount.

**3D print** the mount and place the switch on it. Then apply them on the stem of the reset button. Make sure it's properly seated all the way. It's advised to use (super) glue to make sure it stays in place. If you press on the reset button too hard, it could be pushed out from underneath! So be careful when pressing.

The wires will need to go on **pin 12** and **pin 17** on the **GPIO1 header**. This will activate the **RESET** function of the board. You can also have it set to **OSD** or **USER** if you want. In this case the cable that goes to **pin 17** should go to either **pin 13** (OSD) or **pin 15** (USER) instead.

I recommend using **bare wires** on one end and **female dupont** headers on the other end (see picture below). This way you can easily remove them should you want to in the future.

:::note[QMTECH Board Users]

If you are using the **QMTECH** board, you will need to bridge **pin 10** together with **pin 30**, otherwise the reset button will not work. Just do this with a simple female dupont to female dupont cable.

:::

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_image_picker_lib_temp_b2fa95bc-4956-4710-bcb8-35d31e12995d.jpg",
    width: 1200,
    height: 900,
    alt: "Reset button wiring with dupont cables to GPIO header"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_image_picker_lib_temp_f84f4053-2690-4134-9ac3-9918628f1896.jpg",
    width: 900,
    height: 1200,
    alt: "3D-printed reset button mount with actuation button"
  }
]} />

## Optional: Customizing the SNES Case Logo

<img src="/img/docs/community-projects/super-zap-boy/Super_Mister_Entertainment_System_-_White_BG_v2.png" alt="SMES Logo" width="300"/>

If you'd like, you can **remove the original logo** on the top front of the SNES case and replace it with a **custom-made logo** for this project.

### Materials Needed:

- **100% transparent sticker paper** (for applying the custom logo)
- **Magic Eraser sponge** (acts like sanding paper but is gentler on the case)

### Step-by-Step Instructions:

1. **Prepare the Sponge:**
   - Wet the **Magic Eraser sponge**. It will be used to gently remove the original logo.
2. **Wet Sanding Process:**
   - Begin rubbing the sponge on the logo in a **circular motion**.
   - Apply some pressure—the sponge is soft enough to not damage the shell.
3. **Be Patient:**
   - The wet sanding process can take about **15-20 minutes**.
   - Gradually, the original logo will **fade away**. Keep sanding until you're satisfied with the result.

Once the logo is removed, you can then apply your custom logo using the **transparent sticker paper** for a sleek, professional look.

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/1200x1035.png",
    width: 1200,
    height: 1035,
    alt: "Magic Eraser sponge for wet sanding"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_image_picker_lib_temp_f5412cd5-bfce-46e3-bb52-078f679d4f19.jpg",
    width: 900,
    height: 1200,
    alt: "Wet sanding the original logo with circular motion"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Rn_image_picker_lib_temp_ecec7114-d9f7-4350-9d6a-23befd6f4484.jpg",
    width: 1200,
    height: 900,
    alt: "Original logo gradually fading away"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/546.jpg",
    width: 1200,
    height: 900,
    alt: "Applying custom SMES logo with transparent sticker"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Finished_logo.png",
    width: 1200,
    height: 900,
    alt: "Finished custom SMES logo on case"
  }
]} />

## Optional: 3D-Printed Backplate

You can choose to make your own backplate, or opt to **3D print** one specifically designed for this project.

- **3D Printable File**: You can find the file on our Zaparoo GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes).

:::note[Backplate Compatibility]

The backplate is designed to fit **specific parts** (as mentioned earlier in the guide). If you choose to use different parts, there's a chance that the backplate may **not fit perfectly**.

:::

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/IMG_5534.webp",
    width: 1200,
    height: 900,
    alt: "3D-printed backplate installed inside the SMES"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Backplate.webp",
    width: 1200,
    height: 900,
    alt: "Custom SMES backplate with ports and openings"
  }
]} />

## Optional: Front Controller Ports & System LED

You can use the front controller ports of the SMES, which offer **extremely low latency** due to being wired and support a **1000Hz polling rate**.

Another neat feature of this mod is that the power to the front controller ports is the **same** power that lights up the **LED** on the SMES. So, you get two mods for the price of one!

### What You'll Need

To set this up, you'll need the following components:

- **Arduino Pro Micro (ATMega32U4)** board (available for around $5 on sites like AliExpress)
  - You only need **one board** to support **two controllers**.

This guide assumes you want to use **both controller ports** since the same board supports both.

1. **Remove the front controller ports** carefully.
2. **Detach the ribbon cable**—you won't need it for this mod.

### Soldering Guide:

To complete this mod, you'll need to do some soldering. Follow the instructions below carefully.

Check the diagram of the Arduino board and solder to the following points:

- **LATCH**: 2x
- **CLOCK**: 2x
- **GROUND**: 2x
- **VCC**: 2x
- **DATA1**: 1x (for Controller 1)
- **DATA2**: 1x (for Controller 2)

:::info[Software Setup Required]

The Arduino board requires specific software to work with the original SNES controllers.

1. Go to the following link for the necessary software: [DaemonBite-Retro-Controllers-USB Software](https://github.com/MickGyver/DaemonBite-Retro-Controllers-USB)
2. Follow the instructions provided on the page.

:::

:::danger[Controller 2 Pin Orientation]

When soldering the controller ports, **the pins for Controller 2 are inverted**. If you start from the left on Controller 1, start from the **opposite side** on Controller 2, or vice versa.

:::

### Final Check

If you've soldered everything correctly, your setup should look something like this:

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/Image0.jpg",
    width: 1200,
    height: 900,
    alt: "Arduino board solder points diagram and wiring guide"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Soldered_finished.jpg",
    width: 1200,
    height: 900,
    alt: "Completed controller port soldering with all connections"
  }
]} />

## Final Result

This is it guys, the finish line! If you did everything correctly so far it should look a little something like this.

Now if you don't have it exactly like this, that's completely okay! You can mix and match different items, it doesn't really matter. The important part is that you have a functional Super Zap Boy and a SMES. As long as that's working and you can enjoy games with it, that's all that matters!

If somehow this wiki was not clear enough on a certain subject and you have questions still, then hit me up @Phoenix on the Zaparoo discord ([wizzo.dev](https://wizzo.dev/)).

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/End_result.jpg",
    width: 1200,
    height: 900,
    alt: "Inside the completed SMES build with all components installed"
  }
]} />

## Optional: Cassette Cases and other cosmetics

<Gallery photos={[
  {
    src: "/img/docs/community-projects/super-zap-boy/Cassette_cases.png",
    width: 1200,
    height: 900,
    alt: "Cassette cases with custom Super Zap Boy game covers (front)"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Cassette_back.png",
    width: 1200,
    height: 900,
    alt: "Cassette cases with custom covers (side and back view)"
  },
  {
    src: "/img/docs/community-projects/super-zap-boy/Super_Mister_Wallpaper_.png",
    width: 1920,
    height: 1080,
    alt: "Custom SMES wallpaper design for MiSTer (1920x1080)"
  }
]} />

Wallpapers for this project can be found on our GitHub [here](https://github.com/ZaparooProject/tapto-hardware/tree/main/smes/Wallpapers). It includes multiple **16:9 1920x1080** versions and one that is compatible with CRT's in **4:3 640x480**. Use the one that you like the best. If you plan on using these, I recommend you turning off the the MiSTer logo in the menu in order to not obstruct the wallpaper. You can do this in the MiSTer.ini file on the root of your SD card. Simply find "logo=1" on line nr. 236 and change the "1" to a "0". This disables the menu logo.

And if you want one of those beautiful cases with the custom cover to go along with your cartridges, you can check out the great work done by Anime0t4ku on his wiki page [here](../tokens/storage/cassette-cases.md).

## Credits

_Project created, coordinated and wiki entry written, by Phoenix_

_BedroomNinja: Rewired the power switch, 3D designed and printed the backplate and the mount for the reset button_

_Anime0t4ku: Designed the SMES logo, SMES wallpapers and the final version of the Super Zap Boy logo_

_ArielAces: Made cartridge label templates, printed labels_

_Tim Wilsie: Created design of the Super Zap Boy logo_

_Wizzo: Supported and sent positive vibes :D_

_MickGyver: Created software for the Daemonbite Retro USB adapter which we used for the controller port_

Thank you so much to everyone who helped out! The complete SMES wouldn't be possible without BedroomNinja and his skills and a special thanks to Anime0t4ku, ArielAces and Tim Wilsie for helping out and Wizzo for making this all possible in the first place! Happy building everyone!
