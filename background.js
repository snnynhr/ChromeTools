/* Init localStorage */
var s = localStorage.getItem("tabStack");
if(s == null)
{
    localStorage.setItem("tabStack",JSON.stringify([]));
}
var ss = localStorage.getItem("sessionStack");
if(ss == null)
{
    localStorage.setItem("sessionStack",JSON.stringify([]));
}
var c = localStorage.getItem("cookiesFlag");
if(c == null)
{
    localStorage.setItem("cookiesFlag",1);
}
var h = localStorage.getItem("historyFlag");
if(h == null)
{
    localStorage.setItem("historyFlag",1);
}
var hd = localStorage.getItem("hd");
if(hd == null)
{
    localStorage.setItem("hd","on");
}
var ytSize = localStorage.getItem("ytSize");
if(ytSize == null)
{
    localStorage.setItem("ytSize","1");
}
var ytQuality = localStorage.getItem("ytQuality");
if(ytQuality == null)
{
    localStorage.setItem("ytQuality","highres");
}

chrome.tabs.query({}, function(tabs)
{
    var session = [];
    for(var i=0; i<tabs.length; i++)
    {
        var c = tabs[i];
        var data = [
            c.id,
            c.windowId,
            c.index,
            c.url,
            c.active,
            c.pinned];
        session[session.length] = data;
    }
    localStorage.setItem("chromeSession",JSON.stringify(session));
});

chrome.tabs.onCreated.addListener(function(tab){
    curr = JSON.parse(localStorage.getItem("chromeSession"));
    var data = [
        tab.id,
        tab.windowId,
        tab.index,
        tab.url,
        tab.active,
        tab.pinned];
    curr[curr.length] = data;
    console.log(curr);
    localStorage.setItem("chromeSession",JSON.stringify(curr));
});

chrome.tabs.onRemoved.addListener(function(tabId,removeInfo){
    curr = JSON.parse(localStorage.getItem("chromeSession"));
    for(var i=0; i<curr.length; i++)
        if(curr[i][0]==tabId)
        {
            curr.splice(i,1);
            break;
        }
    console.log(curr);
    localStorage.setItem("chromeSession",JSON.stringify(curr));
});

chrome.tabs.onUpdated.addListener(function(tabId,info,tab)
{
    if(info.url != undefined)
    {
        console.log(tabId + " " + info.url);
        curr = JSON.parse(localStorage.getItem("chromeSession"));
        for(var i=0; i<curr.length; i++)
            if(curr[i][0]==tabId)
            {
                curr[i][3]=info.url;
                break;
            }
        localStorage.setItem("chromeSession",JSON.stringify(curr));
    }  
});

/* Cookies listener */
chrome.cookies.onChanged.addListener(function (changeInfo)
{
    if(changeInfo.cause == "explicit")
        localStorage.setItem("cookiesFlag",1);
});

chrome.history.onVisited.addListener(function (item)
{
    localStorage.setItem("historyFlag",1);
});

chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    if(request.msg == "getSettings")
    {
    	var en = localStorage.getItem("hd") == "on" ? "1" : "0";
        var ytSize = localStorage.getItem("ytSize");
        var ytQuality = localStorage.getItem("ytQuality"); 
    	sendResponse({ytQuality: ytQuality, ytSize: ytSize, enabled: en});
    }
    else
    	console.log(request.msg);
  });