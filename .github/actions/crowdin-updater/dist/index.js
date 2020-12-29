module.exports=function(e,t){"use strict";var n={};function __webpack_require__(t){if(n[t]){return n[t].exports}var r=n[t]={i:t,l:false,exports:{}};e[t].call(r.exports,r,r.exports,__webpack_require__);r.l=true;return r.exports}__webpack_require__.ab=__dirname+"/";function startup(){return __webpack_require__(104)}return startup()}({82:function(e,t){"use strict";Object.defineProperty(t,"__esModule",{value:true});function toCommandValue(e){if(e===null||e===undefined){return""}else if(typeof e==="string"||e instanceof String){return e}return JSON.stringify(e)}t.toCommandValue=toCommandValue},87:function(e){e.exports=require("os")},102:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(747));const s=r(n(87));const i=n(82);function issueCommand(e,t){const n=process.env[`GITHUB_${e}`];if(!n){throw new Error(`Unable to find environment variable for file command ${e}`)}if(!o.existsSync(n)){throw new Error(`Missing file at path: ${n}`)}o.appendFileSync(n,`${i.toCommandValue(t)}${s.EOL}`,{encoding:"utf8"})}t.issueCommand=issueCommand},104:function(e,t,n){const r=n(470);const{getOutputFromCommand:o,defineFileChanges:s}=n(396);const i="curriculum/challenges/english";const u=async()=>{let e=[];try{const t=r.getInput("commit-sha");r.info(`commit # pushed: ${t}`);const n=`git diff --name-status -m -M -C ${t}^..${t} -- ${i}`;const u=await o(n);console.log(`diff\n${u}`);const a=u&&u.trim().split("\n");if(a&&a.length){e=await s(a,t)}r.info("action complete")}catch(e){r.setFailed(e.message)}console.log(JSON.stringify(e,null,2));return null};u()},129:function(e){e.exports=require("child_process")},396:function(e,t,n){const r=n(669);const o=r.promisify(n(129).exec);const s=async e=>{try{const{stdout:t}=await o(e);return t}catch(t){console.log("command error");console.log(e+"\n");console.log(t.stderr);return null}};const i=async(e,t)=>{const n=/^curriculum\/challenges\/english\/(?!.+part-\d\d\d\.md$)(?!\d\d-certificates).*/i;const r=[];for(file of e){let e,n;let[o,i,u]=file.split(/\s+/);o=o[0];switch(o){case"A":case"M":n=i;break;case"D":e=i;break;case"R":e=i;n=u;break;case"C":n=u;break}let a={};if(e){a={...a,deleteFile:e}}if(n){let e=`git show -C100% -M100% -m ${t}:${n}`;const r=await s(e);a={...a,updateFile:n,content:r}}r.push(a)}return r.filter(({updateFile:e,deleteFile:t})=>{if(e&&e.match(n)){return true}if(t&&t.match(n)){return true}return false})};e.exports={getOutputFromCommand:s,defineFileChanges:i}},431:function(e,t,n){"use strict";var r=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const o=r(n(87));const s=n(82);function issueCommand(e,t,n){const r=new Command(e,t,n);process.stdout.write(r.toString()+o.EOL)}t.issueCommand=issueCommand;function issue(e,t=""){issueCommand(e,{},t)}t.issue=issue;const i="::";class Command{constructor(e,t,n){if(!e){e="missing.command"}this.command=e;this.properties=t;this.message=n}toString(){let e=i+this.command;if(this.properties&&Object.keys(this.properties).length>0){e+=" ";let t=true;for(const n in this.properties){if(this.properties.hasOwnProperty(n)){const r=this.properties[n];if(r){if(t){t=false}else{e+=","}e+=`${n}=${escapeProperty(r)}`}}}}e+=`${i}${escapeData(this.message)}`;return e}}function escapeData(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A")}function escapeProperty(e){return s.toCommandValue(e).replace(/%/g,"%25").replace(/\r/g,"%0D").replace(/\n/g,"%0A").replace(/:/g,"%3A").replace(/,/g,"%2C")}},470:function(e,t,n){"use strict";var r=this&&this.__awaiter||function(e,t,n,r){function adopt(e){return e instanceof n?e:new n(function(t){t(e)})}return new(n||(n=Promise))(function(n,o){function fulfilled(e){try{step(r.next(e))}catch(e){o(e)}}function rejected(e){try{step(r["throw"](e))}catch(e){o(e)}}function step(e){e.done?n(e.value):adopt(e.value).then(fulfilled,rejected)}step((r=r.apply(e,t||[])).next())})};var o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(e!=null)for(var n in e)if(Object.hasOwnProperty.call(e,n))t[n]=e[n];t["default"]=e;return t};Object.defineProperty(t,"__esModule",{value:true});const s=n(431);const i=n(102);const u=n(82);const a=o(n(87));const c=o(n(622));var l;(function(e){e[e["Success"]=0]="Success";e[e["Failure"]=1]="Failure"})(l=t.ExitCode||(t.ExitCode={}));function exportVariable(e,t){const n=u.toCommandValue(t);process.env[e]=n;const r=process.env["GITHUB_ENV"]||"";if(r){const t="_GitHubActionsFileCommandDelimeter_";const r=`${e}<<${t}${a.EOL}${n}${a.EOL}${t}`;i.issueCommand("ENV",r)}else{s.issueCommand("set-env",{name:e},n)}}t.exportVariable=exportVariable;function setSecret(e){s.issueCommand("add-mask",{},e)}t.setSecret=setSecret;function addPath(e){const t=process.env["GITHUB_PATH"]||"";if(t){i.issueCommand("PATH",e)}else{s.issueCommand("add-path",{},e)}process.env["PATH"]=`${e}${c.delimiter}${process.env["PATH"]}`}t.addPath=addPath;function getInput(e,t){const n=process.env[`INPUT_${e.replace(/ /g,"_").toUpperCase()}`]||"";if(t&&t.required&&!n){throw new Error(`Input required and not supplied: ${e}`)}return n.trim()}t.getInput=getInput;function setOutput(e,t){s.issueCommand("set-output",{name:e},t)}t.setOutput=setOutput;function setCommandEcho(e){s.issue("echo",e?"on":"off")}t.setCommandEcho=setCommandEcho;function setFailed(e){process.exitCode=l.Failure;error(e)}t.setFailed=setFailed;function isDebug(){return process.env["RUNNER_DEBUG"]==="1"}t.isDebug=isDebug;function debug(e){s.issueCommand("debug",{},e)}t.debug=debug;function error(e){s.issue("error",e instanceof Error?e.toString():e)}t.error=error;function warning(e){s.issue("warning",e instanceof Error?e.toString():e)}t.warning=warning;function info(e){process.stdout.write(e+a.EOL)}t.info=info;function startGroup(e){s.issue("group",e)}t.startGroup=startGroup;function endGroup(){s.issue("endgroup")}t.endGroup=endGroup;function group(e,t){return r(this,void 0,void 0,function*(){startGroup(e);let n;try{n=yield t()}finally{endGroup()}return n})}t.group=group;function saveState(e,t){s.issueCommand("save-state",{name:e},t)}t.saveState=saveState;function getState(e){return process.env[`STATE_${e}`]||""}t.getState=getState},622:function(e){e.exports=require("path")},669:function(e){e.exports=require("util")},747:function(e){e.exports=require("fs")}});