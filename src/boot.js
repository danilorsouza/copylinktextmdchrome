(function (window, document) {
    'use strict'
  
    /* global chrome */
  
    const _browser = chrome;
    let target;
  
    document.addEventListener('contextmenu', (e) => {
      target = e.target;
    }, false)
  
    _browser.runtime.onMessage.addListener(() => {
        const href = target.href || target.parentElement.href || target.parentElement.parentElement.href;
        const text = target.innerText.trim();
        const linkAndTextMD = `- [${text}](${href})`;
      _browser.runtime.sendMessage(null, linkAndTextMD);
    })
  })(window, document)