// app.js

const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

const static_path = path.join(__dirname, "/module");
app.use(express.static(static_path));

async function fetchData() {
    try {
        const response = await fetch('https://opentdb.com/api.php?amount=50&type=multiple');

        if (response.status != 200) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

async function generateQuestionPaper() {
    try {
        const data = await fetchData();
        const allQues = data.results;

        const easyQuestions = allQues.filter(question => question.difficulty === 'easy');
        const easyQuestionTexts = easyQuestions.map(question => question.question);
        const easyQuestionTopic = easyQuestions.map(question => question.category);

        const medQuestions = allQues.filter(question => question.difficulty === 'medium');
        const medQuestionTexts = medQuestions.map(question => question.question);
        const medQuestionTopic = medQuestions.map(question => question.category);

        const hardQuestions = allQues.filter(question => question.difficulty === 'hard');
        const hardQuestionTexts = hardQuestions.map(question => question.question);
        const hardQuestionTopic = hardQuestions.map(question => question.category);

        return { easyQuestionTexts, medQuestionTexts, hardQuestionTexts, hardQuestionTopic , easyQuestionTopic, medQuestionTopic};
    } catch (error) {
        console.error('Error generating question paper:', error.message);
        return { error: error.message };
    }
}

app.get('/generate', async (req, res) => {
    const questionPaper = await generateQuestionPaper();
    res.json(questionPaper);
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
