// https://obfuscator.io/
// https://skalman.github.io/UglifyJS-online/

var video = document.getElementById('video');
var source = video.dataset.source

var config = {
  autoStartLoad: true,
  startPosition : -1,
  capLevelToPlayerSize: false,
  debug: false,
  defaultAudioCodec: undefined,
  initialLiveManifestSize: 1,
  maxBufferLength: 30,
  maxMaxBufferLength: 600,
  maxBufferSize: 60*1000*1000,
  maxBufferHole: 0.5,
  lowBufferWatchdogPeriod: 0.5,
  highBufferWatchdogPeriod: 3,
  nudgeOffset: 0.1,
  nudgeMaxRetry : 3,
  maxFragLookUpTolerance: 0.2,
  liveSyncDurationCount: 3,
  liveMaxLatencyDurationCount: 10,
  enableWorker: true,
  enableSoftwareAES: true,
  manifestLoadingTimeOut: 10000,
  manifestLoadingMaxRetry: 1,
  manifestLoadingRetryDelay: 500,
  manifestLoadingMaxRetryTimeout : 64000,
  startLevel: undefined,
  levelLoadingTimeOut: 10000,
  levelLoadingMaxRetry: 4,
  levelLoadingRetryDelay: 500,
  levelLoadingMaxRetryTimeout: 64000,
  fragLoadingTimeOut: 20000,
  fragLoadingMaxRetry: 6,
  fragLoadingRetryDelay: 500,
  fragLoadingMaxRetryTimeout: 64000,
  startFragPrefetch: false,
  appendErrorMaxRetry: 3,
  enableWebVTT: true,
  enableCEA708Captions: true,
  stretchShortVideoTrack: false,
  maxAudioFramesDrift : 1,
  forceKeyFrameOnDiscontinuity: true,
  abrEwmaFastLive: 5.0,
  abrEwmaSlowLive: 9.0,
  abrEwmaFastVoD: 4.0,
  abrEwmaSlowVoD: 15.0,
  abrEwmaDefaultEstimate: 500000,
  abrBandWidthFactor: 0.95,
  abrBandWidthUpFactor: 0.7,
  minAutoBitrate: 0
};

if (Hls.isSupported()) {
  var hls = new Hls(config);
  // bind them together
  hls.attachMedia(video);
  hls.on(Hls.Events.MEDIA_ATTACHED, function () {
    console.log("video and hls.js are now bound together !");
    hls.loadSource(source);
    hls.on(Hls.Events.MANIFEST_PARSED, function (event, data) {
      console.log("manifest loaded, found " + data.levels.length + " quality level");
    });
  });
}

var handlePlay = function () {
  document.body.classList.add('playing')
}

var handlePause = function () {
  document.body.classList.remove('playing')
}

video.addEventListener("play", handlePlay);
video.addEventListener("pause", handlePause);

// Chatbro

function ChatbroLoader(chats,async){async=!1!==async;var params={embedChatsParameters:chats instanceof Array?chats:[chats],lang:navigator.language||navigator.userLanguage,needLoadCode:'undefined'==typeof Chatbro,embedParamsVersion:localStorage.embedParamsVersion,chatbroScriptVersion:localStorage.chatbroScriptVersion},xhr=new XMLHttpRequest;xhr.withCredentials=!0,xhr.onload=function(){eval(xhr.responseText)},xhr.onerror=function(){console.error('Chatbro loading error')},xhr.open('GET','//www.chatbro.com/embed.js?'+btoa(unescape(encodeURIComponent(JSON.stringify(params)))),async),xhr.send()}/* Chatbro Widget Embed Code End */
ChatbroLoader({encodedChatId: '32xHE'});

var resizeTimer;
window.onresize = function () {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    document.getElementById('chatbro').innerHTML = '';
    ChatbroLoader({encodedChatId: '32xHE'});
  }, 300);
}

