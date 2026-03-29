# Manual Install

Alternative installation methods if you prefer not to use the automated install script.

Download Zaparoo Core for Batocera from the [Downloads page](/downloads/) and unzip it. It comes with two files:

- `zaparoo` - The main Zaparoo Core executable
- `zaparoo_service` - A service script that runs Zaparoo Core on startup

## Network Share

1. Copy the `zaparoo` file into the `system` directory of your Batocera share (`\\BATOCERA\share\system` on Windows)
2. Create a `services` directory inside the `system` directory if it doesn't exist
3. Copy the `zaparoo_service` file into the `services` directory
4. Enable the service:
   - Press `Start` to open the main menu
   - Navigate to `System Settings` > `Services` (in the Advanced section)
   - Find `zaparoo_service` and enable it
5. Restart Batocera

## USB

1. Copy both files to a USB drive and plug it into your Batocera device
2. Press `F1` to open the file manager and navigate to the USB drive
3. Copy the `zaparoo` file into `/userdata/system`
4. Create a `services` directory inside `/userdata/system` if it doesn't exist
5. Copy the `zaparoo_service` file into the `services` directory
6. Enable the service:
   - Press `Start` to open the main menu
   - Navigate to `System Settings` > `Services` (in the Advanced section)
   - Find `zaparoo_service` and enable it
7. Restart Batocera

## SSH

1. Copy the `zaparoo` file to `/userdata/system` using `scp` or [WinSCP](https://winscp.net/)
2. SSH into your device and run:

```bash
cd /userdata/system
chmod +x ./zaparoo
./zaparoo -install
batocera-services enable zaparoo_service
batocera-services start zaparoo_service
```

:::tip
Not familiar with SSH? See Batocera's [SSH guide](https://wiki.batocera.org/access_the_batocera_via_ssh). Default credentials are `root` / `linux`.
:::
