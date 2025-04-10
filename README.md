# DeepSeek Assistant

DeepSeek Assistant is a Chrome extension that provides intelligent answers to highlighted text using the DeepSeek API. Customize the response style, length, and technical level to suit your needs.

## Features

- **Context Menu Integration**: Highlight text on any webpage and get answers via the context menu.
- **Customizable Settings**: Adjust preferred answer length, technical level, and style through the settings page.
- **Popup Display**: View answers in a clean, user-friendly popup.

## Installation

1. Clone this repository to your local machine:
   ```bash
   git clone https://github.com/your-username/AI-Resume-Helper-Chrome.git
   ```
2. Navigate to the project directory:
   ```bash
   cd AI-Resume-Helper
   ```
3. Open Chrome and go to `chrome://extensions/`.
4. Enable "Developer mode" in the top-right corner.
5. Click "Load unpacked" and select the project directory.

## Usage

1. Highlight any text on a webpage.
2. Right-click and select "DeepSeek Answer" from the context menu.
3. View the answer in a popup.

## Configuration

1. Open the settings page by clicking on the extension icon and selecting "Options."
2. Adjust the following settings:
   - **Preferred Answer Length**: Concise, Medium, or Detailed.
   - **Technical Level**: Beginner, Intermediate, or Advanced.
   - **Preferred Style**: Neutral, Friendly, or Professional.
3. Save your settings.

## API Key Setup

1. Create a `config.js` file in the root directory (this file is ignored by Git).
2. Add your DeepSeek API key:
   ```js
   // filepath: c:\Users\3kwik\OneDrive\Desktop\SHDW Arts Bus\Portfolio\AI-Resume-Helper\config.js
   const config = {
       API_KEY: "your-deepseek-api-key"
   };
   ```
3. Replace `"your-deepseek-api-key"` with your actual API key.

## License

This project is licensed under the MIT License. See the `LICENSE` file for details.

## Acknowledgments

- [DeepSeek API](https://deepseek.com) for powering the intelligent answers.
- Chrome Extensions documentation for guidance on building extensions.
