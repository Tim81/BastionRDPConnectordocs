---
title: Diagnostics
description: What the About dialog shows, what Copy Diagnostic Info collects, and what stays out of it.
appliesTo: '3.3.4'
lastReviewed: '2026-07-25'
---

An **i** button in the top bar opens the About dialog. It shows the application version, a line about your platform, and two actions for getting information out of the application when something needs troubleshooting.

## The About dialog

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">The About dialog on Windows. It lists the application name, version, and platform, then two buttons: Open Log Folder and Copy Diagnostic Info.</title>

      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>

      <text class="ui-title" x="10" y="15">About</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>

      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Version 3.3.4</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>

      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>

      <text class="ui-l" x="10" y="104">Diagnostics</text>

      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Open Log Folder</text>

      <text class="ui-p" x="10" y="148">Opens the folder holding debug.log</text>
      <text class="ui-p" x="10" y="159">and its ten archived sessions.</text>

      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Copy Diagnostic Info</text>

      <text class="ui-p" x="10" y="208">Copies system info, the current log,</text>
      <text class="ui-p" x="10" y="219">and archived sessions to the clipboard.</text>
      <text class="ui-p" x="10" y="230">Already redacted, capped at ~1 MB.</text>

      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Close</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> The About dialog on Windows. It shows the application version and platform, and offers Open Log Folder and Copy Diagnostic Info.</figcaption>
</figure>

| Action | What it does |
| --- | --- |
| Open Log Folder | Opens the folder holding `debug.log` and its ten archived sessions, in Explorer on Windows or Finder on macOS. |
| Copy Diagnostic Info | Copies a diagnostic bundle to the clipboard. |

## What's in the diagnostic bundle

Copy Diagnostic Info builds a text bundle from:

- System information: operating system, application version, platform.
- The current session's `debug.log`.
- The archived sessions, `debug.0.log` through `debug.9.log`, newest first.

Each log entry in the bundle is capped at 100 KB, and the whole bundle stops growing at roughly 1 MB. That limit keeps a bundle from a long run of sessions practical to paste into a support ticket or a chat message.

## What's redacted, and what isn't

Everything in the bundle is redacted before it reaches the clipboard, the same way it's redacted before it's written to `debug.log` in the first place. Bearer tokens, JWTs, passwords, and API keys are replaced before anything touches disk.

Subscription IDs, resource IDs, GUIDs, and IP addresses stay in. They aren't secrets, and removing them would make the log far less useful for tracking down which VM, subscription, or Bastion host a problem happened on.

<div class="callout note">
<span class="eyebrow">Note</span>
<p>Redaction happens at write time, not at copy time. A log entry is never written to disk with a live token in it, so there's nothing sensitive sitting in <code>debug.log</code> waiting to be redacted later.</p>
</div>

## Sending a log to support

Paste the output of Copy Diagnostic Info directly into a support ticket or chat message. If the bundle is truncated and you need a full session's log, use Open Log Folder to find the exact file and attach it instead.
