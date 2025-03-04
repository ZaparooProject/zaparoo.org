---
title: "Zaparoo App v1.5.0 released"
date: 2025-03-04
tags: ["update", "app"]
summary: "Zaparoo App v1.5.0 is now available! New features and initial support for Zaparoo Online."
showSummary: true
---

The Zaparoo App v1.5.0 update is now available in the App Store and Play Store. This release adds a couple new features, initial support for Zaparoo Online and includes many background updates for dependencies.

## New Features

- Quick changing connected devices from the Settings page. After successfully connecting to a device, it will be added to the device history list, and then is available to easily swap between with a button press.
- New NFC utilities page in the Create section. This page lets you read raw information from an NFC tag, erase a tag or make it read-only.

## Known Issues

- On iOS devices, attempting to write to a blank NFC tag may result in an error. If you try it again once or twice it should work, then it will as expected. This is being investigated. Androids and tags which already contain data are not affected.
- Some UI components may not display correctly. The app is being migrated to a new UI framework which resulted in some edge case component issues. They'll be resolved in later updates.

<br>

{{< button href="/downloads#zaparoo-app" target="_self" >}}
{{< icon "download" >}} Download App v1.5.0
{{< /button >}}<br>

{{< button href="https://github.com/ZaparooProject/zaparoo-app/" target="_self" >}}
{{< icon "github" >}} App GitHub
{{< /button >}}
