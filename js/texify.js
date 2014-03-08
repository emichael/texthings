var mathjax = document.createElement('script');
mathjax.type = 'text/javascript';
mathjax.src = 'https://c328740.ssl.cf1.rackcdn.com/mathjax/latest/MathJax.js?config=TeX-AMS-MML_HTMLorMML';

var config = document.createElement('script');
config.type = 'text/x-mathjax-config';
config.text = "MathJax.Hub.Config({ tex2jax: { inlineMath: [['$','$'], ['[;', ';]']] } });";

var repeater = document.createElement('script');
repeater.type = 'text/javascript';
repeater.src = chrome.extension.getURL('js/retexChecker.js');

chrome.runtime.sendMessage({method: 'shouldTeXify', host: location.host},
  function(response) {
    if (JSON.parse(response.answer)) {
      document.head.appendChild(config);
      document.head.appendChild(mathjax);
      document.body.appendChild(repeater);
    }
});
