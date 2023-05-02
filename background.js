chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.get('muteAction', (result) => {
      if (result.muteAction === undefined) {
        chrome.storage.local.set({ muteAction: 'all' });
      }
    });
  });
  
  chrome.tabs.onCreated.addListener(async (tab) => {
    const { muteAction } = await chrome.storage.local.get('muteAction');
  
    if (muteAction === 'disabled') {
      return;
    }
  
    const isIncognito = tab.incognito;
  
    if (
      (muteAction === 'only_for_incognito' && isIncognito) ||
      (muteAction === 'only_for_non_incognito' && !isIncognito) ||
      muteAction === 'all'
    ) {
      chrome.tabs.update(tab.id, { muted: true });
    }
});
  