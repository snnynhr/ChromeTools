function debug(message)
{
	chrome.extension.sendMessage({msg: message});
}
function test()
{
	debug("clicked");
}
function togglePopups()
{
	if(document.getElementById("popup").classList.contains("off"))
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("popup").classList.toggle("off");
		document.getElementById("popup-text").innerHTML = "Popup Blocker On";
	}
	else
	{
		chrome.contentSettings['popups'].set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("popup").classList.toggle("off");
		document.getElementById("popup-text").innerHTML = "Popup Blocker Off";
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
function clearHistory()
{
	chrome.history.deleteAll(function()
	{
		localStorage.setItem("historyFlag",0);
		document.getElementById("clrhistory").innerHTML = '<div class="icon"></div><span> History Cleared </span>';
	});
}
function clearCookies()
{
	document.getElementById("clrcookies").innerHTML = '<progress id = "pbar" value="0" max="100"></progress>';
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
	localStorage.setItem("cookiesFlag",0);
	document.getElementById("clrcookies").innerHTML = '<div class="icon"></div><span> Cleared </span>';
}
function saveTab()
{
	debug("dsfadsf");
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var c = tabs[0];
	    var data = [
	    c.windowId,
	    c.index,
	    c.url,
	    c.active,
	    c.pinned,
	    c.openerTabId];
	    debug(c.url);
	    var curr = JSON.parse(localStorage.getItem("tabStack"));
    	curr[curr.length] = data;
    	localStorage.setItem("tabStack",JSON.stringify(curr));
    	chrome.tabs.remove(c.id, function() {});
		document.getElementById("restoreTab").classList.remove("hide");
    });
}
function restoreTab()
{
	curr = JSON.parse(localStorage.getItem("tabStack"));
	if(curr.length > 0)
	{
		c = curr.pop();
		if(curr.length ==0)
			document.getElementById("restoreTab").classList.add("hide");
		chrome.windows.get(c[0],{},function(windows)
		{
			if(windows == undefined || windows.id == chrome.windows.WINDOW_ID_NONE)
			{
				chrome.windows.create({url: c[2]}, function(win)
					{
						for(var i=0; i<curr.length; i++)
						{
							if(curr[i][0] == c[0])
							{
								curr[i][0] = win.id;
							}
						}
						localStorage.setItem("tabStack",JSON.stringify(curr));
					});
			}
			else
			{
				chrome.tabs.create({
					windowId: c[0],
					index: c[1],
					url: c[2],
					active: c[3],
					pinned: c[4],
				},  function(){});
				localStorage.setItem("tabStack",JSON.stringify(curr));
			}
		});
	}
}
function autoHD()
{
	var elem = document.getElementById("autoHD");
	if(elem.classList.contains("off"))
	{
		localStorage.setItem("hd","on");
		document.getElementById("autoHD-text").innerHTML = "AutoHD On";
	}
	else
	{
		localStorage.setItem("hd","off");
		document.getElementById("autoHD-text").innerHTML = "AutoHD Off";
	}
	elem.classList.toggle("off");
}
function changeAutoHD(e)
{
	e.stopPropagation();
	var elem = document.getElementById("autoHD-setting");
	if(elem.innerHTML == "Default")
	{
		elem.innerHTML = "720p";
		localStorage.setItem("ytQuality","hd720");
	}
	else if(elem.innerHTML == "720p")
	{
		elem.innerHTML = "1080p";
		localStorage.setItem("ytQuality","hd1080");
	}
	else if(elem.innerHTML == "1080p")
	{
		elem.innerHTML = "Maximum";
		localStorage.setItem("ytQuality","highres");
	}
	else if(elem.innerHTML == "Maximum")
	{
		elem.innerHTML = "Default";
		localStorage.setItem("ytQuality","default");
	}
}
function options()
{	
	chrome.tabs.create({url: "options.html"}, function() {});
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
            	{
 					document.getElementById("popup").classList.add("off");  
 					document.getElementById("popup-text").innerHTML = "Popup Blocker Off";         	
            	}
            	else
            	{
            		document.getElementById("popup").classList.remove("off");
            		document.getElementById("popup-text").innerHTML = "Popup Blocker On";
            	}
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
            		document.getElementById("cookies").classList.remove("off");
            		document.getElementById("cookies-text").innerHTML = "Cookies Enabled";
            	}
        });

    });
	
	var hd = localStorage.getItem("hd");
	if (hd == null)
	{
		hd = "on";
		localStorage.setItem("hd",hd);
	}
	if(hd == "off")
	{
		document.getElementById("autoHD").classList.add("off");
		document.getElementById("autoHD-text").innerHTML = "AutoHD Off";
	}
	else
	{
		document.getElementById("autoHD").classList.remove("off");
		document.getElementById("autoHD-text").innerHTML = "AutoHD On";
	}

	var ytQuality = localStorage.getItem("ytQuality");
	if (ytQuality == null)
	{
		ytQuality = "highres";
		localStorage.setItem("ytQuality","highres");
	}
	var elem = document.getElementById("autoHD-setting");
	if(ytQuality == "default")
		elem.innerHTML = "Default";
	else if(ytQuality == "hd720")
		elem.innerHTML = "720p";
	else if(ytQuality == "hd1080")
		elem.innerHTML = "1080p";
	else if(ytQuality == "highres")
		elem.innerHTML = "Maximum";

	var co = localStorage.getItem("cookiesFlag");
	if(co == null)
	{
		co = "1";
		localStorage.setItem("cookiesFlag",co);
	}
	if(co == "1")
	{
		document.getElementById("clrcookies").classList.add("off");
		document.getElementById("clrcookies-text").innerHTML = "Clear Cookies";
	}
	else
	{
		document.getElementById("clrcookies").classList.remove("off");
		document.getElementById("clrcookies-text").innerHTML = "Cookies Cleared";
	}

	/* Init Clear history */
	var hist = localStorage.getItem("historyFlag");
	if(hist == null)
	{
		hist = "1";
		localStorage.setItem("historyFlag",hist);
	}
	if(hist == "1")
	{
		document.getElementById("clrhistory").classList.add("off");
		document.getElementById("clrhistory-text").innerHTML = "Clear History";
	}
	else
	{
		document.getElementById("clrhistory").classList.remove("off");
		document.getElementById("clrhistory-text").innerHTML = "History Cleared";
	}

	/* Init restore tab */
	var tabStack = JSON.parse(localStorage.getItem("tabStack"));
	if(tabStack.length == 0)
		document.getElementById("restoreTab").classList.add("hide");
	else
		document.getElementById("restoreTab").classList.remove("hide");

	/* Click Event Listeners */
	document.getElementById("popup").addEventListener("click",togglePopups);
	document.getElementById("cookies").addEventListener("click",toggleCookies);
	document.getElementById("clrcookies").addEventListener("click",test);
	document.getElementById("clrcookies-add").addEventListener("click", function(e) { e.stopPropagation(); debug("icon clicked");});
	document.getElementById("clrhistory").addEventListener("click",clearHistory);
	document.getElementById("clrhistory-add").addEventListener("click", function(e) { e.stopPropagation(); debug("icon clicked");});
	document.getElementById("saveTab").addEventListener("click",saveTab);
	document.getElementById("restoreTab").addEventListener("click",restoreTab);
	document.getElementById("autoHD").addEventListener("click",autoHD);
	document.getElementById("autoHD-setting").addEventListener("click",changeAutoHD);
	document.getElementById("options").addEventListener("click", options);
}
window.addEventListener("DOMContentLoaded", init, false);