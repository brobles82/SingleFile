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

/* global fetch, btoa, AbortController */

export { pushGitHub };

let pendingPush;

async function pushGitHub(token, url, title, content) {
  while (pendingPush) {
    await pendingPush;
  }
  const controller = new AbortController();
  pendingPush = (async () => {
    try {
      await createContent({ url, content }, controller.signal);
    } finally {
      pendingPush = null;
    }
  })();
  return {
    cancelPush: () => controller.abort(),
    pushPromise: pendingPush,
  };

  async function createContent({ url, content }) {
    try {
      let web = {
        title: title,
        url: url,
        content: content,
        token: token,
      };

      // // const response = await fetch(`http://localhost:3000/api/v1/sfile`, {

      const endpointUrl = "http://localhost:3000/api/arkwebsite-creation";

      const response = await fetch(endpointUrl, {
        //  const response = await fetch(`https://arkwsites.com/api/v1/sfile`, {
        method: "POST",
        body: JSON.stringify(web),
        headers: {
          "Content-Type": "application/json",
          //  Authorization: `token ${token}`,
        },
      });

      // let formData = new FormData();
      // formData.append("name", title);
      // formData.append("url", url);
      // formData.append("content", content);
      // formData.append("token", token);

      // const response = await fetch(
      //   "http://192.168.1.140:3000/api/arkwebsite-creation",
      //   {
      //     body: formData,
      //     method: "post",
      //   }
      // );

      const responseData = await response.json();
      // const responseData2 = await response2.json();

      if (response.status < 400) {
        return responseData;
      } else {
        throw new Error(responseData.message);
      }
    } catch (error) {
      if (error.name != "AbortError") {
        throw error;
      }
    }
  }
}
