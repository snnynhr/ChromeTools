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
		chrome.contentSettings.popups.set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("popup").classList.toggle("off");
		document.getElementById("popup-text").innerHTML = "Popup Blocker On";
	}
	else
	{
		chrome.contentSettings.popups.set({
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
		chrome.contentSettings.cookies.set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'allow'
		      });
		document.getElementById("cookies").classList.toggle("off");
		document.getElementById("cookies-text").innerHTML = "Cookies Enabled";
	}
	else
	{
		chrome.contentSettings.cookies.set({
		        'primaryPattern': '<all_urls>',
		        'setting': 'block'
		      });
		document.getElementById("cookies").classList.toggle("off");
		document.getElementById("cookies-text").innerHTML = "Cookies Disabled";
	}
}
function toggleDNT()
{
	if(document.getElementById("dnt").classList.contains("off"))
	{
		chrome.privacy.websites.referrersEnabled.get({}, function(details) {
			chrome.privacy.websites.referrersEnabled.set({ value: true }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("dnt").classList.remove("off");
			else
				document.getElementById("dnt-text").innerHTML = "Error";
			});
		});
	}
	else
	{
		chrome.privacy.websites.referrersEnabled.get({}, function(details) {
			chrome.privacy.websites.referrersEnabled.set({ value: false }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("dnt").classList.add("off");
			else
				document.getElementById("dnt-text").innerHTML = "Error";
			});
		});
	}
}
function togglePrefetch()
{
	if(document.getElementById("prefetch").classList.contains("off"))
	{
		chrome.privacy.network.networkPredictionEnabled.get({}, function(details) {
			chrome.privacy.network.networkPredictionEnabled.set({ value: true }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("prefetch").classList.remove("off");
			else
				document.getElementById("prefetch-text").innerHTML = "Error";
			});
		});
	}
	else
	{
		chrome.privacy.network.networkPredictionEnabled.get({}, function(details) {
			chrome.privacy.network.networkPredictionEnabled.set({ value: false }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("prefetch").classList.add("off");
			else
				document.getElementById("prefetch-text").innerHTML = "Error";
			});
		});
	}
}
function toggleAutofill()
{
	if(document.getElementById("autofill").classList.contains("off"))
	{
		chrome.privacy.services.autofillEnabled.get({}, function(details) {
			chrome.privacy.services.autofillEnabled.set({ value: true }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("autofill").classList.remove("off");
			else
				document.getElementById("autofill-text").innerHTML = "Error";
			});
		});
	}
	else
	{
		chrome.privacy.services.autofillEnabled.get({}, function(details) {
			chrome.privacy.services.autofillEnabled.set({ value: false }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("autofill").classList.add("off");
			else
				document.getElementById("autofill-text").innerHTML = "Error";
			});
		});
	}
}
function toggleSearchSuggest()
{
	if(document.getElementById("searchsuggest").classList.contains("off"))
	{
		chrome.privacy.services.searchSuggestEnabled.get({}, function(details) {
			chrome.privacy.services.searchSuggestEnabled.set({ value: true }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("searchsuggest").classList.remove("off");
			else
				document.getElementById("searchsuggest-text").innerHTML = "Error";
			});
		});
	}
	else
	{
		chrome.privacy.services.searchSuggestEnabled.get({}, function(details) {
			chrome.privacy.services.searchSuggestEnabled.set({ value: false }, function() {
			if (chrome.runtime.lastError === undefined)
				document.getElementById("searchsuggest").classList.add("off");
			else
				document.getElementById("searchsuggest-text").innerHTML = "Error";
			});
		});
	}
}
function clearHistory()
{
	if(confirm("Clear History?"))
	{
		var curr = JSON.parse(localStorage.getItem("historyWL"));
		chrome.history.search({text: ""}, function(arr)
		{
			for(var i = 0; i<arr.length; i++)
			{
				var url = arr[i].url;
				var n = url.search("://");
				if(n >= 0)
					url = url.substring(n+3);
				var m = url.search("/");
				url = url.substring(0,m);

				var flag = true;
				for(var j=0; j<curr.length; j++)
					if(curr[j]==url)
					{
						flag = false;
						break;
					}
				if(flag)
					chrome.history.deleteURL(arr[i].url);
			}
		});
	}
}
function clearCookies()
{
	if(confirm("Clear Cookies?"))
	{
		var curr = JSON.parse(localStorage.getItem("cookiesWL"));
		chrome.cookies.getAll({}, function(arr) {
				for(var i = 0; i<arr.length; i++)
				{
					var flag = true;
					for(var j=0; j<curr.length; j++)
						if(curr[j]==arr[i].domain)
							flag = false;
					if(flag)
						chrome.cookies.remove({url:"http"+(a.secure?"s":"")+"://"+a.domain+a.path,name:a.name,storeId:a.storeId});
				}
			}
		);
		localStorage.setItem("cookiesFlag",0);
		document.getElementById("clrcookies").innerHTML = '<div class="icon"></div><span> Cleared </span>';
	}
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
	    c.pinned];
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
		if(curr.length === 0)
			document.getElementById("restoreTab").classList.add("hide");
		chrome.windows.get(c[0],{},function(windows)
		{
			if(windows === undefined || windows.id == chrome.windows.WINDOW_ID_NONE)
			{
				chrome.windows.create({url: c[2]}, function(win)
					{
						for(var i=0; i<curr.length; i++)
							if(curr[i][0] == c[0])
								curr[i][0] = win.id;
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
function saveSession()
{
	chrome.tabs.query({currentWindow: true}, function(tabs)
	{
		var curr = JSON.parse(localStorage.getItem("sessionStack"));
		var session = [];
		for(var i=0; i<tabs.length; i++)
		{
			var c = tabs[i];
		    var data = [
			    c.windowId,
			    c.index,
			    c.url,
			    c.active,
			    c.pinned];
	    	session[session.length] = data;
	    	chrome.tabs.remove(c.id);
		}
		curr[curr.length] = session;
		localStorage.setItem("sessionStack",JSON.stringify(curr));
	    document.getElementById("restoreSession").classList.remove("hide");
	});
}
function restoreSession()
{
	curr = JSON.parse(localStorage.getItem("sessionStack"));
	if(curr.length > 0)
	{
		c = curr.pop();
		if(curr.length === 0)
			document.getElementById("restoreSession").classList.add("hide");
		localStorage.setItem("sessionStack",JSON.stringify(curr));
		chrome.windows.create({}, function(win)
		{
			chrome.tabs.query({windowId: win.id}, function(tabs)
				{
					var t = tabs[0];
					for(var i=0; i<c.length; i++)
					{
						chrome.tabs.create({
							windowId: win.id,
							index: c[i][1],
							url: c[i][2],
							active: c[i][3],
							pinned: c[i][4],
						});
						chrome.tabs.remove(t.id);
					}
				});

		});
	}
}
function restoreCrash()
{

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
function addCookie(e)
{
	var curr = JSON.parse(localStorage.getItem("cookiesWL"));
	e.stopPropagation();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var url = tabs[0].url;
	    var n = url.search("://");
		if(n >= 0)
			url = url.substring(n+3);
		var m = url.search("/");
		url = url.substring(0,m);
	    var flag = false;
	    for(var i=0; i<curr.length; i++)
	    	if(curr[i]==url)
	    	{
	    		flag = true;
	    	}
	    if(!flag)
	    {
	    	curr[curr.length] = url;
		    localStorage.setItem("cookiesWL",JSON.stringify(curr));
		}
    });
}
function addHistory(e)
{
	var curr = JSON.parse(localStorage.getItem("historyWL"));
	e.stopPropagation();
	chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	    var url = tabs[0].url;
	    var n = url.search("://");
		if(n >= 0)
			url = url.substring(n+3);
		var m = url.search("/");
		url = url.substring(0,m);
	    var flag = false;
	    for(var i=0; i<curr.length; i++)
	    	if(curr[i]==url)
	    	{
	    		flag = true;
	    	}
	    if(!flag)
	    {
	    	curr[curr.length] = url;
		    localStorage.setItem("historyWL",JSON.stringify(curr));
		}
    });
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
	if (hd === null)
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
	if (ytQuality === null)
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
	if(co === null)
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
	if(hist === null)
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

	chrome.privacy.websites.referrersEnabled.get({}, function(details) {
		if (details.value)
			document.getElementById("dnt").classList.remove("off");
		else
			document.getElementById("dnt").classList.add("off");
	});


	chrome.privacy.network.networkPredictionEnabled.get({}, function(details) {
		if (details.value)
			document.getElementById("prefetch").classList.remove("off");
		else
			document.getElementById("prefetch").classList.add("off");
	});


	chrome.privacy.services.autofillEnabled.get({}, function(details) {
		if (details.value)
			document.getElementById("autofill").classList.remove("off");
		else
			document.getElementById("autofill").classList.add("off");
	});

	chrome.privacy.services.searchSuggestEnabled.get({}, function(details) {
		if (details.value)
			document.getElementById("searchsuggest").classList.remove("off");
		else
			document.getElementById("searchsuggest").classList.add("off");
	});

	/* Init restore tab */
	var tabStack = JSON.parse(localStorage.getItem("tabStack"));
	if(tabStack.length === 0)
		document.getElementById("restoreTab").classList.add("hide");
	else
		document.getElementById("restoreTab").classList.remove("hide");

	/* Init restore session */
	var sessionStack = JSON.parse(localStorage.getItem("sessionStack"));
	if(sessionStack.length === 0)
		document.getElementById("restoreSession").classList.add("hide");
	else
		document.getElementById("restoreSession").classList.remove("hide");

	document.getElementById("restoreCrash").classList.add("hide");
	/* Click Event Listeners */
	document.getElementById("popup").addEventListener("click",togglePopups);
	document.getElementById("cookies").addEventListener("click",toggleCookies);
	document.getElementById("dnt").addEventListener("click",toggleDNT);
	document.getElementById("prefetch").addEventListener("click",togglePrefetch);
	document.getElementById("autofill").addEventListener("click",toggleAutofill);
	document.getElementById("searchsuggest").addEventListener("click",toggleSearchSuggest);
	document.getElementById("clrcookies").addEventListener("click",clearCookies);
	document.getElementById("clrcookies-add").addEventListener("click", addCookie);
	document.getElementById("clrhistory").addEventListener("click",clearHistory);
	document.getElementById("clrhistory-add").addEventListener("click", addHistory);
	document.getElementById("saveTab").addEventListener("click",saveTab);
	document.getElementById("restoreTab").addEventListener("click",restoreTab);
	document.getElementById("saveSession").addEventListener("click",saveSession);
	document.getElementById("restoreSession").addEventListener("click",restoreSession);
	document.getElementById("restoreCrash").addEventListener("click",restoreCrash);
	document.getElementById("autoHD").addEventListener("click",autoHD);
	document.getElementById("autoHD-setting").addEventListener("click",changeAutoHD);
	document.getElementById("options").addEventListener("click", options);
}
window.addEventListener("DOMContentLoaded", init, false);