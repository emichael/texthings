chrome.runtime.sendMessage({method: 'shouldTeXify', host: location.host},
  function(response) {
    if (JSON.parse(response.answer)) {

      var mathjax = document.createElement('script');
      mathjax.type = 'text/javascript';
      mathjax.src = 'https://cdnjs.cloudflare.com/ajax/libs/mathjax/2.7.0/MathJax.js?config=TeX-AMS-MML_HTMLorMML&delayStartupUntil=configured';

      var delimiters = response.delimiters;
      var inline_delimiters = [];
      if (delimiters.inline_dollar) {
        inline_delimiters.push(['$', '$']);
      }
      if (delimiters.inline_bracket) {
        inline_delimiters.push(['[;', ';]']);
      }
      if (delimiters.inline_custom) {
        inline_delimiters.push(delimiters.inline_custom);
      }
      var display_delimiters = [];
      if (delimiters.display_dollar) {
        display_delimiters.push(['$$', '$$']);
      }
      if (delimiters.display_bracket) {
        display_delimiters.push(['\\[', '\\]']);
      }
      if (delimiters.display_custom) {
        display_delimiters.push(delimiters.display_custom);
      }

      var pageScript = document.createElement('script');
      pageScript.id = 'texAllTheThingsPageScript';
      pageScript.type = 'text/javascript';
      pageScript.src = chrome.extension.getURL('js/pageScript.js');
      pageScript.setAttribute('inlineMath', JSON.stringify(inline_delimiters));
      pageScript.setAttribute('displayMath', JSON.stringify(display_delimiters));
      pageScript.setAttribute('skipTags', JSON.stringify(response.skip_tags));
      pageScript.setAttribute('ignoreClass', JSON.stringify(response.ignore_class));
      pageScript.setAttribute('processClass', JSON.stringify(response.process_class));

      document.body.appendChild(mathjax);
      document.body.appendChild(pageScript);
    }
  });
