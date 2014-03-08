chrome.browserAction.onClicked.addListener(function(tab) {
  init_unset_options();

  var enabled = JSON.parse(localStorage['enabled']);
  if (enabled) {
    chrome.browserAction.setIcon({path: 'img/icon-disabled.png'});
    localStorage['enabled'] = JSON.stringify(false);
  } else {
    chrome.browserAction.setIcon({path: 'img/icon.png'});
    localStorage['enabled'] = JSON.stringify(true);
  }
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  init_unset_options();

  if (request.method == 'shouldTeXify') {
    sendResponse({answer: should_texify(request.host)});
  } else {
    sendResponse({});
  }
});

function should_texify(host) {
  if (!(JSON.parse(localStorage['enabled']))) {
    return false;
  }

  var white_list_mode = JSON.parse(localStorage['white_list_mode']);
  var domain_list = JSON.parse(localStorage['sites']);
  var matches = host_matches(host, domain_list);

  return (white_list_mode == matches);
}

function host_matches(host, domain_list) {
  for (var i = 0; i < domain_list.length; i++) {
    if (host.contains(domain_list[i])) {
      return true;
    }
  }
  return false;
}
