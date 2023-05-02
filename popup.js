chrome.storage.local.get('muteAction', (result) => {
    const muteAction = result.muteAction || 'all';
    document.getElementById('mute_action').value = muteAction;
});

document.getElementById('mute_action').addEventListener('change', async (event) => {
    const muteAction = event.target.value;
    chrome.storage.local.set({ muteAction });
});

chrome.extension.isAllowedIncognitoAccess((allowed) => {
    if (!allowed) {
        document.getElementById('incognito-warning').style.display = 'block';
    } else {
        document.getElementById('incognito-warning').style.display = 'none';
    }
});
