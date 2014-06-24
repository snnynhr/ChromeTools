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
		localStorage.setItem("tabStack",JSON.stringify(curr));
		chrome.tabs.create({
			windowId: c[0],
			index: c[1],
			url: c[2],
			active: c[3],
			pinned: c[4],
			openerTabId: c[5],
		}, function()
		{

		});
	}
}
function autoHD()
{
	var elem = document.getElementById("autoHD");
	debug(elem.classList.contains("off"));
	if(elem.classList.contains("off"))
	{
		localStorage.setItem("hd","on");
		document.getElementById("autoHD-text").innerHTML = "YouTube AutoHD On";
	}
	else
	{
		localStorage.setItem("hd","off");
		document.getElementById("autoHD-text").innerHTML = "YouTube AutoHD Off";
	}
	elem.classList.toggle("off");
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
		document.getElementById("autoHD-text").innerHTML = "YouTube AutoHD Off";
	}
	else
	{
		document.getElementById("autoHD").classList.remove("off");
		document.getElementById("autoHD-text").innerHTML = "YouTube AutoHD On"
	}

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
	document.getElementById("hi").addEventListener("click", function(e) { e.stopPropagation(); debug("icon clicked");});
	document.getElementById("clrhistory").addEventListener("click",clearHistory);
	document.getElementById("saveTab").addEventListener("click",saveTab);
	document.getElementById("restoreTab").addEventListener("click",restoreTab);
	document.getElementById("autoHD").addEventListener("click",autoHD);
	document.getElementById("options").addEventListener("click", function()
	{});
}
window.addEventListener("DOMContentLoaded", init, false);