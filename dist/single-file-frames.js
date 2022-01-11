!function(e){"function"==typeof define&&define.amd?define(e):e()}((function(){"use strict";const e="single-file-load-image",t="single-file-image-loaded",s=globalThis.browser,o=(e,t,s)=>globalThis.addEventListener(e,t,s),n=e=>globalThis.dispatchEvent(e),i=globalThis.CustomEvent,a=globalThis.document,r=globalThis.Document;let l;if(l=window._singleFile_fontFaces?window._singleFile_fontFaces:window._singleFile_fontFaces=new Map,a instanceof r&&s&&s.runtime&&s.runtime.getURL){o("single-file-new-font-face",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,l.set(JSON.stringify(s),t)})),o("single-file-delete-font",(e=>{const t=e.detail,s=Object.assign({},t);delete s.src,l.delete(JSON.stringify(s))})),o("single-file-clear-fonts",(()=>l=new Map));let e=a.createElement("script");e.src="data:,("+function(){"undefined"==typeof globalThis&&(window.globalThis=window);const e=globalThis.document,t=globalThis.console,s=e=>globalThis.dispatchEvent(e),o=globalThis.CustomEvent,n=globalThis.FileReader,i=globalThis.Blob,a=t&&t.warn&&((...e)=>t.warn(...e))||(()=>{}),r="single-file-new-font-face",l="single-file-delete-font",d="single-file-clear-fonts",c={family:"font-family",style:"font-style",weight:"font-weight",stretch:"font-stretch",unicodeRange:"unicode-range",variant:"font-variant",featureSettings:"font-feature-settings"};if(globalThis.FontFace){const t=globalThis.FontFace;let n;globalThis.FontFace=function(){return n||(a("SingleFile is hooking the FontFace constructor, document.fonts.delete and document.fonts.clear to handle dynamically loaded fonts."),n=!0),m(...arguments).then((e=>s(new o(r,{detail:e})))),new t(...arguments)},globalThis.FontFace.toString=function(){return"function FontFace() { [native code] }"};const i=e.fonts.delete;e.fonts.delete=function(t){return m(t.family).then((e=>s(new o(l,{detail:e})))),i.call(e.fonts,t)},e.fonts.delete.toString=function(){return"function delete() { [native code] }"};const c=e.fonts.clear;e.fonts.clear=function(){return s(new o(d)),c.call(e.fonts)},e.fonts.clear.toString=function(){return"function clear() { [native code] }"}}async function m(e,t,s){const o={};return o["font-family"]=e,o.src=t,s&&Object.keys(s).forEach((e=>{c[e]&&(o[c[e]]=s[e])})),new Promise((e=>{if(o.src instanceof ArrayBuffer){const t=new n;t.readAsDataURL(new i([o.src])),t.addEventListener("load",(()=>{o.src="url("+t.result+")",e(o)}))}else e(o)}))}}.toString()+")()",(a.documentElement||a).appendChild(e),e.remove(),e=a.createElement("script"),e.src=s.runtime.getURL("/dist/web/hooks/hooks-frames-web.js"),e.async=!1,(a.documentElement||a).appendChild(e),e.remove()}const d=new RegExp("\\\\([\\da-f]{1,6}[\\x20\\t\\r\\n\\f]?|([\\x20\\t\\r\\n\\f])|.)","ig");const c="data-single-file-removed-content",m="data-single-file-hidden-content",u="data-single-file-kept-content",f="data-single-file-hidden-frame",g="data-single-file-preserved-space-element",h="data-single-file-shadow-root-element",p="data-single-file-image",b="data-single-file-poster",y="data-single-file-canvas",w="data-single-file-import",E="data-single-file-movable-style",T="data-single-file-input-value",A="data-single-file-lazy-loaded-src",I="data-single-file-stylesheet",v="data-single-file-disabled-noscript",S="data-single-file-async-script",F="*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)",R=["NOSCRIPT","DISABLED-NOSCRIPT","META","LINK","STYLE","TITLE","TEMPLATE","SOURCE","OBJECT","SCRIPT","HEAD"],C=/^'(.*?)'$/,k=/^"(.*?)"$/,M={regular:"400",normal:"400",bold:"700",bolder:"700",lighter:"100"},N="single-file-ui-element";function x(e,t,s,o,n={usedFonts:new Map,canvases:[],images:[],posters:[],shadowRoots:[],imports:[],markedElements:[]},i){return Array.from(s.childNodes).filter((t=>t instanceof e.HTMLElement||t instanceof e.SVGElement)).forEach((s=>{let a,r,l;if(!o.autoSaveExternalSave&&(o.removeHiddenElements||o.removeUnusedFonts||o.compressHTML)&&(l=e.getComputedStyle(s),s instanceof e.HTMLElement&&o.removeHiddenElements&&(r=(i||s.closest("html > head"))&&R.includes(s.tagName)||s.closest("details"),r||(a=i||_(s,l),a&&(s.setAttribute(m,""),n.markedElements.push(s)))),!a)){if(o.compressHTML&&l){const e=l.getPropertyValue("white-space");e&&e.startsWith("pre")&&(s.setAttribute(g,""),n.markedElements.push(s))}o.removeUnusedFonts&&(q(l,o,n.usedFonts),q(e.getComputedStyle(s,":first-letter"),o,n.usedFonts),q(e.getComputedStyle(s,":before"),o,n.usedFonts),q(e.getComputedStyle(s,":after"),o,n.usedFonts))}!function(e,t,s,o,n,i,a){if("CANVAS"==s.tagName)try{n.canvases.push({dataURI:s.toDataURL("image/png","")}),s.setAttribute(y,n.canvases.length-1),n.markedElements.push(s)}catch(e){}if("IMG"==s.tagName){const t={currentSrc:i?"data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==":o.loadDeferredImages&&s.getAttribute(A)||s.currentSrc};if(n.images.push(t),s.setAttribute(p,n.images.length-1),n.markedElements.push(s),s.removeAttribute(A),a=a||e.getComputedStyle(s)){t.size=function(e,t,s){let o=t.naturalWidth,n=t.naturalHeight;if(!o&&!n){const i=null==t.getAttribute("style");let a,r,l,d,c,m,u,f,g=!1;if("content-box"==(s=s||e.getComputedStyle(t)).getPropertyValue("box-sizing")){const e=t.style.getPropertyValue("box-sizing"),s=t.style.getPropertyPriority("box-sizing"),o=t.clientWidth;t.style.setProperty("box-sizing","border-box","important"),g=t.clientWidth!=o,e?t.style.setProperty("box-sizing",e,s):t.style.removeProperty("box-sizing")}a=O("padding-left",s),r=O("padding-right",s),l=O("padding-top",s),d=O("padding-bottom",s),g?(c=O("border-left-width",s),m=O("border-right-width",s),u=O("border-top-width",s),f=O("border-bottom-width",s)):c=m=u=f=0,o=Math.max(0,t.clientWidth-a-r-c-m),n=Math.max(0,t.clientHeight-l-d-u-f),i&&t.removeAttribute("style")}return{pxWidth:o,pxHeight:n}}(e,s,a);const o=a.getPropertyValue("box-shadow"),n=a.getPropertyValue("background-image");o&&"none"!=o||n&&"none"!=n||!(t.size.pxWidth>1||t.size.pxHeight>1)||(t.replaceable=!0,t.backgroundColor=a.getPropertyValue("background-color"),t.objectFit=a.getPropertyValue("object-fit"),t.boxSizing=a.getPropertyValue("box-sizing"),t.objectPosition=a.getPropertyValue("object-position"))}}if("VIDEO"==s.tagName&&!s.poster){const e=t.createElement("canvas"),o=e.getContext("2d");e.width=s.clientWidth,e.height=s.clientHeight;try{o.drawImage(s,0,0,e.width,e.height),n.posters.push(e.toDataURL("image/png","")),s.setAttribute(b,n.posters.length-1),n.markedElements.push(s)}catch(e){}}"IFRAME"==s.tagName&&i&&o.removeHiddenElements&&(s.setAttribute(f,""),n.markedElements.push(s));"LINK"==s.tagName&&s.import&&s.import.documentElement&&(n.imports.push({content:V(s.import)}),s.setAttribute(w,n.imports.length-1),n.markedElements.push(s));"INPUT"==s.tagName&&("password"!=s.type&&(s.setAttribute(T,s.value),n.markedElements.push(s)),"radio"!=s.type&&"checkbox"!=s.type||(s.setAttribute(T,s.checked),n.markedElements.push(s)));"TEXTAREA"==s.tagName&&(s.setAttribute(T,s.value),n.markedElements.push(s));"SELECT"==s.tagName&&s.querySelectorAll("option").forEach((e=>{e.selected&&(e.setAttribute(T,""),n.markedElements.push(e))}));"SCRIPT"==s.tagName&&(s.async&&""!=s.getAttribute("async")&&"async"!=s.getAttribute("async")&&(s.setAttribute(S,""),n.markedElements.push(s)),s.textContent=s.textContent.replace(/<\/script>/gi,"<\\/script>"))}(e,t,s,o,n,a,l);const d=!(s instanceof e.SVGElement)&&P(s);if(d&&!s.classList.contains(N)){const i={};s.setAttribute(h,n.shadowRoots.length),n.markedElements.push(s),n.shadowRoots.push(i),x(e,t,d,o,n,a),i.content=d.innerHTML,i.delegatesFocus=d.delegatesFocus,i.mode=d.mode,d.adoptedStyleSheets&&d.adoptedStyleSheets.length&&(i.adoptedStyleSheets=Array.from(d.adoptedStyleSheets).map((e=>Array.from(e.cssRules).map((e=>e.cssText)).join("\n"))))}x(e,t,s,o,n,a),!o.autoSaveExternalSave&&o.removeHiddenElements&&i&&(r||""==s.getAttribute(u)?s.parentElement&&(s.parentElement.setAttribute(u,""),n.markedElements.push(s.parentElement)):a&&(s.setAttribute(c,""),n.markedElements.push(s)))})),n}function q(e,t,s){if(e){const o=e.getPropertyValue("font-style")||"normal";e.getPropertyValue("font-family").split(",").forEach((n=>{if(n=L(n),!t.loadedFonts||t.loadedFonts.find((e=>L(e.family)==n&&e.style==o))){const t=(i=e.getPropertyValue("font-weight"),M[i.toLowerCase().trim()]||i),a=e.getPropertyValue("font-variant")||"normal",r=[n,t,o,a];s.set(JSON.stringify(r),[n,t,o,a])}var i}))}}function P(e){const t=globalThis.chrome;if(e.openOrClosedShadowRoot)return e.openOrClosedShadowRoot;if(!(t&&t.dom&&t.dom.openOrClosedShadowRoot))return e.shadowRoot;try{return t.dom.openOrClosedShadowRoot(e)}catch(t){return e.shadowRoot}}function L(e=""){return function(e){e=e.match(C)?e.replace(C,"$1"):e.replace(k,"$1");return e.trim()}((t=e.trim(),t.replace(d,((e,t,s)=>{const o="0x"+t-65536;return o!=o||s?t:o<0?String.fromCharCode(o+65536):String.fromCharCode(o>>10|55296,1023&o|56320)})))).toLowerCase();var t}function _(e,t){let s=!1;if(t){const o=t.getPropertyValue("display"),n=t.getPropertyValue("opacity"),i=t.getPropertyValue("visibility");if(s="none"==o,!s&&("0"==n||"hidden"==i)&&e.getBoundingClientRect){const t=e.getBoundingClientRect();s=!t.width&&!t.height}}return Boolean(s)}function D(e){if(e){const t=[];return e.querySelectorAll("style").forEach(((s,o)=>{try{const n=e.createElement("style");n.textContent=s.textContent,e.body.appendChild(n);const i=n.sheet;n.remove(),i&&i.cssRules.length==s.sheet.cssRules.length||(s.setAttribute(I,o),t[o]=Array.from(s.sheet.cssRules).map((e=>e.cssText)).join("\n"))}catch(e){}})),t}}function O(e,t){if(t.getPropertyValue(e).endsWith("px"))return parseFloat(t.getPropertyValue(e))}function V(e){const t=e.doctype;let s="";return t&&(s="<!DOCTYPE "+t.nodeName,t.publicId?(s+=' PUBLIC "'+t.publicId+'"',t.systemId&&(s+=' "'+t.systemId+'"')):t.systemId&&(s+=' SYSTEM "'+t.systemId+'"'),t.internalSubset&&(s+=" ["+t.internalSubset+"]"),s+="> "),s+e.documentElement.outerHTML}const U=A,z=N,B="attributes",H=globalThis.browser,W=globalThis.document,j=globalThis.MutationObserver,J=(e,t,s)=>globalThis.addEventListener(e,t,s),K=(e,t,s)=>globalThis.removeEventListener(e,t,s),G=new Map;let Y;async function $(s){if(W.documentElement){G.clear();const o=Math.max(W.documentElement.scrollHeight-1.5*W.documentElement.clientHeight,0),a=Math.max(W.documentElement.scrollWidth-1.5*W.documentElement.clientWidth,0);if(globalThis.scrollY<=o&&globalThis.scrollX<=a)return function(s){return Y=0,new Promise((async o=>{let a;const r=new Set,l=new j((async e=>{if((e=e.filter((e=>e.type==B))).length){e.filter((e=>{if("src"==e.attributeName&&(e.target.setAttribute(U,e.target.src),e.target.addEventListener("load",c)),"src"==e.attributeName||"srcset"==e.attributeName||"SOURCE"==e.target.tagName)return!e.target.classList||!e.target.classList.contains(z)})).length&&(a=!0,await Z(l,s,f),r.size||await X(l,s,f))}}));async function d(e){await ee("idleTimeout",(async()=>{a?Y<10&&(Y++,se("idleTimeout"),await d(Math.max(500,e/2))):(se("loadTimeout"),se("maxTimeout"),Q(l,s,f))}),e)}function c(e){const t=e.target;t.removeAttribute(U),t.removeEventListener("load",c)}async function m(e){a=!0,await Z(l,s,f),await X(l,s,f),e.detail&&r.add(e.detail)}async function u(e){await Z(l,s,f),await X(l,s,f),r.delete(e.detail),r.size||await X(l,s,f)}function f(s){l.disconnect(),K(e,m),K(t,u),o(s)}await d(2*s.loadDeferredImagesMaxIdleTime),await Z(l,s,f),l.observe(W,{subtree:!0,childList:!0,attributes:!0}),J(e,m),J(t,u),function(e){e.loadDeferredImagesBlockCookies&&n(new i("single-file-block-cookies-start")),e.loadDeferredImagesBlockStorage&&n(new i("single-file-block-storage-start")),e.loadDeferredImagesKeepZoomLevel?n(new i("single-file-load-deferred-images-keep-zoom-level-start")):n(new i("single-file-load-deferred-images-start"))}(s)}))}(s)}}async function X(e,t,s){await ee("loadTimeout",(()=>Q(e,t,s)),t.loadDeferredImagesMaxIdleTime)}async function Z(e,t,s){await ee("maxTimeout",(async()=>{await se("loadTimeout"),await Q(e,t,s)}),10*t.loadDeferredImagesMaxIdleTime)}async function Q(e,t,s){await se("idleTimeout"),function(e){e.loadDeferredImagesBlockCookies&&n(new i("single-file-block-cookies-end")),e.loadDeferredImagesBlockStorage&&n(new i("single-file-block-storage-end")),e.loadDeferredImagesKeepZoomLevel?n(new i("single-file-load-deferred-images-keep-zoom-level-end")):n(new i("single-file-load-deferred-images-end"))}(t),await ee("endTimeout",(async()=>{await se("maxTimeout"),s()}),t.loadDeferredImagesMaxIdleTime/2),e.disconnect()}async function ee(e,t,s){if(H&&H.runtime&&H.runtime.sendMessage){if(!G.get(e)||!G.get(e).pending){const o={callback:t,pending:!0};G.set(e,o);try{await H.runtime.sendMessage({method:"singlefile.lazyTimeout.setTimeout",type:e,delay:s})}catch(o){te(e,t,s)}o.pending=!1}}else te(e,t,s)}function te(e,t,s){const o=G.get(e);o&&globalThis.clearTimeout(o),G.set(e,t),globalThis.setTimeout(t,s)}async function se(e){if(H&&H.runtime&&H.runtime.sendMessage)try{await H.runtime.sendMessage({method:"singlefile.lazyTimeout.clearTimeout",type:e})}catch(t){oe(e)}else oe(e)}function oe(e){const t=G.get(e);G.delete(e),t&&globalThis.clearTimeout(t)}H&&H.runtime&&H.runtime.onMessage&&H.runtime.onMessage.addListener&&H.runtime.onMessage.addListener((e=>{if("singlefile.lazyTimeout.onTimeout"==e.method){const t=G.get(e.type);if(t){G.delete(e.type);try{t.callback()}catch(t){oe(e.type)}}}}));const ne={ON_BEFORE_CAPTURE_EVENT_NAME:"single-file-on-before-capture",ON_AFTER_CAPTURE_EVENT_NAME:"single-file-on-after-capture",WIN_ID_ATTRIBUTE_NAME:"data-single-file-win-id",preProcessDoc:function(e,t,s){let o;return e.querySelectorAll("noscript:not([data-single-file-disabled-noscript])").forEach((e=>{e.setAttribute(v,e.textContent),e.textContent=""})),function(e){e.querySelectorAll("meta[http-equiv=refresh]").forEach((e=>{e.removeAttribute("http-equiv"),e.setAttribute("disabled-http-equiv","refresh")}))}(e),e.head&&e.head.querySelectorAll(F).forEach((e=>e.hidden=!0)),e.querySelectorAll("svg foreignObject").forEach((e=>{const t=e.querySelectorAll("html > head > "+F+", html > body > "+F);t.length&&(Array.from(e.childNodes).forEach((e=>e.remove())),t.forEach((t=>e.appendChild(t))))})),t&&e.documentElement?(o=x(t,e,e.documentElement,s),s.moveStylesInHead&&e.querySelectorAll("body style, body ~ style").forEach((e=>{const s=t.getComputedStyle(e);s&&_(e,s)&&(e.setAttribute(E,""),o.markedElements.push(e))}))):o={canvases:[],images:[],posters:[],usedFonts:[],shadowRoots:[],imports:[],markedElements:[]},{canvases:o.canvases,fonts:Array.from(l.values()),stylesheets:D(e),images:o.images,posters:o.posters,usedFonts:Array.from(o.usedFonts.values()),shadowRoots:o.shadowRoots,imports:o.imports,referrer:e.referrer,markedElements:o.markedElements}},serialize:V,postProcessDoc:function(e,t){if(e.querySelectorAll("[data-single-file-disabled-noscript]").forEach((e=>{e.textContent=e.getAttribute(v),e.removeAttribute(v)})),e.querySelectorAll("meta[disabled-http-equiv]").forEach((e=>{e.setAttribute("http-equiv",e.getAttribute("disabled-http-equiv")),e.removeAttribute("disabled-http-equiv")})),e.head&&e.head.querySelectorAll("*:not(base):not(link):not(meta):not(noscript):not(script):not(style):not(template):not(title)").forEach((e=>e.removeAttribute("hidden"))),!t){const s=[c,f,m,g,p,b,y,T,h,w,I,S];t=e.querySelectorAll(s.map((e=>"["+e+"]")).join(","))}t.forEach((e=>{e.removeAttribute(c),e.removeAttribute(m),e.removeAttribute(u),e.removeAttribute(f),e.removeAttribute(g),e.removeAttribute(p),e.removeAttribute(b),e.removeAttribute(y),e.removeAttribute(T),e.removeAttribute(h),e.removeAttribute(w),e.removeAttribute(I),e.removeAttribute(S),e.removeAttribute(E)}))},getShadowRoot:P},ie="__frameTree__::",ae='iframe, frame, object[type="text/html"][data]',re="singlefile.frameTree.initRequest",le="singlefile.frameTree.ackInitRequest",de="singlefile.frameTree.cleanupRequest",ce="singlefile.frameTree.initResponse",me=".",ue=globalThis.window==globalThis.top,fe=globalThis.browser,ge=globalThis.top,he=globalThis.MessageChannel,pe=globalThis.document,be=new Map;let ye;var we,Ee,Te;function Ae(e){e.frames.forEach((t=>ve("responseTimeouts",e.sessionId,t.windowId)));const t=be.get(e.sessionId);if(t){e.requestedFrameId&&(t.requestedFrameId=e.requestedFrameId),e.frames.forEach((e=>{let s=t.frames.find((t=>e.windowId==t.windowId));s||(s={windowId:e.windowId},t.frames.push(s)),s.processed||(s.content=e.content,s.baseURI=e.baseURI,s.title=e.title,s.canvases=e.canvases,s.fonts=e.fonts,s.stylesheets=e.stylesheets,s.images=e.images,s.posters=e.posters,s.usedFonts=e.usedFonts,s.shadowRoots=e.shadowRoots,s.imports=e.imports,s.processed=e.processed)}));t.frames.filter((e=>!e.processed)).length||(t.frames=t.frames.sort(((e,t)=>t.windowId.split(me).length-e.windowId.split(me).length)),t.resolve&&(t.requestedFrameId&&t.frames.forEach((e=>{e.windowId==t.requestedFrameId&&(e.requestedFrame=!0)})),t.resolve(t.frames)))}}function Ie(e,t,s,o){const n=Me(e);!function(e,t,s,o,n){const i=[];let a;be.get(n)?a=be.get(n).requestTimeouts:(a={},be.set(n,{requestTimeouts:a}));t.forEach(((e,t)=>{const s=o+me+t;e.setAttribute(ne.WIN_ID_ATTRIBUTE_NAME,s),i.push({windowId:s})})),Re({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),t.forEach(((e,t)=>{const i=o+me+t;try{Ce(e.contentWindow,{method:re,windowId:i,sessionId:n,options:s})}catch(e){}a[i]=globalThis.setTimeout((()=>Re({frames:[{windowId:i,processed:!0}],sessionId:n})),5e3)})),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o),n.length&&function(e,t,s,o,n){const i=[];t.forEach(((e,t)=>{const a=o+me+t;let r;try{r=e.contentDocument}catch(e){}if(r)try{const t=e.contentWindow;t.stop(),ve("requestTimeouts",n,a),Ie(r,s,a,n),i.push(ke(r,t,a,s))}catch(e){i.push({windowId:a,processed:!0})}})),Re({frames:i,sessionId:n,requestedFrameId:e.documentElement.dataset.requestedFrameId&&o}),delete e.documentElement.dataset.requestedFrameId}(e,n,t,s,o)}function ve(e,t,s){const o=be.get(t);if(o&&o[e]){const t=o[e][s];t&&(globalThis.clearTimeout(t),delete o[e][s])}}function Se(e,t){const s=be.get(e);s&&s.responseTimeouts&&(s.responseTimeouts[t]=globalThis.setTimeout((()=>Re({frames:[{windowId:t,processed:!0}],sessionId:e})),1e4))}function Fe(e,t,s){e.forEach(((e,o)=>{const n=t+me+o;e.removeAttribute(ne.WIN_ID_ATTRIBUTE_NAME);try{Ce(e.contentWindow,{method:de,windowId:n,sessionId:s})}catch(e){}})),e.forEach(((e,o)=>{const n=t+me+o;let i;try{i=e.contentDocument}catch(e){}if(i)try{Fe(Me(i),n,s)}catch(e){}}))}function Re(e){e.method=ce;try{ge.singlefile.processors.frameTree.initResponse(e)}catch(t){Ce(ge,e,!0)}}function Ce(e,t,s){if(e==ge&&fe&&fe.runtime&&fe.runtime.sendMessage)fe.runtime.sendMessage(t);else if(s){const s=new he;e.postMessage(ie+JSON.stringify({method:t.method,sessionId:t.sessionId}),"*",[s.port2]),s.port1.postMessage(t)}else e.postMessage(ie+JSON.stringify(t),"*")}function ke(e,t,s,o){const n=ne.preProcessDoc(e,t,o),i=ne.serialize(e);ne.postProcessDoc(e,n.markedElements);return{windowId:s,content:i,baseURI:e.baseURI.split("#")[0],title:e.title,canvases:n.canvases,fonts:n.fonts,stylesheets:n.stylesheets,images:n.images,posters:n.posters,usedFonts:n.usedFonts,shadowRoots:n.shadowRoots,imports:n.imports,processed:!0}}function Me(e){let t=Array.from(e.querySelectorAll(ae));return e.querySelectorAll("*").forEach((e=>{const s=ne.getShadowRoot(e);s&&(t=t.concat(...s.querySelectorAll(ae)))})),t}ue&&(ye="0",fe&&fe.runtime&&fe.runtime.onMessage&&fe.runtime.onMessage.addListener&&fe.runtime.onMessage.addListener((e=>e.method==ce?(Ae(e),Promise.resolve({})):e.method==le?(ve("requestTimeouts",e.sessionId,e.windowId),Se(e.sessionId,e.windowId),Promise.resolve({})):void 0))),we="message",Ee=async e=>{if("string"==typeof e.data&&e.data.startsWith(ie)){e.preventDefault(),e.stopPropagation();const t=JSON.parse(e.data.substring(ie.length));t.method==re?(e.source&&Ce(e.source,{method:le,windowId:t.windowId,sessionId:t.sessionId}),ue||(globalThis.stop(),t.options.loadDeferredImages&&$(t.options),await async function(e){const t=e.sessionId,s=globalThis._singleFile_waitForUserScript;ue||(ye=globalThis.frameId=e.windowId),Ie(pe,e.options,ye,t),ue||(e.options.userScriptEnabled&&s&&await s(ne.ON_BEFORE_CAPTURE_EVENT_NAME),Re({frames:[ke(pe,globalThis,ye,e.options)],sessionId:t,requestedFrameId:pe.documentElement.dataset.requestedFrameId&&ye}),e.options.userScriptEnabled&&s&&await s(ne.ON_AFTER_CAPTURE_EVENT_NAME),delete pe.documentElement.dataset.requestedFrameId)}(t))):t.method==le?(ve("requestTimeouts",t.sessionId,t.windowId),Se(t.sessionId,t.windowId)):t.method==de?function(e){const t=e.sessionId;Fe(Me(pe),e.windowId,t)}(t):t.method==ce&&be.get(t.sessionId)&&(e.ports[0].onmessage=e=>Ae(e.data))}},Te=!0,globalThis.addEventListener(we,Ee,Te)}));
