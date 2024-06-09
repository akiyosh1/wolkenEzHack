// Load the previous state from Chrome storage
chrome.storage.sync.get('toggleState', (data) => {
  toggleSwitch1.checked = data.toggleState || false;
});

// Save the new state to Chrome storage and notify content script
toggleSwitch1.addEventListener('change', () => {
  const toggleState = toggleSwitch1.checked;
  chrome.storage.sync.set({ toggleState }, () => {
    notifyContentScript(toggleState);
  });
});

function notifyContentScript(toggleState) {
  // Send a message to the active tab's content script to update its state
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    const activeTab = tabs[0];
    if (activeTab) {
      chrome.tabs.sendMessage(activeTab.id, { toggleState });
    }
  });
}

// Set the initial state to disabled (unchecked)
const toggleState = false;
chrome.storage.sync.set({ toggleState });
