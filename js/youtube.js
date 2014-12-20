var onReady = function onYouTubePlayerReady(player) {
  //debug('onReady called');
  try {
      extPlayer = player;
      if (typeof extPlayer == 'string') {
        extPlayer = document.getElementById(extPlayer);
      }
      if (typeof movie_player != 'undefined') {
        extPlayer = movie_player;
      }
      extPlayer.addEventListener('onStateChange', 'onytplayerStateChange');
      updateQuality();
      setTimeout(updateQuality, 3000);
  }
  catch (e) {
  }
};
var onStateChange = function onytplayerStateChange(newState) {
  try {
      if (newState == 1)
      {
        updateQuality();
      }
  }
  catch (e) {}
};
var uq = function updateQuality() {
  var aq = extPlayer.getAvailableQualityLevels();
  extPlayer.setPlaybackQuality(aq[0]);
};

function setup() {
  chrome.runtime.sendMessage({msg: 'getSettings'}, function(settings) {
    var quality = settings.ytQuality ? settings.ytQuality : 'hd720';
    var size = settings.ytSize ? settings.ytSize : '1';

    var scriptText = "var quality = '" + quality + "';\n";
    scriptText += (onReady.toString() + '\n');
    scriptText += (onStateChange.toString() + '\n');
    scriptText += (uq.toString() + '\n');

    if (size == '1') {
      scriptText += "document.cookie = 'wide = 1';";
    }
    if (settings.enabled == 1) {
      injectScript(scriptText);
    }
  });
}

function injectScript(scriptText) {
  var script = document.createElement('script');
  script.textContent = scriptText;
  document.head.appendChild(script);
}

$(document).ready(setup);

function updateQualityPlease() {
  injectScript('setTimeout(updateQuality,3000)');
}
