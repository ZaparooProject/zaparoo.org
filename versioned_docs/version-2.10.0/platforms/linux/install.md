# Manual Install

Component-based manual installation for Linux.

Download Zaparoo Core for Linux from the [Downloads page](/downloads/), unzip it and copy the `zaparoo` file somewhere like your home directory or `/usr/local/bin`.

## Component Installation

Zaparoo supports installing individual components:

```bash
./zaparoo -install application  # Installs the application binary
./zaparoo -install desktop      # Installs desktop integration
./zaparoo -install service      # Installs systemd service
./zaparoo -install hardware     # Installs udev rules and hardware support
```

For a complete installation, run all four commands. The `hardware` component creates:

- A udev rule allowing users to read NFC reader serial devices
- A modprobe blacklist entry to fix ACR122U reader issues

## Starting the Service

```bash
systemctl --user enable zaparoo.service
systemctl --user start zaparoo.service
```

## Uninstalling

To uninstall components:

```bash
./zaparoo -uninstall application
./zaparoo -uninstall desktop
./zaparoo -uninstall service
./zaparoo -uninstall hardware
```
