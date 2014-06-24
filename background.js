/* Init localStorage */
var s = localStorage.getItem("tabStack");
if(s == null)
{
    localStorage.setItem("tabStack",JSON.stringify([]));
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
    	sendResponse({ytQuality: "hd720", ytSize: "0", enabled: en});
    }
    else
    	console.log(request.msg);
  });