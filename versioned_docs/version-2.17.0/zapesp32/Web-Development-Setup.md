---
title: "Web Development Setup"
---

_This page is only applies to developers looking to modifiy the web ui._

The web ui is a [Svelte](https://svelte.dev/) project. The ui is compiled and minified to a single using [Vite](https://vite.dev/).

## Required Software
1. NodeJs (currently 22.13.x)
2. Visual Studio Code

## Setup Instructions
1. Open the "svelte-esp32" in visual studio code.
2. Open a new powershell terminal (Under the "Terminal" menu option).
3. Run the command "npm install"
4. Run the command "npm run setup" (adds additional config files)
5. (Windows Only): ensure 7zip is installed and is included in your path (ie. you can run 7z from the commandline)


## How To Develop 
You will need an ip address of a previously setup and running esp32. Once you have that device the setup, edit the VITE_ESP_IP variable to match the ip address. After saving the file, you can use the command "npm run dev" to start a proxy server to the esp32 server. Any changes down to the web files will automatically reload the page and render, without the need to recompile.

## Compilation
The web ui is compiled and minified to a singe file that is served from the esp32 server. That file is than converted to a PROGMEM File to C style array and stored in the index.h file, with the length being "#define index_html_len xxxxx", where xxxxx is the number of bytes. The following command are used to compile the project.
1. "npm run build"- this command will produce the single html file. No conversion takes place.
2. "npm run buildWin"-this command executes a Powershell script that compiles the single html file and overwrites the existing index.h file with its c style conversion. Requires 7zip properly configured on the machine.