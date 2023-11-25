# question_paper

To Run this:
Just Clone the repository and give command : npm start
run the : http://localhost:3000/  
It will run successfully

Frontend (HTML and client.js):
An HTML page (index.html) is created with a button to generate a question paper and three sections for easy, medium, and hard questions.
The client.js file contains functions to fetch data from a server, update the HTML with the received data, and handle the button click event to generate a question paper.
Styling (CSS):

Basic styling is applied to create a clean look for the question paper using CSS.

#Backend (app.js):
An Express.js server (app.js) is set up to serve static files and handle a GET request to the '/generate' endpoint.
The server fetches 50 multiple-choice questions of various difficulty levels from the Open Trivia Database using the node-fetch library.
Questions are categorized into easy, medium, and hard difficulty levels.
The server sends the categorized question data as JSON in response to the '/generate' endpoint.


#Question Paper Generation:
The generateQuestionPaper function filters questions based on difficulty level, extracts question texts, and topic information.
The generated question paper data is returned to the client.
Error Handling:

Errors during data fetching or question paper generation are logged and appropriate error messages are sent to the client.
Running the Application:

The server listens on a specified port (either the environment variable PORT or 3000) and logs a message indicating that it is running.
