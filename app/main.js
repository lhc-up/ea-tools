(()=>{var e={222:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.getElectronBinding=void 0,t.getElectronBinding=e=>process._linkedBinding?process._linkedBinding("electron_common_"+e):process.electronBinding?process.electronBinding(e):null},897:(e,t,n)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.deserialize=t.serialize=t.isSerializableObject=t.isPromise=void 0;const r=n(298);t.isPromise=function(e){return e&&e.then&&e.then instanceof Function&&e.constructor&&e.constructor.reject&&e.constructor.reject instanceof Function&&e.constructor.resolve&&e.constructor.resolve instanceof Function};const o=[Boolean,Number,String,Date,Error,RegExp,ArrayBuffer];function i(e){return null===e||ArrayBuffer.isView(e)||o.some((t=>e instanceof t))}t.isSerializableObject=i;const s=function(e,t){const n=Object.entries(e).map((([e,n])=>[e,t(n)]));return Object.fromEntries(n)};t.serialize=function e(t){return t&&t.constructor&&"NativeImage"===t.constructor.name?function(e){const t=[],n=e.getScaleFactors();if(1===n.length){const r=n[0],o=e.getSize(r),i=e.toBitmap({scaleFactor:r});t.push({scaleFactor:r,size:o,buffer:i})}else for(const r of n){const n=e.getSize(r),o=e.toDataURL({scaleFactor:r});t.push({scaleFactor:r,size:n,dataURL:o})}return{__ELECTRON_SERIALIZED_NativeImage__:!0,representations:t}}(t):Array.isArray(t)?t.map(e):i(t)?t:t instanceof Object?s(t,e):t},t.deserialize=function e(t){return t&&t.__ELECTRON_SERIALIZED_NativeImage__?function(e){const t=r.nativeImage.createEmpty();if(1===e.representations.length){const{buffer:n,size:r,scaleFactor:o}=e.representations[0],{width:i,height:s}=r;t.addRepresentation({buffer:n,scaleFactor:o,width:i,height:s})}else for(const n of e.representations){const{dataURL:e,size:r,scaleFactor:o}=n,{width:i,height:s}=r;t.addRepresentation({dataURL:e,scaleFactor:o,width:i,height:s})}return t}(t):Array.isArray(t)?t.map(e):i(t)?t:t instanceof Object?s(t,e):t}},879:(e,t,n)=>{"use strict";t.enable=t.initialize=void 0;var r=n(186);Object.defineProperty(t,"initialize",{enumerable:!0,get:function(){return r.initialize}}),Object.defineProperty(t,"enable",{enumerable:!0,get:function(){return r.enable}})},869:(e,t)=>{"use strict";Object.defineProperty(t,"__esModule",{value:!0});const n=(e,t)=>`${e.id}-${t}`;t.default=new class{constructor(){this.nextId=0,this.storage={},this.owners={},this.electronIds=new WeakMap}add(e,t,r){const o=this.saveToStorage(r),i=n(e,t);let s=this.owners[i];return s||(s=this.owners[i]=new Map,this.registerDeleteListener(e,t)),s.has(o)||(s.set(o,0),this.storage[o].count++),s.set(o,s.get(o)+1),o}get(e){const t=this.storage[e];if(null!=t)return t.object}remove(e,t,r){const o=n(e,t),i=this.owners[o];if(i&&i.has(r)){const e=i.get(r)-1;e<=0?(i.delete(r),this.dereference(r)):i.set(r,e)}}clear(e,t){const r=n(e,t),o=this.owners[r];if(o){for(const e of o.keys())this.dereference(e);delete this.owners[r]}}saveToStorage(e){let t=this.electronIds.get(e);return t||(t=++this.nextId,this.storage[t]={count:0,object:e},this.electronIds.set(e,t)),t}dereference(e){const t=this.storage[e];null!=t&&(t.count-=1,0===t.count&&(this.electronIds.delete(t.object),delete this.storage[e]))}registerDeleteListener(e,t){const n=t.split("-")[0],r=(o,i)=>{i&&i.toString()===n&&(e.removeListener("render-view-deleted",r),this.clear(e,t))};e.on("render-view-deleted",r)}}},186:function(e,t,n){"use strict";var r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.initialize=t.enable=t.isRemoteModuleEnabled=void 0;const o=n(361),i=r(n(869)),s=n(897),a=n(298),c=n(222),{Promise:l}=global,u=c.getElectronBinding("v8_util"),d=(()=>{var e,t;const n=Number(null===(t=null===(e=process.versions.electron)||void 0===e?void 0:e.split("."))||void 0===t?void 0:t[0]);return Number.isNaN(n)||n<14})(),f=["length","name","arguments","caller","prototype"],m=new Map,p=new FinalizationRegistry((e=>{const t=e.id[0]+"~"+e.id[1],n=m.get(t);if(void 0!==n&&void 0===n.deref()&&(m.delete(t),!e.webContents.isDestroyed()))try{e.webContents.sendToFrame(e.frameId,"REMOTE_RENDERER_RELEASE_CALLBACK",e.id[0],e.id[1])}catch(e){console.warn(`sendToFrame() failed: ${e}`)}}));function h(e){const t=e[0]+"~"+e[1],n=m.get(t);if(void 0!==n){const e=n.deref();if(void 0!==e)return e}}const g=new WeakMap,w=function(e){let t=Object.getOwnPropertyNames(e);return"function"==typeof e&&(t=t.filter((e=>!f.includes(e)))),t.map((t=>{const n=Object.getOwnPropertyDescriptor(e,t);let r,o=!1;return void 0===n.get&&"function"==typeof e[t]?r="method":((n.set||n.writable)&&(o=!0),r="get"),{name:t,enumerable:n.enumerable,writable:o,type:r}}))},E=function(e){const t=Object.getPrototypeOf(e);return null===t||t===Object.prototype?null:{members:w(t),proto:E(t)}},b=function(e,t,n,r=!1){let o;switch(typeof n){case"object":o=n instanceof Buffer?"buffer":n&&n.constructor&&"NativeImage"===n.constructor.name?"nativeimage":Array.isArray(n)?"array":n instanceof Error?"error":s.isSerializableObject(n)?"value":s.isPromise(n)?"promise":Object.prototype.hasOwnProperty.call(n,"callee")&&null!=n.length?"array":r&&u.getHiddenValue(n,"simple")?"value":"object";break;case"function":o="function";break;default:o="value"}return"array"===o?{type:o,members:n.map((n=>b(e,t,n,r)))}:"nativeimage"===o?{type:o,value:s.serialize(n)}:"object"===o||"function"===o?{type:o,name:n.constructor?n.constructor.name:"",id:i.default.add(e,t,n),members:w(n),proto:E(n)}:"buffer"===o?{type:o,value:n}:"promise"===o?(n.then((function(){}),(function(){})),{type:o,then:b(e,t,(function(e,t){n.then(e,t)}))}):"error"===o?{type:o,value:n,members:Object.keys(n).map((r=>({name:r,value:b(e,t,n[r])})))}:{type:"value",value:n}},v=function(e){const t=new Error(e);throw t.code="EBADRPC",t.errno=-72,t},R=(e,t)=>{let n=`Attempting to call a function in a renderer window that has been closed or released.\nFunction provided here: ${g.get(t)}`;if(e instanceof o.EventEmitter){const r=e.eventNames().filter((n=>e.listeners(n).includes(t)));r.length>0&&(n+=`\nRemote event names: ${r.join(", ")}`,r.forEach((n=>{e.removeListener(n,t)})))}console.warn(n)},y=function(e,t,n,r){const o=function(r){switch(r.type){case"nativeimage":return s.deserialize(r.value);case"value":return r.value;case"remote-object":return i.default.get(r.id);case"array":return y(e,t,n,r.value);case"buffer":return Buffer.from(r.value.buffer,r.value.byteOffset,r.value.byteLength);case"promise":return l.resolve({then:o(r.then)});case"object":{const e="Object"!==r.name?Object.create({constructor:(a=r.name,new Proxy(Object,{get:(e,t,n)=>"name"===t?a:Reflect.get(e,t,n)}))}):{};for(const{name:t,value:n}of r.members)e[t]=o(n);return e}case"function-with-return-value":{const e=o(r.value);return function(){return e}}case"function":{const o=[n,r.id],i=h(o);if(void 0!==i)return i;const s=function(...o){let i=!1;if(!e.isDestroyed())try{i=!1!==e.sendToFrame(t,"REMOTE_RENDERER_CALLBACK",n,r.id,b(e,n,o))}catch(e){console.warn(`sendToFrame() failed: ${e}`)}i||R(this,s)};return g.set(s,r.location),Object.defineProperty(s,"length",{value:r.length}),function(e,t,n,r){const o=new WeakRef(r),i=e[0]+"~"+e[1];m.set(i,o),p.register(r,{id:e,webContents:t,frameId:n})}(o,e,t,s),s}default:throw new TypeError(`Unknown type: ${r.type}`)}var a};return r.map(o)},_=new WeakMap;t.isRemoteModuleEnabled=function(e){return d&&!_.has(e)&&_.set(e,function(e){const t=e.getLastWebPreferences()||{};return null!=t.enableRemoteModule&&!!t.enableRemoteModule}(e)),_.get(e)},t.enable=function(e){_.set(e,!0)};const O=function(e,n){a.ipcMain.on(e,((e,r,...o)=>{let i;if(t.isRemoteModuleEnabled(e.sender)){try{i=n(e,r,...o)}catch(t){i={type:"exception",value:b(e.sender,r,t)}}void 0!==i&&(e.returnValue=i)}else e.returnValue={type:"exception",value:b(e.sender,r,new Error('@electron/remote is disabled for this WebContents. Call require("@electron/remote/main").enable(webContents) to enable it.'))}}))},T=function(e,t,...n){const r={sender:e,returnValue:void 0,defaultPrevented:!1};return a.app.emit(t,r,e,...n),e.emit(t,r,...n),r},C=function(e,t,n){n&&console.warn(`WebContents (${e.id}): ${t}`,n)};let j=!1;t.initialize=function(){if(j)throw new Error("@electron/remote has already been initialized");j=!0,O("REMOTE_BROWSER_WRONG_CONTEXT_ERROR",(function(e,t,n,r){const o=h([n,r]);void 0!==o&&R(e.sender,o)})),O("REMOTE_BROWSER_REQUIRE",(function(e,t,n,r){C(e.sender,`remote.require('${n}')`,r);const o=T(e.sender,"remote-require",n);if(void 0===o.returnValue){if(o.defaultPrevented)throw new Error(`Blocked remote.require('${n}')`);o.returnValue=process.mainModule.require(n)}return b(e.sender,t,o.returnValue)})),O("REMOTE_BROWSER_GET_BUILTIN",(function(e,t,r,o){C(e.sender,`remote.getBuiltin('${r}')`,o);const i=T(e.sender,"remote-get-builtin",r);if(void 0===i.returnValue){if(i.defaultPrevented)throw new Error(`Blocked remote.getBuiltin('${r}')`);i.returnValue=n(298)[r]}return b(e.sender,t,i.returnValue)})),O("REMOTE_BROWSER_GET_GLOBAL",(function(e,t,n,r){C(e.sender,`remote.getGlobal('${n}')`,r);const o=T(e.sender,"remote-get-global",n);if(void 0===o.returnValue){if(o.defaultPrevented)throw new Error(`Blocked remote.getGlobal('${n}')`);o.returnValue=global[n]}return b(e.sender,t,o.returnValue)})),O("REMOTE_BROWSER_GET_CURRENT_WINDOW",(function(e,t,n){C(e.sender,"remote.getCurrentWindow()",n);const r=T(e.sender,"remote-get-current-window");if(void 0===r.returnValue){if(r.defaultPrevented)throw new Error("Blocked remote.getCurrentWindow()");r.returnValue=e.sender.getOwnerBrowserWindow()}return b(e.sender,t,r.returnValue)})),O("REMOTE_BROWSER_GET_CURRENT_WEB_CONTENTS",(function(e,t,n){C(e.sender,"remote.getCurrentWebContents()",n);const r=T(e.sender,"remote-get-current-web-contents");if(void 0===r.returnValue){if(r.defaultPrevented)throw new Error("Blocked remote.getCurrentWebContents()");r.returnValue=e.sender}return b(e.sender,t,r.returnValue)})),O("REMOTE_BROWSER_CONSTRUCTOR",(function(e,t,n,r){r=y(e.sender,e.frameId,t,r);const o=i.default.get(n);return null==o&&v(`Cannot call constructor on missing remote object ${n}`),b(e.sender,t,new o(...r))})),O("REMOTE_BROWSER_FUNCTION_CALL",(function(e,t,n,r){r=y(e.sender,e.frameId,t,r);const o=i.default.get(n);null==o&&v(`Cannot call function on missing remote object ${n}`);try{return b(e.sender,t,o(...r),!0)}catch(e){const t=new Error(`Could not call remote function '${o.name||"anonymous"}'. Check that the function signature is correct. Underlying error: ${e}\n`+(e instanceof Error?`Underlying stack: ${e.stack}\n`:""));throw t.cause=e,t}})),O("REMOTE_BROWSER_MEMBER_CONSTRUCTOR",(function(e,t,n,r,o){o=y(e.sender,e.frameId,t,o);const s=i.default.get(n);return null==s&&v(`Cannot call constructor '${r}' on missing remote object ${n}`),b(e.sender,t,new s[r](...o))})),O("REMOTE_BROWSER_MEMBER_CALL",(function(e,t,n,r,o){o=y(e.sender,e.frameId,t,o);const s=i.default.get(n);null==s&&v(`Cannot call method '${r}' on missing remote object ${n}`);try{return b(e.sender,t,s[r](...o),!0)}catch(e){const t=new Error(`Could not call remote method '${r}'. Check that the method signature is correct. Underlying error: ${e}`+(e instanceof Error?`Underlying stack: ${e.stack}\n`:""));throw t.cause=e,t}})),O("REMOTE_BROWSER_MEMBER_SET",(function(e,t,n,r,o){o=y(e.sender,e.frameId,t,o);const s=i.default.get(n);return null==s&&v(`Cannot set property '${r}' on missing remote object ${n}`),s[r]=o[0],null})),O("REMOTE_BROWSER_MEMBER_GET",(function(e,t,n,r){const o=i.default.get(n);return null==o&&v(`Cannot get property '${r}' on missing remote object ${n}`),b(e.sender,t,o[r])})),O("REMOTE_BROWSER_DEREFERENCE",(function(e,t,n){i.default.remove(e.sender,t,n)})),O("REMOTE_BROWSER_CONTEXT_RELEASE",((e,t)=>(i.default.clear(e.sender,t),null)))}},539:(e,t,n)=>{e.exports=n(879)},147:e=>{e.exports={version:[1,0,0],devServer:{host:"127.0.0.1",port:5501}}},298:e=>{"use strict";e.exports=require("electron")},361:e=>{"use strict";e.exports=require("events")},17:e=>{"use strict";e.exports=require("path")},282:e=>{"use strict";e.exports=require("process")},310:e=>{"use strict";e.exports=require("url")}},t={};function n(r){var o=t[r];if(void 0!==o)return o.exports;var i=t[r]={exports:{}};return e[r].call(i.exports,i,i.exports,n),i.exports}n.n=e=>{var t=e&&e.__esModule?()=>e.default:()=>e;return n.d(t,{a:t}),t},n.d=(e,t)=>{for(var r in t)n.o(t,r)&&!n.o(e,r)&&Object.defineProperty(e,r,{enumerable:!0,get:t[r]})},n.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),n.r=e=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})};var r={};(()=>{"use strict";n.r(r);var e=n(298);const t=new class{register(t="Command+Control+Alt+F4"){e.globalShortcut.register(t,(function(){let t=e.BrowserWindow.getAllWindows();for(let e=0;e<t.length;e++){let n=t[e];n.webContents&&!n.webContents.isDevToolsOpened()&&n.webContents.openDevTools({mode:"detach"})}}))}};var o=n(539);const i=n(282),s=n(310),a=n(17),c=n(361),{devServer:l}=n(147),u="development"===i.env.NODE_ENV;class d extends c{constructor(e){super(),this.partition=e?.partition||"",this.wwwroot=e?.wwwroot||__dirname,this.preloadJsPath=a.join(this.wwwroot,"preload.js"),this.window=this.createWindow(),this.addEventListenerToWin(),this.addDevToolToWebcontent()}createWindow(){const t={title:"EA-Tools",width:1240,height:720,minWidth:1240,minHeight:720,show:!1,webPreferences:{devTools:!0,webSecurity:!1,nodeIntegrationInWorker:!0,partition:this.partition,webviewTag:!0,safeDialogs:!0,safeDialogsMessage:"是否继续显示弹窗提示？",nodeIntegrationInSubFrames:!0,allowRunningInsecureContent:!0,preload:this.preloadJsPath,nodeIntegration:!0,contextIsolation:!1}},n=new e.BrowserWindow(t);return n.loadURL(this.getPageUrl()),o.enable(n.webContents),n.webContents.session.setCertificateVerifyProc(((e,t)=>{t(0)})),n.once("ready-to-show",(()=>{n.show()})),n}getPageUrl(){const e=s.pathToFileURL(a.join(this.wwwroot,"index.html")).href,{host:t,port:n}=l;return u?encodeURI(`http://${t}:${n}/index.html`):e}addEventListenerToWin(){this.window.on("closed",(()=>{}))}addDevToolToWebcontent(){const e=this.window.webContents.debugger;try{e.isAttached()&&e.detach(),e.attach("1.1"),e.sendCommand("Network.enable")}catch(e){console.log("无法启动调试",e)}}getUrlHost(e){return s.parse(e).hostname}}class f extends d{constructor(e){super(e)}}var m=n(17),p=n.n(m);o.initialize(),function(){if(!e.app.requestSingleInstanceLock())return e.app.quit();e.app.on("second-instance",(()=>{e.BrowserWindow.getAllWindows().forEach((e=>{e&&!e.isDestroyed()&&(e.isMinimized()&&e.restore(),e.focus())}))}))}(),e.app.disableHardwareAcceleration(),Object.assign(global,{wwwroot:__dirname,cookie:{}}),e.app.whenReady().then((()=>{(function(){const t=new e.Tray(function(e){const t=process.resourcesPath;return e?p().join(t,e):t}("tray/icon.png"));e.Menu.buildFromTemplate([{label:"Item1",type:"radio"},{label:"Item1",type:"radio",click:(e,t)=>{console.log(e),console.log(t)}}]),t.setTitle("This is my application."),t.on("click",(()=>{e.app.isHidden()?e.app.show():e.app.hide()})),t.setToolTip("This is my application.")})(),e.nativeTheme.themeSource="dark",t.register("Command+Control+Alt+F5"),new f})),e.app.on("window-all-closed",(function(){setTimeout((()=>{0===e.BrowserWindow.getAllWindows().length&&e.app.exit(1)}),500)})),e.app.on("will-quit",(function(){e.globalShortcut.unregisterAll()}))})(),module.exports=r})();