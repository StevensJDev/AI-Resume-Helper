// Create context menu item
chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: "deepseekAnswer",
      title: "DeepSeek Answer",
      contexts: ["selection"]
    });
  });
  
  // Handle context menu clicks
  chrome.contextMenus.onClicked.addListener(async (info, tab) => {
    if (info.menuItemId === "deepseekAnswer" && info.selectionText) {
      // Get user parameters from storage
      const userParams = await chrome.storage.sync.get([
        'preferredLength',
        'technicalLevel',
        'preferredStyle'
      ]);
      
      // Send message to content script with the selected text and user params
      chrome.tabs.sendMessage(tab.id, {
        action: "getDeepseekAnswer",
        text: info.selectionText,
        params: userParams
      });
    }
  });