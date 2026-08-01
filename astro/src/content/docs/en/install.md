---
title: Install
description: Azure Bastion RDP Connector ships through the Microsoft Store. There is no direct download and no separate installer.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Azure Bastion RDP Connector is distributed as a Microsoft Store app, product ID `9N9MJ1V43Z6T`. Windows handles the download, the install, and every later update. There is no ZIP file to extract and no SmartScreen prompt to click through.

## Install on Windows

1. Open the Store listing, either with the deep link `ms-windows-store://pdp/?productid=9N9MJ1V43Z6T`, which opens the Store app directly, or from a browser at [apps.microsoft.com/detail/9N9MJ1V43Z6T](https://apps.microsoft.com/detail/9N9MJ1V43Z6T).
2. Select **Get** or **Install**. A per-user install needs no administrator rights.
3. Launch it from the Start menu. Search for "Bastion RDP Connector".

<div class="callout note">
<span class="eyebrow">Note</span>
<p>Because the Store owns the install, updates happen in the background. You do not need to check for a new version yourself.</p>
</div>

## macOS

A macOS build has existed since version 3.1.2, for both Apple Silicon and Intel Macs, but it is not publicly available yet. There is no macOS download to offer here. When it ships, this page will carry the same Store-style listing that Windows already has.

## What the first launch does

Nothing is configured during install itself. The application reads `%APPDATA%\BastionRDPConnector\settings.json` on startup, and if that file does not exist yet, it starts with defaults and creates it on first save. [Sign in](../sign-in/) covers what happens the first time you open the app and it needs to authenticate.
