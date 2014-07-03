function loadQuality()
{
	var n = localStorage.getItem("ytQuality");
	if(n == "highres")
		document.getElementById('ytQ4').checked = "true";
	else if(n == "hd1080")
		document.getElementById('ytQ3').checked = "true";
	else if(n == "hd720")
		document.getElementById('ytQ2').checked = "true";
	else if(n == "default")
		document.getElementById('ytQ1').checked = "true";
}
function loadSize()
{
	var n = localStorage.getItem('ytSize');
	if(n == "0")
		document.getElementById('ytS1').checked = "true";
	else
		document.getElementById('ytS2').checked = "true";
}
function updateQuality()
{
	var n = "";
	if(document.getElementById('ytQ4').checked)
		n = "highres";
	else if(document.getElementById('ytQ3').checked)
		n = "hd1080";
	else if(document.getElementById('ytQ2').checked)
		n = "hd720";
	else if(document.getElementById('ytQ1').checked)
		n = "default";
	localStorage.setItem('ytQuality',n);
}
function updateSize()
{
	var n = "";
	if(document.getElementById('ytS1').checked)
		n = "0";
	else if(document.getElementById('ytS2').checked)
		n = "1";
	localStorage.setItem('ytSize',n);
}
function loadHistoryWL()
{
	var res = "";
	var arr = JSON.parse(localStorage.getItem("historyWL"));
	for(var i = arr.length-1; i>=0; i--)
	{
		res += "<option value=" + i.toString() +  ">"+arr[i]+"</option>\n";
	}
	document.getElementById("history").innerHTML = res;
	
}
function loadCookiesWL()
{
	var res = "";
	var arr = JSON.parse(localStorage.getItem("cookiesWL"));
	for(var i = arr.length-1; i>=0; i--)
	{
		res += "<option value=" + i.toString() +  ">"+arr[i]+"</option>\n";
	}
	document.getElementById("cookies").innerHTML = res;
}
function addToHistoryWL()
{
	var elem = document.getElementById('addhistinput').value;
	var arr = JSON.parse(localStorage.getItem("historyWL"));
	arr[arr.length] = elem;
	localStorage.setItem("historyWL",JSON.stringify(arr));
	console.log(arr);
	loadHistoryWL();
}
function addToCookiesWL()
{
	var elem = document.getElementById('addcookiesinput').value;
	var arr = JSON.parse(localStorage.getItem("cookiesWL"));
	arr[arr.length] = elem;
	localStorage.setItem("cookiesWL",JSON.stringify(arr));
	loadCookiesWL();
}
function deleteHistoryEntries()
{
	var arr = document.getElementById('history').options;
	var res = [];
	for(var i = 0; i<arr.length; i++)
	{
		var opt = arr[arr.length-1-i];
		if(!opt.selected)
		{
			res[res.length] = opt.text;
		}
	}
	localStorage.setItem("historyWL",JSON.stringify(res));
	loadHistoryWL();
}
function deleteCookiesEntries()
{
	var arr = document.getElementById('cookies').options;
	var res = [];
	for(var i = 0; i<arr.length; i++)
	{
		var opt = arr[arr.length-1-i];
		if(!opt.selected)
		{
			res[res.length] = opt.text;
		}
	}
	localStorage.setItem("cookiesWL",JSON.stringify(res));
	loadCookiesWL();
}
function exec() {
	loadQuality();
	loadSize();
	loadHistoryWL();
	loadCookiesWL();
	document.getElementById('ytQ1').addEventListener('click',updateQuality);
	document.getElementById('ytQ2').addEventListener('click',updateQuality);
	document.getElementById('ytQ3').addEventListener('click',updateQuality);
	document.getElementById('ytQ4').addEventListener('click',updateQuality);
	document.getElementById('ytS1').addEventListener('click',updateSize);
	document.getElementById('ytS2').addEventListener('click',updateSize);
	document.getElementById('addhist').addEventListener('click',addToHistoryWL);
	document.getElementById('addcookies').addEventListener('click',addToCookiesWL);
	document.getElementById('delhist').addEventListener('click',deleteHistoryEntries);
	document.getElementById('delcookies').addEventListener('click',deleteCookiesEntries);
}
document.addEventListener('DOMContentLoaded', exec);