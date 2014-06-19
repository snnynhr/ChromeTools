function togglePopups()
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
function toggleCookies()
{
	if(document.getElementById("cookies").classList.contains("off"))
	{
		chrome.contentSettings['cookies'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("cookies").classList.toggle("off");
	}
	else
	{
		chrome.contentSettings['cookies'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("cookies").classList.toggle("off");
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
	/* Initialize settings */
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
 					document.getElementById("enabled").classList.add("off");           	
            	else if(document.getElementById("enabled").classList.contains("off"))
            		document.getElementById("enabled").classList.toggle("off");
        });
        chrome.contentSettings.cookies.get({
            'primaryUrl': url,
            'incognito': incognito
        	},
          	function(details) {
            	if(details.setting=="allow" || details.setting=="session_only")
 					document.getElementById("cookies").classList.add("off");           	
            	else if(document.getElementById("cookies").classList.contains("off"))
            		document.getElementById("cookies").classList.toggle("off");
        });

    });

	document.getElementById("enabled").addEventListener("click",togglePopups);
	document.getElementById("cookies").addEventListener("click",toggleCookies);
	document.getElementById("clickhide").addEventListener('click',clearCookies);
	document.getElementById("options").addEventListener("click", function()
	{});
}
window.addEventListener("DOMContentLoaded", init, false);