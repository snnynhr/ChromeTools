function loadQuality()
{
	var n = localStorage.getItem("ytQuality");
	if(n == "highres")
}




function exec() {
	loadQuality();
	document.getElementById('save').addEventListener('click',
    save_options);
}
document.addEventListener('DOMContentLoaded', exec);