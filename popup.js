function togglePopups()
{
	if(document.getElementById("popup").classList.contains("off"))
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("popup").classList.toggle("off");
	}
	else
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("popup").classList.toggle("off");
	}
}
function toggleCookies()
{
	if(document.getElementById("cookies").classList.contains("off"))
	{
		chrome.contentSettings['cookies'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("cookies").classList.toggle("off");
		document.getElementById("cookies-text").innerHTML = "Cookies Enabled";
	}
	else
	{
		chrome.contentSettings['cookies'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("cookies").classList.toggle("off");
		document.getElementById("cookies-text").innerHTML = "Cookies Disabled";
	}
}
function clearCookies()
{
	document.getElementById("clrcookies").innerHTML = '<progress id = "pbar" value="0" max="100"></progress>';
	var i;

	chrome.cookies.getAll({}, function(arr) {
			var len = arr.length;
			var i = 0;
			arr.forEach(function(a){
				chrome.extension.sendMessage({msg: a.domain +" " + a.name});
			chrome.cookies.remove({url:"http"+(a.secure?"s":"")+"://"+a.domain+a.path,name:a.name,storeId:a.storeId});
			i = i + 1;
			//document.getElementById("pbar").value = 100*i/len;
			});
		}
	);
	document.getElementById("clrcookies").innerHTML = '<div class="icon"></div><span> Cleared </span>';
}
function init()
{
	/* Initialize settings */
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var current = tabs[0];
	    incognito = current.incognito;
	    url = current.url;
      	chrome.contentSettings.popups.get({
            'primaryUrl': "https://www.google.com/*",
            'incognito': incognito
        	},
          	function(details) {
            	if(details.setting=="allow")
 					document.getElementById("popup").classList.add("off");           	
            	else if(document.getElementById("popup").classList.contains("off"))
            		document.getElementById("popup").classList.toggle("off");
        });
        chrome.contentSettings.cookies.get({
            'primaryUrl': "https://www.google.com/*",
            'incognito': incognito
        	},
          	function(details) {
            	if(details.setting=="block")
            	{
 					document.getElementById("cookies").classList.add("off");
 					document.getElementById("cookies-text").innerHTML = "Cookies Disabled";         	
            	}
            	else 
            	{
            		if(document.getElementById("cookies").classList.contains("off"))
            			document.getElementById("cookies").classList.toggle("off");
            		document.getElementById("cookies-text").innerHTML = "Cookies Enabled";
            	}
        });

    });

	document.getElementById("popup").addEventListener("click",togglePopups);
	document.getElementById("cookies").addEventListener("click",toggleCookies);
	document.getElementById("clrcookies").addEventListener("click",clearCookies);
	document.getElementById("clickhide").addEventListener('click',clearCookies);
	document.getElementById("options").addEventListener("click", function()
	{});
}
window.addEventListener("DOMContentLoaded", init, false);