---
title: "TapTo Core v2.0.1 released"
date: 2024-11-09
tags: ["update", "core"]
summary: "TapTo Core v2.0.1 is now available! This is a minor release that only affects the MiSTer platform."
showSummary: true
---

This is a minor release that only affects the MiSTer platform.

The MiSTer GUI (when running tapto from the Scripts menu) has a new Export Log button which allows uploading the active TapTo log file from `/tmp/tapto` to termbin.com (exactly how the old TapTUI script did) or copying it to the root of the SD card so it can be transferred to a computer.

The games database update button and database status display has been removed to prepare for some further backend updates. Please use the TapTo Life app to update it or trigger it via an API call: `tapto.sh -api media.index`

{{< button href="/downloads#zaparoo-core" target="_self" >}}
{{< icon "download" >}} Download v2.0.1
{{< /button >}}<br>

{{< button href="https://github.com/TapToCommunity/tapto/releases/tag/v2.0.1" target="_self" >}}
{{< icon "github" >}} GitHub
{{< /button >}}
