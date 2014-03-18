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

chrome.webRequest.onHeadersReceived.addListener(function(details) {
    var hostname = get_hostname(details.url);
    if (!should_texify(hostname)) {
      return;
    }

    for (var i = 0; i < details.responseHeaders.length; i++) {
      var header = details.responseHeaders[i];
      if (header.name.toLowerCase() == 'content-security-policy') {
        var policies = header.value.split(';');
        for (var j = 0; j < policies.length; j++) {
          var terms = policies[j].trim().split(' ');
          if (terms[0].toLowerCase() == 'script-src') {
            terms.push('https://c328740.ssl.cf1.rackcdn.com');
            if (get_option('allow_eval_inline')) {
              terms.push("'unsafe-eval'");
              terms.push("'unsafe-inline'");
            }
          }
          policies[j] = terms.join(' ');
        }

        header.value = policies.join('; ');
        return {responseHeaders: details.responseHeaders};
      }
    }

  },
  {urls: ["<all_urls>"], types: ["main_frame", "sub_frame"]},
  ["blocking", "responseHeaders"]
);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == 'shouldTeXify') {
    sendResponse({answer: should_texify(request.host),
                  delimiters: get_delimiters()});
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

function get_hostname(url) {
  var parser = document.createElement('a');
  parser.href = url;
  return parser.hostname;
}

function get_delimiters() {
  var delimiters = {};
  delimiters.inline_dollar = get_option('inline_dollar');
  delimiters.inline_bracket = get_option('inline_bracket');
  delimiters.display_dollar = get_option('display_dollar');
  delimiters.display_bracket = get_option('display_bracket');
  return delimiters;
}
