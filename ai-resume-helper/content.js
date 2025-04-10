// Listen for messages from background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getDeepseekAnswer") {
      getDeepseekAnswer(request.text, request.params)
        .then(answer => {
          // Display the answer to the user
          showAnswerPopup(answer);
        })
        .catch(error => {
          console.error("Error getting DeepSeek answer:", error);
          showAnswerPopup("Sorry, I couldn't get an answer. Please try again later.");
        });
    }
  });
  
  async function getDeepseekAnswer(question, userParams) {
    // Construct the prompt based on user parameters
    const prompt = constructPrompt(question, userParams);
    
    try {
      // Call DeepSeek API (you'll need to implement this)
      const response = await callDeepseekAPI(prompt);
      return response.answer;
    } catch (error) {
      throw error;
    }
  }
  
  function constructPrompt(question, params) {
    let prompt = `Answer the following question: "${question}"`;
    
    if (params.preferredLength) {
      prompt += `\nPlease provide a ${params.preferredLength} answer.`;
    }
    
    if (params.technicalLevel) {
      prompt += `\nThe answer should be at a ${params.technicalLevel} technical level.`;
    }
    
    if (params.preferredStyle) {
      prompt += `\nThe answer should be in a ${params.preferredStyle} style.`;
    }
    
    return prompt;
  }
  
  function showAnswerPopup(answer) {
    // Create a popup element
    const popup = document.createElement('div');
    popup.style.position = 'fixed';
    popup.style.top = '50%';
    popup.style.left = '50%';
    popup.style.transform = 'translate(-50%, -50%)';
    popup.style.backgroundColor = 'white';
    popup.style.padding = '20px';
    popup.style.borderRadius = '8px';
    popup.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    popup.style.zIndex = '9999';
    popup.style.maxWidth = '500px';
    popup.style.maxHeight = '80vh';
    popup.style.overflow = 'auto';
    
    // Add answer content
    popup.innerHTML = `
      <div style="margin-bottom: 15px; font-weight: bold;">DeepSeek Answer</div>
      <div style="margin-bottom: 15px;">${answer}</div>
      <button id="closePopup" style="padding: 5px 10px; background: #4285f4; color: white; border: none; border-radius: 4px; cursor: pointer;">Close</button>
    `;
    
    // Add close button functionality
    popup.querySelector('#closePopup').addEventListener('click', () => {
      document.body.removeChild(popup);
    });
    
    // Add to page
    document.body.appendChild(popup);
  }
  
  async function callDeepseekAPI(prompt) {
    const API_KEY = config.API_KEY;; // In production, store this securely
    const API_URL = 'https://api.deepseek.com/v1/chat/completions'; // Replace with actual API endpoint
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
          model: "deepseek-chat", // or the appropriate model name
          messages: [
            {
              role: "user",
              content: prompt
            }
          ],
          temperature: 0.7,
          max_tokens: 1000
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      return {
        answer: data.choices[0].message.content
      };
    } catch (error) {
      console.error("DeepSeek API error:", error);
      throw error;
    }
  }