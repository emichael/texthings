function reTeX() {
    MathJax.Hub.Queue(['Typeset', MathJax.Hub]);
}

setInterval(reTeX, 3000);
