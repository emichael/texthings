chrome.browserAction.onClicked.addListener(function(tab) {
  disabled = localStorage["status"] && (localStorage["status"] === "disabled");
  if (disabled) {
    chrome.browserAction.setIcon({path: "img/icon.png"});
    localStorage["status"] = "enabled";
  } else {
    chrome.browserAction.setIcon({path: "img/icon-disabled.png"});
    localStorage["status"] = "disabled";
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == "getStatus") {
    if (localStorage["status"]) {
      sendResponse({status: localStorage["status"]});
    } else {
      sendResponse({status: "enabled"});
    }
  } else {
    sendResponse({});
  }
});
