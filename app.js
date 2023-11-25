const express = require('express');
const fetch = require('node-fetch');


const path = require('path');

const app = express();

const PORT = process.env.PORT || 3000;

const static_path = path.join(__dirname, "/module");

app.use(express.static(static_path));






// console.log(path.join(__dirname, "/module"));

async function fetchData() {
    try {
      // Make a GET request using the Fetch API
      const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');
  

      // Check if the request was successful (status code in the range 200-299)
      if (response.status != 200) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

    

    
      
       const data = await response.json();

    
    
      // Parse the response body as JSON

      return data;


      


      

     

      
      
  
      // Do something with the data


    } catch (error) {
      // Handle errors
      console.error('Error fetching data:', error.message);
    }
  }

 



  async function generateQuestionPaper() {
    try {
       

      const data = await fetchData();
        const allQues = data.results;
      //  console.log(data);

        const easyQuestions = allQues.filter(question => question.difficulty === 'easy');
        const easyQuestionTexts = easyQuestions.map(question => question.question);

        const medQuestions = allQues.filter(question => question.difficulty === 'medium');
        const medQuestionTexts = medQuestions.map(question => question.question);

        const hardQuestions = allQues.filter(question => question.difficulty === 'hard');
        const hardQuestionTexts = hardQuestions.map(question => question.question);

        

       

        updateInnerHTML('easyOptions', easyQuestionTexts);
        updateInnerHTML('mediumOptions', medQuestionTexts);
        updateInnerHTML('hardOptions', hardQuestionTexts);

    } catch (error) {
        console.error('Error generating question paper:', error.message);
    }
}

function updateInnerHTML(elementId, questionTexts) {
  const optionsElement = document.getElementById(elementId);
  optionsElement.innerHTML = ''; // Clear existing content

  questionTexts.forEach((question, index) => {
      const li = document.createElement('li');
      const label = document.createElement('label');
      label.textContent = `Question ${index + 1}: ${question}`;
      li.appendChild(label);
      optionsElement.appendChild(li);
  });
}

generateQuestionPaper()
  // Call the async function

  
  

app.listen(PORT, ()=>{
    console.log(`This server running on ${PORT}`);
})