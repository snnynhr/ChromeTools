var s = localStorage.getItem("tabStack");
if(s == null)
{
    localStorage.setItem("tabStack",JSON.stringify([]));
}
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