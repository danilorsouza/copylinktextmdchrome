(function (window, document) {
    'use strict'
  
    /* global chrome */
  
    const _browser = chrome
    let target
  
    document.addEventListener('contextmenu', (e) => {
      target = e.target
    }, false)
  
    _browser.runtime.onMessage.addListener(() => {
      _browser.runtime.sendMessage(null, target)
    })
  })(window, document)
  