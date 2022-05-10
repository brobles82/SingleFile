# SingleFile (ArkWSites version)

This is a modified version of SingleFile for integrate with arkWsites
SingleFile is a Web Extension (and a CLI tool) compatible with Chrome, Firefox (Desktop and Mobile), Microsoft Edge, Vivaldi, Brave, Waterfox, Yandex browser, and Opera. It helps you to save a complete web page into a single HTML file.

## Table of Contents

- [Demo](#demo)
- [Install](#install)
- [Getting started](#getting-started)
- [Additional notes](#additional-notes)
- [FAQ](#faq)
- [Release notes](#release-notes)
- [Known issues](#known-issues)
- [Troubleshooting unknown issues](#troubleshooting-unknown-issues)
- [Command Line Interface](#command-line-interface)
- [Integration with user scripts](#integration-with-user-scripts)
- [SingleFileZ](#singlefilez)
- [File format comparison](#file-format-comparison)
- [Projects using SingleFile](#projects-using-singlefile)
- [Privacy policy](#privacy-policy)
- [Contributors](#contributors)
- [Icons](#icons)
- [Code derived from third party projects](#code-derived-from-third-party-projects)
- [License](#license)

## Demo

![](https://github.com/gildas-lormeau/SingleFile-Demos/blob/master/demo-sf.gif)

## Install

SingleFile can be installed on:

- Firefox: https://addons.mozilla.org/firefox/addon/single-file
- Chrome: https://chrome.google.com/extensions/detail/mpiodijhokgodhhofbcjdecpffjipkle
- Microsoft Edge: https://microsoftedge.microsoft.com/addons/detail/efnbkdcfmcmnhlkaijjjmhjjgladedno

This version can only be isntaled manually. !!

## Getting started

- Wait until the page is fully loaded.
- Click on the SingleFile button in the extension toolbar to save the page.
- You can click again on the button to cancel the action when processing a page.

## Additional notes

- Open the context menu by right-clicking the SingleFile button in the extension toolbar or on the webpage. It allows you to save:
  - the current tab,
  - the selected content,
  - the selected frame.
- You can also process multiple tabs in one click and save:
  - the selected tabs,
  - the unpinned tabs,
  - all the tabs.
- Select "Annotate and save the page..." in the context menu to:
  - highlight text,
  - add notes,
  - remove content.
- The context menu also allows you to activate the auto-save of:
  - the current tab,
  - the unpinned tabs,
  - all the tabs.
- With auto-save active, pages are automatically saved every time after being loaded (or before being unloaded if not).
- Right-click on the SingleFile button and select "Manage extension" (Firefox) / "Options" (Chrome) to open the options page.
- Enable the option "Destination > save to Google Drive" or "Destination > upload to GitHub" to upload pages to Google Drive or GitHub respectively.
- Enable the option "Misc. > add proof of existence" to prove the existence of saved pages by linking the SHA256 of the pages into the blockchain.
- You can use the customizable shortkey Ctrl+Shift+Y to save the current tab or the selected tabs. Go to about:addons and select "Manage extension shortcuts" in the cogwheel menu to change it in Firefox. Go to chrome://extensions/shortcuts to change it in Chrome.
- The default save folder is the download folder configured in your browser, cf. about:addons in Firefox and chrome://settings in Chrome.
- See the extension help in the options page for more detailed information about the options and technical notes.

Note branch for remix -> remixapp

For do the builds
npx rollup -c rollup.config.dev.js
