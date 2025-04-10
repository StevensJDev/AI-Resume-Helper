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
      try {
        // Check if the content script is loaded
        await chrome.scripting.executeScript({
          target: { tabId: tab.id },
          files: ["content.js"]
        });
        
        // Get user parameters from storage
        const userParams = await chrome.storage.sync.get([
          'apiKey',
          'apiUrl',
          'preferredLength',
          'technicalLevel',
          'preferredStyle',
          'globalContext'
        ]);

        // Send message to content script with the selected text and user params
        chrome.tabs.sendMessage(tab.id, {
          action: "getDeepseekAnswer",
          text: info.selectionText,
          params: userParams
        });
      } catch (error) {
        console.error("Error injecting content script or sending message:", error);
      }
    }
  });