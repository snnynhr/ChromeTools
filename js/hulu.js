function debug(message)
{
    chrome.extension.sendMessage({msg: message});
}
var elem = document.getElementById('flash-player-container');
elem.innerHTML = elem.innerHTML.replace('high', 'low');
