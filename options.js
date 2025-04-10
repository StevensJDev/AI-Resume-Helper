document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    chrome.storage.sync.get([
      'apiKey',
      'apiUrl',
      'preferredLength',
      'technicalLevel',
      'preferredStyle',
      'globalContext'
    ], (settings) => {
      if (settings.apiKey) {
        document.getElementById('apiKey').value = settings.apiKey;
      }
      if (settings.apiUrl) {
        document.getElementById('apiUrl').value = settings.apiUrl;
      }
      if (settings.preferredLength) {
        document.getElementById('preferredLength').value = settings.preferredLength;
      }
      if (settings.technicalLevel) {
        document.getElementById('technicalLevel').value = settings.technicalLevel;
      }
      if (settings.preferredStyle) {
        document.getElementById('preferredStyle').value = settings.preferredStyle;
      }
      if (settings.globalContext) {
        document.getElementById('globalContext').value = settings.globalContext;
      }
    });
    
    // Save settings
    document.getElementById('saveSettings').addEventListener('click', () => {
      const settings = {
        apiKey: document.getElementById('apiKey').value,
        apiUrl: document.getElementById('apiUrl').value,
        preferredLength: document.getElementById('preferredLength').value,
        technicalLevel: document.getElementById('technicalLevel').value,
        preferredStyle: document.getElementById('preferredStyle').value,
        globalContext: document.getElementById('globalContext').value
      };
      
      chrome.storage.sync.set(settings, () => {
        document.getElementById('status').textContent = 'Settings saved successfully!';
        setTimeout(() => {
          document.getElementById('status').textContent = '';
        }, 2000);
      });
    });
});