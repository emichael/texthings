function config() {
  var scriptNode = document.getElementById('texAllTheThingsPageScript');
  MathJax.Hub.Config({
    showProcessingMessages: false,
    messageStyle: 'none',
    tex2jax: {
      inlineMath: JSON.parse(scriptNode.getAttribute('inlineMath')),
      displayMath: JSON.parse(scriptNode.getAttribute('displayMath')),
      skipTags: JSON.parse(scriptNode.getAttribute('skipTags')),
      ignoreClass: JSON.parse(scriptNode.getAttribute('ignoreClass')),
      processClass: JSON.parse(scriptNode.getAttribute('processClass'))
    }
  });
}

function reTeX() {
  MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}

function waitForMathJax(){
  if(typeof MathJax !== 'undefined'){
    config();
    MathJax.Hub.Configured();
    setInterval(reTeX, 3000);
  }
  else{
    setTimeout(waitForMathJax,250);
  }
}

waitForMathJax();
