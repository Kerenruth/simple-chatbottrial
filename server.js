const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// --- MINI AI BRAIN --- //
const knowledgeBase = [
  { question: "What is CBC?", answer: "CBC stands for Competency-Based Curriculum, which focuses on skills and abilities of learners in Kenya." },
  { question: "What is KCSE?", answer: "KCSE stands for Kenya Certificate of Secondary Education. It is the exam taken at the end of secondary school." },
  { question: "When do KCPE exams start?", answer: "KCPE exams usually start around late October or early November every year." },
  { question: "How many years are in primary school in Kenya?", answer: "Primary school in Kenya typically lasts 8 years under the 8-4-4 system, but CBC uses 6 years." },
  { question: "Who manages education in Kenya?", answer: "The Ministry of Education manages education in Kenya." },
  // You can add more Q&A here later!
];
function getBotResponse(userMessage) {
    const keywords = [
      { keyword: "cbc", answer: "CBC stands for Competency Based Curriculum..." },
      { keyword: "kcse", answer: "KCSE is the Kenya Certificate of Secondary Education..." },
      { keyword: "kcpe", answer: "KCPE is the Kenya Certificate of Primary Education..." },
      { keyword: "tsc", answer: "TSC is the Teachers Service Commission..." },
      { keyword: "university", answer: "Kenya has many public and private universities..." },
      { keyword: "knec", answer: "KNEC is the Kenya National Examination Council..." }
    ];
  
    const cleanedMessage = userMessage.toLowerCase();
  
    for (let pair of keywords) {
      if (cleanedMessage.includes(pair.keyword)) {
        return pair.answer;
      }
    }
  
    return "I'm sorry, I don't know the answer to that yet. Please ask another question!";
  }
  

// --- MINI AI MATCHING FUNCTION --- //
function findBestAnswer(userQuestion) {
  userQuestion = userQuestion.toLowerCase();
  
  // Simple search: find the first question that matches keywords
  for (let pair of knowledgeBase) {
    if (userQuestion.includes(pair.question.toLowerCase().split(" ")[1])) {
      return pair.answer;
    }
  }
  
  // If no match found
  return "I'm sorry, I don't know the answer to that yet!";
}

// --- ROUTES --- //
app.get('/', (req, res) => {
  res.send('Kenyan Education Chatbot API is running.');
});

app.post('/chat', (req, res) => {
  const userMessage = req.body.message;
  const botResponse = findBestAnswer(userMessage);
  
  res.json({ response: botResponse });
});

// --- START SERVER --- //
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
