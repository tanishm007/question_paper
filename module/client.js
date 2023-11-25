// client.js

async function fetchData() {
    try {
        const response = await fetch('/generate');

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

function updateInnerHTML(elementId, questionTexts, diff, topic) {
    const optionsElement = document.getElementById(elementId);
    optionsElement.innerHTML = '';

    questionTexts.forEach((question, index) => {
        const li = document.createElement('li');
        const label = document.createElement('label');
label.textContent = `Question ${index + 1}: ${question} (Marks: ${diff}) (Topic : ${topic[index]})`;
        li.appendChild(label);
        optionsElement.appendChild(li);
    });
}

async function generateQuestionPaper() {
    try {
        const data = await fetchData();
        if (data.error) {
            console.error('Error generating question paper:', data.error);
            return;
        }

        updateInnerHTML('easyOptions', data.easyQuestionTexts,"5", data.easyQuestionTopic);
        updateInnerHTML('mediumOptions', data.medQuestionTexts, "10", data.medQuestionTopic);
        updateInnerHTML('hardOptions', data.hardQuestionTexts, "15", data.hardQuestionTopic);

    } catch (error) {
        console.error('Error generating question paper:', error.message);
    }
}

document.getElementById('generateBtn').addEventListener('click', generateQuestionPaper);
