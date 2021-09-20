(function () {
    'use strict'
  
    /* global chrome */
  
    const _browser = chrome
    const _menus = _browser.contextMenus
    const dummyTextArea = document.createElement('textarea')
    document.body.appendChild(dummyTextArea)
  
    _menus.create({
      id: 'copy-link-text',
      title: _browser.i18n.getMessage('menuItemCopyLinkText'),
      contexts: ['all']
    })
  
    _menus.onClicked.addListener((info, tab) => {
      // Send an empty message to the content script, which will then send back the
      // link text for us to copy on the clipboard.
      _browser.tabs.sendMessage(tab.id, '', { frameId: info.frameId })
    })
  
    _browser.runtime.onMessage.addListener((element) => {
        const linkText = element.innerText.trim()
        dummyTextArea.value = linkText
        dummyTextArea.select()
        document.execCommand('copy')
        dummyTextArea.value = ''
    })
  })()
  