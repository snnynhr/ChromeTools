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

}
function loadCookieWL()
{
	
}
function exec() {
	loadQuality();
	loadSize();
	loadHistoryWL();
	loadCookieWL();
	document.getElementById('ytQ1').addEventListener('click',updateQuality);
	document.getElementById('ytQ2').addEventListener('click',updateQuality);
	document.getElementById('ytQ3').addEventListener('click',updateQuality);
	document.getElementById('ytQ4').addEventListener('click',updateQuality);
	document.getElementById('ytS1').addEventListener('click',updateSize);
	document.getElementById('ytS2').addEventListener('click',updateSize);

}
document.addEventListener('DOMContentLoaded', exec);