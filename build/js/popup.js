function debug(b){chrome.extension.sendMessage({msg:b})}function test(){debug("clicked")}
function togglePopups(){document.getElementById("popup").classList.contains("off")?(chrome.contentSettings.popups.set({primaryPattern:"<all_urls>",setting:"block"}),document.getElementById("popup").classList.toggle("off"),document.getElementById("popup-text").innerHTML="Popup Blocker On"):(chrome.contentSettings.popups.set({primaryPattern:"<all_urls>",setting:"allow"}),document.getElementById("popup").classList.toggle("off"),document.getElementById("popup-text").innerHTML="Popup Blocker Off")}
function toggleCookies(){document.getElementById("cookies").classList.contains("off")?(chrome.contentSettings.cookies.set({primaryPattern:"<all_urls>",setting:"allow"}),document.getElementById("cookies").classList.toggle("off"),document.getElementById("cookies-text").innerHTML="Cookies Enabled"):(chrome.contentSettings.cookies.set({primaryPattern:"<all_urls>",setting:"block"}),document.getElementById("cookies").classList.toggle("off"),document.getElementById("cookies-text").innerHTML="Cookies Disabled")}
function toggleDNT(){document.getElementById("dnt").classList.contains("off")?chrome.privacy.websites.referrersEnabled.get({},function(b){chrome.privacy.websites.referrersEnabled.set({value:!0},function(){void 0===chrome.runtime.lastError?document.getElementById("dnt").classList.remove("off"):document.getElementById("dnt-text").innerHTML="Error"})}):chrome.privacy.websites.referrersEnabled.get({},function(b){chrome.privacy.websites.referrersEnabled.set({value:!1},function(){void 0===chrome.runtime.lastError?
document.getElementById("dnt").classList.add("off"):document.getElementById("dnt-text").innerHTML="Error"})})}
function togglePrefetch(){document.getElementById("prefetch").classList.contains("off")?chrome.privacy.network.networkPredictionEnabled.get({},function(b){chrome.privacy.network.networkPredictionEnabled.set({value:!0},function(){void 0===chrome.runtime.lastError?document.getElementById("prefetch").classList.remove("off"):document.getElementById("prefetch-text").innerHTML="Error"})}):chrome.privacy.network.networkPredictionEnabled.get({},function(b){chrome.privacy.network.networkPredictionEnabled.set({value:!1},
function(){void 0===chrome.runtime.lastError?document.getElementById("prefetch").classList.add("off"):document.getElementById("prefetch-text").innerHTML="Error"})})}
function toggleAutofill(){document.getElementById("autofill").classList.contains("off")?chrome.privacy.services.autofillEnabled.get({},function(b){chrome.privacy.services.autofillEnabled.set({value:!0},function(){void 0===chrome.runtime.lastError?document.getElementById("autofill").classList.remove("off"):document.getElementById("autofill-text").innerHTML="Error"})}):chrome.privacy.services.autofillEnabled.get({},function(b){chrome.privacy.services.autofillEnabled.set({value:!1},function(){void 0===
chrome.runtime.lastError?document.getElementById("autofill").classList.add("off"):document.getElementById("autofill-text").innerHTML="Error"})})}
function toggleSearchSuggest(){document.getElementById("searchsuggest").classList.contains("off")?chrome.privacy.services.searchSuggestEnabled.get({},function(b){chrome.privacy.services.searchSuggestEnabled.set({value:!0},function(){void 0===chrome.runtime.lastError?document.getElementById("searchsuggest").classList.remove("off"):document.getElementById("searchsuggest-text").innerHTML="Error"})}):chrome.privacy.services.searchSuggestEnabled.get({},function(b){chrome.privacy.services.searchSuggestEnabled.set({value:!1},
function(){void 0===chrome.runtime.lastError?document.getElementById("searchsuggest").classList.add("off"):document.getElementById("searchsuggest-text").innerHTML="Error"})})}
function clearHistory(){if(confirm("Clear History?")){var b=JSON.parse(localStorage.getItem("historyWL"));chrome.history.search({text:""},function(d){for(var f=0;f<d.length;f++){var e=d[f].url,g=e.search("://");0<=g&&(e=e.substring(g+3));for(var g=e.search("/"),e=e.substring(0,g),g=!0,h=0;h<b.length;h++)if(b[h]==e){g=!1;break}g&&chrome.history.deleteURL(d[f].url)}})}}
function clearCookies(){if(confirm("Clear Cookies?")){var b=JSON.parse(localStorage.getItem("cookiesWL"));chrome.cookies.getAll({},function(d){for(var f=0;f<d.length;f++){for(var e=!0,g=0;g<b.length;g++)b[g]==d[f].domain&&(e=!1);e&&chrome.cookies.remove({url:"http"+(a.secure?"s":"")+"://"+a.domain+a.path,name:a.name,storeId:a.storeId})}});localStorage.setItem("cookiesFlag",0);document.getElementById("clrcookies").innerHTML='<div class="icon"></div><span> Cleared </span>'}}
function saveTab(){chrome.tabs.query({active:!0,currentWindow:!0},function(b){b=b[0];var d=[b.windowId,b.index,b.url,b.active,b.pinned],f=JSON.parse(localStorage.getItem("tabStack"));f[f.length]=d;localStorage.setItem("tabStack",JSON.stringify(f));chrome.tabs.remove(b.id,function(){});document.getElementById("restoreTab").classList.remove("hide")})}
function restoreTab(){curr=JSON.parse(localStorage.getItem("tabStack"));0<curr.length&&(c=curr.pop(),0===curr.length&&document.getElementById("restoreTab").classList.add("hide"),chrome.windows.get(c[0],{},function(b){void 0===b||b.id==chrome.windows.WINDOW_ID_NONE?chrome.windows.create({url:c[2]},function(b){for(var f=0;f<curr.length;f++)curr[f][0]==c[0]&&(curr[f][0]=b.id);localStorage.setItem("tabStack",JSON.stringify(curr))}):(chrome.tabs.create({windowId:c[0],index:c[1],url:c[2],active:c[3],pinned:c[4]},
function(){}),localStorage.setItem("tabStack",JSON.stringify(curr)))}))}function saveSession(){chrome.tabs.query({currentWindow:!0},function(b){for(var d=JSON.parse(localStorage.getItem("sessionStack")),f=[],e=0;e<b.length;e++){var g=b[e];f[f.length]=[g.windowId,g.index,g.url,g.active,g.pinned];chrome.tabs.remove(g.id)}d[d.length]=f;localStorage.setItem("sessionStack",JSON.stringify(d));document.getElementById("restoreSession").classList.remove("hide")})}
function restoreSession(){curr=JSON.parse(localStorage.getItem("sessionStack"));0<curr.length&&(c=curr.pop(),0===curr.length&&document.getElementById("restoreSession").classList.add("hide"),localStorage.setItem("sessionStack",JSON.stringify(curr)),chrome.windows.create({},function(b){chrome.tabs.query({windowId:b.id},function(d){d=d[0];for(var f=0;f<c.length;f++)chrome.tabs.create({windowId:b.id,index:c[f][1],url:c[f][2],active:c[f][3],pinned:c[f][4]}),chrome.tabs.remove(d.id)})}))}
function restoreCrash(){}function autoHD(){var b=document.getElementById("autoHD");b.classList.contains("off")?(localStorage.setItem("hd","on"),document.getElementById("autoHD-text").innerHTML="AutoHD On"):(localStorage.setItem("hd","off"),document.getElementById("autoHD-text").innerHTML="AutoHD Off");b.classList.toggle("off")}
function changeAutoHD(b){b.stopPropagation();b=document.getElementById("autoHD-setting");"Default"==b.innerHTML?(b.innerHTML="720p",localStorage.setItem("ytQuality","hd720")):"720p"==b.innerHTML?(b.innerHTML="1080p",localStorage.setItem("ytQuality","hd1080")):"1080p"==b.innerHTML?(b.innerHTML="Maximum",localStorage.setItem("ytQuality","highres")):"Maximum"==b.innerHTML&&(b.innerHTML="Default",localStorage.setItem("ytQuality","default"))}
function addCookie(b){var d=JSON.parse(localStorage.getItem("cookiesWL"));b.stopPropagation();chrome.tabs.query({active:!0,currentWindow:!0},function(b){b=b[0].url;var e=b.search("://");0<=e&&(b=b.substring(e+3));e=b.search("/");b=b.substring(0,e);for(var e=!1,g=0;g<d.length;g++)d[g]==b&&(e=!0);e||(d[d.length]=b,localStorage.setItem("cookiesWL",JSON.stringify(d)))})}
function addHistory(b){var d=JSON.parse(localStorage.getItem("historyWL"));b.stopPropagation();chrome.tabs.query({active:!0,currentWindow:!0},function(b){b=b[0].url;var e=b.search("://");0<=e&&(b=b.substring(e+3));e=b.search("/");b=b.substring(0,e);for(var e=!1,g=0;g<d.length;g++)d[g]==b&&(e=!0);e||(d[d.length]=b,localStorage.setItem("historyWL",JSON.stringify(d)))})}function options(){chrome.tabs.create({url:"options.html"},function(){})}
function init(){chrome.tabs.query({active:!0,currentWindow:!0},function(b){b=b[0];incognito=b.incognito;url=b.url;chrome.contentSettings.popups.get({primaryUrl:"https://www.google.com/*",incognito:incognito},function(b){"allow"==b.setting?(document.getElementById("popup").classList.add("off"),document.getElementById("popup-text").innerHTML="Popup Blocker Off"):(document.getElementById("popup").classList.remove("off"),document.getElementById("popup-text").innerHTML="Popup Blocker On")});chrome.contentSettings.cookies.get({primaryUrl:"https://www.google.com/*",
incognito:incognito},function(b){"block"==b.setting?(document.getElementById("cookies").classList.add("off"),document.getElementById("cookies-text").innerHTML="Cookies Disabled"):(document.getElementById("cookies").classList.remove("off"),document.getElementById("cookies-text").innerHTML="Cookies Enabled")})});var b=localStorage.getItem("hd");null===b&&(b="on",localStorage.setItem("hd",b));"off"==b?(document.getElementById("autoHD").classList.add("off"),document.getElementById("autoHD-text").innerHTML=
"AutoHD Off"):(document.getElementById("autoHD").classList.remove("off"),document.getElementById("autoHD-text").innerHTML="AutoHD On");b=localStorage.getItem("ytQuality");null===b&&(b="highres",localStorage.setItem("ytQuality","highres"));var d=document.getElementById("autoHD-setting");"default"==b?d.innerHTML="Default":"hd720"==b?d.innerHTML="720p":"hd1080"==b?d.innerHTML="1080p":"highres"==b&&(d.innerHTML="Maximum");b=localStorage.getItem("cookiesFlag");null===b&&(b="1",localStorage.setItem("cookiesFlag",
b));"1"==b?(document.getElementById("clrcookies").classList.add("off"),document.getElementById("clrcookies-text").innerHTML="Clear Cookies"):(document.getElementById("clrcookies").classList.remove("off"),document.getElementById("clrcookies-text").innerHTML="Cookies Cleared");b=localStorage.getItem("historyFlag");null===b&&(b="1",localStorage.setItem("historyFlag",b));"1"==b?(document.getElementById("clrhistory").classList.add("off"),document.getElementById("clrhistory-text").innerHTML="Clear History"):
(document.getElementById("clrhistory").classList.remove("off"),document.getElementById("clrhistory-text").innerHTML="History Cleared");chrome.privacy.websites.referrersEnabled.get({},function(b){b.value?document.getElementById("dnt").classList.remove("off"):document.getElementById("dnt").classList.add("off")});chrome.privacy.network.networkPredictionEnabled.get({},function(b){b.value?document.getElementById("prefetch").classList.remove("off"):document.getElementById("prefetch").classList.add("off")});
chrome.privacy.services.autofillEnabled.get({},function(b){b.value?document.getElementById("autofill").classList.remove("off"):document.getElementById("autofill").classList.add("off")});chrome.privacy.services.searchSuggestEnabled.get({},function(b){b.value?document.getElementById("searchsuggest").classList.remove("off"):document.getElementById("searchsuggest").classList.add("off")});0===JSON.parse(localStorage.getItem("tabStack")).length?document.getElementById("restoreTab").classList.add("hide"):
document.getElementById("restoreTab").classList.remove("hide");0===JSON.parse(localStorage.getItem("sessionStack")).length?document.getElementById("restoreSession").classList.add("hide"):document.getElementById("restoreSession").classList.remove("hide");document.getElementById("restoreCrash").classList.add("hide");document.getElementById("popup").addEventListener("click",togglePopups);document.getElementById("cookies").addEventListener("click",toggleCookies);document.getElementById("dnt").addEventListener("click",
toggleDNT);document.getElementById("prefetch").addEventListener("click",togglePrefetch);document.getElementById("autofill").addEventListener("click",toggleAutofill);document.getElementById("searchsuggest").addEventListener("click",toggleSearchSuggest);document.getElementById("clrcookies").addEventListener("click",clearCookies);document.getElementById("clrcookies-add").addEventListener("click",addCookie);document.getElementById("clrhistory").addEventListener("click",clearHistory);document.getElementById("clrhistory-add").addEventListener("click",
addHistory);document.getElementById("saveTab").addEventListener("click",saveTab);document.getElementById("restoreTab").addEventListener("click",restoreTab);document.getElementById("saveSession").addEventListener("click",saveSession);document.getElementById("restoreSession").addEventListener("click",restoreSession);document.getElementById("restoreCrash").addEventListener("click",restoreCrash);document.getElementById("autoHD").addEventListener("click",autoHD);document.getElementById("autoHD-setting").addEventListener("click",
changeAutoHD);document.getElementById("options").addEventListener("click",options)}window.addEventListener("DOMContentLoaded",init,!1);