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
function init()
{
	document.getElementById("popup").addEventListener('click',toggle);
}
window.addEventListener("DOMContentLoaded", init, false);