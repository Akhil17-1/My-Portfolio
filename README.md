# My Cyber Portfolio

This repository contains a dynamic, interactive portfolio website built with Flask and JavaScript. The site is designed to be responsive and engaging, featuring dynamic content loading, responsive navigation, and an interactive cipher challenge on the About page.

## Features

- **Dynamic Content Loading:**  
  Different sections (About, Projects, Experience, Certifications, Resume, Insights) are loaded dynamically using the Fetch API.

- **Responsive Design:**  
  The layout adjusts for desktop, mobile, and other device sizes with both desktop and mobile navigation options.

- **Interactive Cipher Challenge:**  
  On the About page, a full-screen overlay presents a cipher challenge. The challenge randomly picks a phrase (from 100 provided phrases per show) and applies one of several cipher mechanisms (Reverse, Caesar, XOR). Solve the cipher (or try for fun!) to reveal the full content.

- **Efficient and Modular Code:**  
  The JavaScript is split into multiple files:
  - **phrases.js:** Contains 100 phrases per show (Sherlock, Mr. Robot, Game of Thrones, Friends, Big Bang Theory, The Office, Brooklyn Nine-Nine).
  - **cipher.js:** Implements the cipher challenge logic.
  - **main.js:** Handles dynamic content loading and navigation.

- **Version Control with Git:**  
  The project is tracked with Git, making collaboration and deployment easier.

## Project Structure

my-portfolio/
├── static/
│   ├── css/
│   │   └── styles.css         # Site styles
│   └── js/
│       ├── phrases.js         # 100 phrases per show
│       ├── cipher.js          # Cipher challenge logic
│       └── main.js            # Site-wide JS and dynamic content loader
├── templates/
│   ├── index.html             # Main template with header, footer, and content container
│   └── content/
│       └── about.html         # Partial for the About page (contains content and cipher overlay)
├── app.py                     # Flask application with routes
└── README.md                  # This file

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Akhil17-1/YourRepoName.git
   cd YourRepoName

	2.	Create a virtual environment and activate it:

python3 -m venv venv
source venv/bin/activate   # On Windows: venv\Scripts\activate


	3.	Install dependencies:
Ensure you have a requirements.txt file (with at least Flask and bleach listed) and then run:

pip install -r requirements.txt


	4.	Run the Flask application:

python app.py


	5.	Deploy:
You can deploy this Flask application using Vercel, Heroku, or any other hosting platform that supports Python/Flask apps.

Usage
	•	When you open the site, the default (About) content is loaded dynamically.
	•	Navigation tabs allow you to switch between sections.
	•	On the About page, a full-screen cipher overlay appears on top of the blurred content. Solve the challenge (or see the answer) to unblur the page and view the full content.

Contributing

Contributions are welcome! If you find any issues or have enhancements in mind, please open an issue or submit a pull request.

License

This project is licensed under the MIT License.

Acknowledgments

Inspired by popular TV shows like Sherlock, Mr. Robot, Game of Thrones, Friends, The Big Bang Theory, The Office, and Brooklyn Nine-Nine.

Feel free to modify the details (such as repository URL, license, and any additional sections) to match your project specifics. Let me know if you need any further adjustments!