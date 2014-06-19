function toggle()
{
	var toggle = document.getElementById("popup_status").innerHTML;
	if(toggle == "ON")
	{
		document.getElementById("popup_status").innerHTML = "OFF";
		document.getElementById("popup_status").style.cssText = "color:red;"
	}
	else
	{
		document.getElementById("popup_status").innerHTML = "ON";
		document.getElementById("popup_status").style.cssText = "color:green;"
	}
}
function clearCookies()
{
	document.getElementById("cookies").innerHTML = '<progress id = "pbar" value="0" max="100"></progress>';
	var i;
	for(i=1; i<=100; i++)
	{
		document.getElementById("pbar").value = i + "";
	}
	document.getElementById("cookies").innerHTML = "Clear Cookies";
}
function init()
{
	document.getElementById("popup").addEventListener('click',toggle);
	document.getElementById("cookies").addEventListener('click',clearCookies);
}
window.addEventListener("DOMContentLoaded", init, false);