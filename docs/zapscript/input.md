# Input

These commands are used to simulate input devices like keyboards and gamepads.

## input.keyboard

:::warning
If a command comes from a remote source, this command will be blocked.
:::

Press a key or multiple keys on a virtual keyboard attached to the host. One key:

```
**input.keyboard:@
```

Multiple keys in sequence:

```
**input.keyboard:qWeRty{enter}{up}aaa
```

Special keys can be entered by with a key name surrounded by curly braces (`{}`) as shown above. If you want to enter an literal curly brace, type a backslash before it like `\{` and `\}`. Backslashes can also be escaped (`\\`).

Possible special key names are: esc, backspace, tab, enter, lctrl, lshift, backslash, rshift, lalt, space, caps, num, scroll, f1-f12, home, up pgup, left, right, end, down, pgdn, ins, del, volup, voldn.

## input.gamepad

:::warning
If a command comes from a remote source, this command will be blocked.
:::

Press a button or multiple buttons in sequence on a virtual gamepad attached to the host.

This works the same as the `input.keyboard` command but with the following name mappings:

- `^`, `{up}`: Dpad up
- `V`, `{down}`: Dpad down
- `<`, `{left}`: Dpad left
- `>`, `{right}`: Dpad right
- `A`, `a`: East button
- `B`, `b`: South button
- `X`, `x`: North button
- `Y`, `y`: West button
- `{start}`: Start
- `{select}`: Select
- `{menu}`: Menu (Xbox/PlayStation/etc. button)
- `L`, `l`, `{l1}`: Left bumper
- `R`, `r`, `{r1}`: Right bumper
- `{l2}`: Left trigger
- `{r2}`: Right trigger

For example:

```
**input.gamepad:^^VV<><>BA{start}{select}
```

Be aware that this gamepad likely needs to be mapped manually first to work, and that it will show to the game as an additional controller not imitate an existing connected controller.

## input.coinp1/input.coinp2

Insert a coin/credit for player 1 or 2. For example (to insert 1 coin for player 1):

```
**input.coinp1:1
```

This command presses the `5` and `6` key on the keyboard respectively, which is generally accepted as the coin insert keys in MiSTer arcade cores. If it doesn't work, try manually mapping the coin insert keys in the OSD.

It also supports inserting multiple coins at once. For example (to insert 3 coins for player 2):

```
**input.coinp2:3
```
