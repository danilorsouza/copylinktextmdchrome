(function () {
    'use strict'
  
    /* global chrome */
  
    const _browser = chrome;
    const _menus = _browser.contextMenus;
    const dummyTextArea = document.createElement('textarea');
    document.body.appendChild(dummyTextArea);
  
    _menus.create({
      id: 'copy-link-text',
      title: _browser.i18n.getMessage('menuItemCopyLinkText'),
      contexts: ['all']
    });
  
    _menus.onClicked.addListener((info, tab) => {
      _browser.tabs.sendMessage(tab.id, '', { frameId: info.frameId });
    })
  
    _browser.runtime.onMessage.addListener((linkAndText) => {
        dummyTextArea.value = linkAndText;
        dummyTextArea.select();
        document.execCommand('copy');
        dummyTextArea.value = '';
    })
})()