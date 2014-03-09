chrome.browserAction.onClicked.addListener(function(tab) {
  if (get_option('enabled')) {
    chrome.browserAction.setIcon({
      path: {
      "38": "img/browser-disabled38.png",
      "19": "img/browser-disabled19.png"
      }
    });
    set_option('enabled', false);
  } else {
    chrome.browserAction.setIcon({
      path: {
      "38": "img/browser38.png",
      "19": "img/browser19.png"
      }
    });
    set_option('enabled', true);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == 'shouldTeXify') {
    sendResponse({answer: should_texify(request.host)});
  } else {
    sendResponse({});
  }
});

function should_texify(host) {
  if (!get_option('enabled')) {
    return false;
  }

  var matches = host_matches(host, get_option('sites'));
  return (get_option('white_list_mode') == matches);
}

function host_matches(host, domain_list) {
  for (var i = 0; i < domain_list.length; i++) {
    if (host.indexOf(domain_list[i]) >= 0) {
      return true;
    }
  }
  return false;
}
