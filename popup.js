function toggle()
{
	if(document.getElementById("enabled").classList.contains("off"))
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("enabled").classList.toggle("off");
	}
	else
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("enabled").classList.toggle("off");
	}
}
function clearCookies()
{
	document.getElementById("clickhide").innerHTML = '<progress id = "pbar" value="0" max="100"></progress>';
	var i;
	for(i=1; i<=100; i++)
	{
		document.getElementById("pbar").value = i + "";
	}
	document.getElementById("clickhide").innerHTML = '<div class="icon"></div><span> Clear Cookies</span>';
}
function init()
{
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var current = tabs[0];
	    incognito = current.incognito;
	    url = current.url;
      	chrome.contentSettings.popups.get({
            'primaryUrl': url,
            'incognito': incognito
          },
          function(details) {
            if(details.setting=="allow")
            {
 				document.getElementById("enabled").classList.add("off");           	
            }
            else
            {
            	if(document.getElementById("enabled").classList.contains("off"))
            		document.getElementById("enabled").classList.toggle("off");
            }
          });});
	document.getElementById("enabled").addEventListener("click",toggle);
	document.getElementById("clickhide").addEventListener('click',clearCookies);
	document.getElementById("options").addEventListener("click", function()
	{
		openOptions();
	}, false);
}
window.addEventListener("DOMContentLoaded", init, false);