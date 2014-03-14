var mathjax = document.createElement('script');
mathjax.type = 'text/javascript';
mathjax.src = 'https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML';

var config = document.createElement('script');
config.type = 'text/x-mathjax-config';

var repeater = document.createElement('script');
repeater.type = 'text/javascript';
repeater.src = chrome.extension.getURL('js/retexChecker.js');

chrome.runtime.sendMessage({method: 'shouldTeXify', host: location.host},
  function(response) {
    if (JSON.parse(response.answer)) {
      // Add the delimiters to the config script element
      config.text = create_config_text(response.delimiters);

      document.head.appendChild(config);
      document.head.appendChild(mathjax);
      document.body.appendChild(repeater);
    }
});

function create_config_text(delimiters) {
  var inline_delimiters = [];
  if (delimiters.inline_dollar) {
    inline_delimiters.push(['$', '$']);
  }
  if (delimiters.inline_bracket) {
    inline_delimiters.push(['[;', ';]']);
  }
  var display_delimiters = [];
  if (delimiters.display_dollar) {
    display_delimiters.push(['$$', '$$']);
  }
  if (delimiters.display_bracket) {
    display_delimiters.push(['\\[', '\\]']);
  }

  var text = ("MathJax.Hub.Config({ tex2jax: { inlineMath: " +
    JSON.stringify(inline_delimiters) + ", displayMath: " +
    JSON.stringify(display_delimiters) + " } });");

  return text;
}
