document.addEventListener('DOMContentLoaded', () => {
    // Load saved settings
    chrome.storage.sync.get([
      'preferredLength',
      'technicalLevel',
      'preferredStyle'
    ], (settings) => {
      if (settings.preferredLength) {
        document.getElementById('preferredLength').value = settings.preferredLength;
      }
      if (settings.technicalLevel) {
        document.getElementById('technicalLevel').value = settings.technicalLevel;
      }
      if (settings.preferredStyle) {
        document.getElementById('preferredStyle').value = settings.preferredStyle;
      }
    });
    
    // Save settings
    document.getElementById('saveSettings').addEventListener('click', () => {
      const settings = {
        preferredLength: document.getElementById('preferredLength').value,
        technicalLevel: document.getElementById('technicalLevel').value,
        preferredStyle: document.getElementById('preferredStyle').value
      };
      
      chrome.storage.sync.set(settings, () => {
        document.getElementById('status').textContent = 'Settings saved successfully!';
        setTimeout(() => {
          document.getElementById('status').textContent = '';
        }, 2000);
      });
    });
  });