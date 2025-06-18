# Utilities

These commands provide various utility functions.

## stop

```
**stop
```

Stop/exit the current media.

## echo

```
**echo:this is a test message
```

`echo` will output the full argument string directly to the Core log file as an "info" level entry.

## execute

:::warning
Using this command requires explicitly enabling the arguments in the [allow_execute](/docs/core/config#allow_execute) option of the config file. It will also be blocked if a command comes from a remote source.
:::

This command will run a system command directly. For example:

```
**execute:reboot
```

Arguments are supported.

## delay

This command will delay the execution of the next command by the specified number of milliseconds. For example:

```
**delay:500
```

Will delay the next command by 500ms (half a second). This is a _blocking command_ and will delay the entire token read by the specified time.

It can be combined with other commands using the `||` separator. For example, to launch SNES, wait 10 seconds, then press F12:

```
_Console/SNES||**delay:10000||**input.key:88
```
