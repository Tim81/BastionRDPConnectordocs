---
title: Diagnose
description: Was der Info-Dialog zeigt, was Diagnoseinformationen kopieren sammelt, und was draußen bleibt.
appliesTo: '3.3.5'
lastReviewed: '2026-07-25'
---

Eine Schaltfläche **i** in der oberen Leiste öffnet den Info-Dialog. Er zeigt die Anwendungsversion, eine Zeile zu Ihrer Plattform und zwei Aktionen, um Informationen aus der Anwendung zu erhalten, wenn etwas Fehlerbehebung braucht.

## Der Info-Dialog

<!-- Mirrors src/components/ScreenAbout.astro -->
<figure class="appshot">
  <div class="frame">
    <svg viewBox="0 0 300 372" role="img" aria-labelledby="s-about-win">
      <title id="s-about-win">Der Info-Dialog unter Windows. Er listet den Anwendungsnamen, die Version und die Plattform auf, gefolgt von zwei Schaltflächen: Log-Ordner öffnen und Diagnoseinformationen kopieren.</title>
      <rect class="ui-win" x="1" y="1" width="298" height="370" rx="6"/>
      <path class="ui-bar" d="M2 2 H298 V22 H2 Z"/>
      <text class="ui-title" x="10" y="15">Über</text>
      <path d="M280 9 l7 7 M287 9 l-7 7" stroke="#7B8794" stroke-width="1.1" fill="none"/>
      <text class="ui-tb" x="10" y="46">Azure Bastion RDP Connector</text>
      <text class="ui-p" x="10" y="60">Version 3.3.5</text>
      <text class="ui-p" x="10" y="72">Windows 11 · x64</text>
      <line x1="10" y1="86" x2="290" y2="86" stroke="#DCE2EA" stroke-width="1"/>
      <text class="ui-l" x="10" y="104">Diagnose</text>
      <rect class="ui-btn-2" x="10" y="110" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="126" text-anchor="middle">Log-Ordner öffnen</text>
      <text class="ui-p" x="10" y="148">Öffnet den Ordner mit debug.log</text>
      <text class="ui-p" x="10" y="159">und dessen zehn archivierten Sitzungen.</text>
      <rect class="ui-btn-2" x="10" y="170" width="280" height="24" rx="4"/>
      <text class="ui-tb" x="150" y="186" text-anchor="middle">Diagnoseinformationen kopieren</text>
      <text class="ui-p" x="10" y="208">Kopiert Systeminfo, das aktuelle Protokoll,</text>
      <text class="ui-p" x="10" y="219">und archivierte Sitzungen in die Zwischenablage.</text>
      <text class="ui-p" x="10" y="230">Bereits redigiert, begrenzt auf ca. 1 MB.</text>
      <rect class="ui-btn" x="190" y="320" width="100" height="26" rx="4"/>
      <text class="ui-bt" x="240" y="337" text-anchor="middle">Schließen</text>
    </svg>
  </div>
  <figcaption><b>Windows</b> Der Info-Dialog unter Windows. Er zeigt die Anwendungsversion und Plattform und bietet Log-Ordner öffnen und Diagnoseinformationen kopieren.</figcaption>
</figure>

| Aktion | Was sie tut |
| --- | --- |
| Log-Ordner öffnen | Öffnet den Ordner mit `debug.log` und dessen zehn archivierten Sitzungen, im Explorer unter Windows oder im Finder unter macOS. |
| Diagnoseinformationen kopieren | Kopiert ein Diagnosepaket in die Zwischenablage. |

## Was im Diagnosepaket enthalten ist

Diagnoseinformationen kopieren erstellt ein Textpaket aus:

- Systeminformationen: Betriebssystem, Anwendungsversion, Plattform.
- Dem `debug.log` der aktuellen Sitzung.
- Den archivierten Sitzungen, `debug.0.log` bis `debug.9.log`, neueste zuerst.

Jeder Protokolleintrag im Paket ist auf 100 KB begrenzt, und das gesamte Paket wächst nicht über rund 1 MB hinaus. Diese Grenze hält ein Paket aus einer langen Reihe von Sitzungen praktikabel genug, um es in ein Support-Ticket oder eine Chat-Nachricht einzufügen.

## Was redigiert wird, und was nicht

Alles im Paket wird redigiert, bevor es die Zwischenablage erreicht, genauso wie es redigiert wird, bevor es überhaupt in `debug.log` geschrieben wird. Bearer-Token, JWTs, Passwörter und API-Schlüssel werden ersetzt, bevor etwas die Festplatte berührt.

Subscription-IDs, Ressourcen-IDs, GUIDs und IP-Adressen bleiben erhalten. Sie sind keine Geheimnisse, und ihr Entfernen würde das Protokoll deutlich weniger nützlich machen, um herauszufinden, bei welcher VM, Subscription oder welchem Bastion-Host ein Problem aufgetreten ist.

<div class="callout note">
<span class="eyebrow">Hinweis</span>
<p>Die Redaktion erfolgt beim Schreiben, nicht beim Kopieren. Ein Protokolleintrag wird nie mit einem aktiven Token auf die Festplatte geschrieben, sodass nichts Sensibles in <code>debug.log</code> liegt, das später erst redigiert werden müsste.</p>
</div>

## Ein Protokoll an den Support senden

Fügen Sie die Ausgabe von Diagnoseinformationen kopieren direkt in ein Support-Ticket oder eine Chat-Nachricht ein. Ist das Paket abgeschnitten und Sie benötigen das vollständige Protokoll einer Sitzung, verwenden Sie Log-Ordner öffnen, um die genaue Datei zu finden und stattdessen anzuhängen.
