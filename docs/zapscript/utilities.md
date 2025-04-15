# Utilities

These commands provide various utility functions.

## Execute System Command (execute)

:::warning
Using this command required explicitly enabling the arguments in the allow_execute option of the config file.
:::

This command will run a system command directly. For example:

```
**execute:reboot
```

Arguments are supported.

## Delay Command Execution (delay)

This command will delay the execution of the next command by the specified number of milliseconds. For example:

```
**delay:500
```

Will delay the next command by 500ms (half a second). This is a _blocking command_ and will delay the entire token read by the specified time.

It can be combined with other commands using the `||` separator. For example, to launch SNES, wait 10 seconds, then press F12:

```
_Console/SNES||**delay:10000||**input.key:88
```
