// Handle a click to the toolbar icon
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

// Set the headers to allow the MathJax CDN if we're typesetting this page
chrome.webRequest.onHeadersReceived.addListener(function(details) {
    var hostname = get_hostname(details.url);
    if (!should_texify(hostname)) {
      return;
    }

    // Check though all the response headers
    for (var i = 0; i < details.responseHeaders.length; i++) {
      var header = details.responseHeaders[i];
      if (header.name.toLowerCase() == 'content-security-policy') {
        // Individual policies are separated with ;
        var policies = header.value.split(';');
        for (var j = 0; j < policies.length; j++) {
          // Terms of the policy are separated with spaces
          var terms = policies[j].trim().split(' ');
          // Add the MathJax CDN to script-src and font-src
          if (terms[0].trim().toLowerCase() == 'script-src') {
            terms.push('https://cdnjs.cloudflare.com');
          }
          else if (terms[0].trim().toLowerCase() == 'font-src') {
            terms.push('https://cdnjs.cloudflare.com');
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

// Respond to requests from other scripts
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.method == 'shouldTeXify') {
    sendResponse({answer: should_texify(request.host),
                  delimiters: get_delimiters(),
                  skip_tags: get_skip_tags(),
                  ignore_class: get_ignore_class(),
                  process_class: get_process_class()});
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
  delimiters.inline_custom = get_option('inline_custom')
  delimiters.display_dollar = get_option('display_dollar');
  delimiters.display_bracket = get_option('display_bracket');
  delimiters.display_custom = get_option('display_custom');
  return delimiters;
}

function get_skip_tags(){
  return get_option('skip_tags');
}

function get_ignore_class(){
  return get_option('ignore_class');
}

function get_process_class(){
  return get_option('process_class');
}
