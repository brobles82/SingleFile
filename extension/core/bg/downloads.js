/*
 * Copyright 2010-2020 Gildas Lormeau
 * contact : gildas.lormeau <at> gmail.com
 *
 * This file is part of SingleFile.
 *
 *   The code in this file is free software: you can redistribute it and/or
 *   modify it under the terms of the GNU Affero General Public License
 *   (GNU AGPL) as published by the Free Software Foundation, either version 3
 *   of the License, or (at your option) any later version.
 *
 *   The code in this file is distributed in the hope that it will be useful,
 *   but WITHOUT ANY WARRANTY; without even the implied warranty of
 *   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 *   General Public License for more details.
 *
 *   As additional permission under GNU AGPL version 3 section 7, you may
 *   distribute UNMODIFIED VERSIONS OF THIS file without the copy of the GNU
 *   AGPL normally required by section 4, provided you include this license
 *   notice and a URL through which recipients can access the Corresponding
 *   Source.
 */

/* global browser, Blob, URL, document */

import * as config from "./config.js";
import * as bookmarks from "./bookmarks.js";
import * as companion from "./companion.js";
import * as business from "./business.js";
import * as editor from "./editor.js";
import {
  launchWebAuthFlow,
  extractAuthCode,
  promptValue,
} from "./tabs-util.js";
import * as ui from "./../../ui/bg/index.js";
import * as woleet from "./../../lib/woleet/woleet.js";
import { pushGitHub } from "./../../lib/github/github.js";
import { download } from "./download-util.js";

const partialContents = new Map();
const MIMETYPE_HTML = "text/html";

const CONFLICT_ACTION_SKIP = "skip";
const CONFLICT_ACTION_UNIQUIFY = "uniquify";
const REGEXP_ESCAPE = /([{}()^$&.*?/+|[\\\\]|\]|-)/g;

const manifest = browser.runtime.getManifest();
const requestPermissionIdentity =
  manifest.optional_permissions &&
  manifest.optional_permissions.includes("identity");
let originalUrl;

export { onMessage, downloadPage, saveToGitHub };

async function onMessage(message, sender) {
  if (message.method.endsWith(".download")) {
    return downloadTabPage(message, sender.tab);
  }

  if (message.method.endsWith(".end")) {
    if (message.hash) {
      try {
        await woleet.anchor(message.hash, message.woleetKey);
      } catch (error) {
        ui.onError(sender.tab.id, error.message, error.link);
      }
    }
    business.onSaveEnd(message.taskId);
    return {};
  }
  if (message.method.endsWith(".getInfo")) {
    return business.getTasksInfo();
  }
  if (message.method.endsWith(".cancel")) {
    business.cancelTask(message.taskId);
    return {};
  }
  if (message.method.endsWith(".cancelAll")) {
    business.cancelAllTasks();
    return {};
  }
  if (message.method.endsWith(".saveUrls")) {
    business.saveUrls(message.urls);
    return {};
  }
}

async function downloadTabPage(message, tab) {
  let contents;
  if (message.truncated) {
    contents = partialContents.get(tab.id);
    if (!contents) {
      contents = [];
      partialContents.set(tab.id, contents);
    }
    contents.push(message.content);
    if (message.finished) {
      partialContents.delete(tab.id);
    }
  } else if (message.content) {
    contents = [message.content];
  }
  if (!message.truncated || message.finished) {
    if (message.openEditor) {
      ui.onEdit(tab.id);
      originalUrl = tab.url;
      await editor.open({
        tabIndex: tab.index + 1,
        filename: message.filename,
        content: contents.join(""),
      });
    } else {
      if (message.saveToClipboard) {
        message.content = contents.join("");
        saveToClipboard(message);
        ui.onEnd(tab.id);
      } else {
        await downloadContent(contents, tab, tab.incognito, message);
      }
    }
  }
  return {};
}

async function downloadContent(contents, tab, incognito, message) {
  try {
    if (message.saveToGitHub) {
      let customUrl = editor.isEditor(tab) ? originalUrl : tab.url;
      await (
        await saveToGitHub(
          message.taskId,
          message.filename,
          contents.join(""),
          message.githubToken,
          customUrl
        )
      ).pushPromise;
    } else if (message.saveWithCompanion) {
      await companion.save({
        filename: message.filename,
        content: message.content,
        filenameConflictAction: message.filenameConflictAction,
      });
    } else {
      message.url = URL.createObjectURL(
        new Blob(contents, { type: MIMETYPE_HTML })
      );
      await downloadPage(message, {
        confirmFilename: message.confirmFilename,
        incognito,
        filenameConflictAction: message.filenameConflictAction,
        filenameReplacementCharacter: message.filenameReplacementCharacter,
        includeInfobar: message.includeInfobar,
      });
    }
    ui.onEnd(tab.id);
    if (message.openSavedPage) {
      const createTabProperties = {
        active: true,
        url: URL.createObjectURL(new Blob(contents, { type: MIMETYPE_HTML })),
      };
      if (tab.index != null) {
        createTabProperties.index = tab.index + 1;
      }
      browser.tabs.create(createTabProperties);
    }
  } catch (error) {
    if (!error.message || error.message != "upload_cancelled") {
      console.error(error); // eslint-disable-line no-console
      ui.onError(tab.id, error.message, error.link);
    }
  } finally {
    if (editor.isEditor(tab)) {
      chrome.tabs.remove(tab.id, function () {});
    }
    if (message.url) {
      URL.revokeObjectURL(message.url);
    }
  }
}

function getRegExp(string) {
  return string.replace(REGEXP_ESCAPE, "\\$1");
}

// aqui
async function saveToGitHub(taskId, filename, content, githubToken, url) {
  const taskInfo = business.getTaskInfo(taskId);
  if (!taskInfo || !taskInfo.cancelled) {
    const pushInfo = pushGitHub(githubToken, url, filename, content);
    business.setCancelCallback(taskId, pushInfo.cancelPush);
    try {
      await (
        await pushInfo
      ).pushPromise;
      return pushInfo;
    } catch (error) {
      throw new Error(error.message + " (GitHub)");
    }
  }
}

async function downloadPage(pageData, options) {
  const filenameConflictAction = options.filenameConflictAction;
  let skipped;
  if (filenameConflictAction == CONFLICT_ACTION_SKIP) {
    const downloadItems = await browser.downloads.search({
      filenameRegex: "(\\\\|/)" + getRegExp(pageData.filename) + "$",
      exists: true,
    });
    if (downloadItems.length) {
      skipped = true;
    } else {
      options.filenameConflictAction = CONFLICT_ACTION_UNIQUIFY;
    }
  }
  if (!skipped) {
    const downloadInfo = {
      url: pageData.url,
      saveAs: options.confirmFilename,
      filename: pageData.filename,
      conflictAction: options.filenameConflictAction,
    };
    if (options.incognito) {
      downloadInfo.incognito = true;
    }
    const downloadData = await download(
      downloadInfo,
      options.filenameReplacementCharacter
    );
    if (
      downloadData.filename &&
      pageData.bookmarkId &&
      pageData.replaceBookmarkURL
    ) {
      if (!downloadData.filename.startsWith("file:")) {
        if (downloadData.filename.startsWith("/")) {
          downloadData.filename = downloadData.filename.substring(1);
        }
        downloadData.filename =
          "file:///" + downloadData.filename.replace(/#/g, "%23");
      }
      await bookmarks.update(pageData.bookmarkId, {
        url: downloadData.filename,
      });
    }
  }
}

function saveToClipboard(pageData) {
  const command = "copy";
  document.addEventListener(command, listener);
  document.execCommand(command);
  document.removeEventListener(command, listener);

  function listener(event) {
    event.clipboardData.setData(MIMETYPE_HTML, pageData.content);
    event.clipboardData.setData("text/plain", pageData.content);
    event.preventDefault();
  }
}
