const quizData = [
  {
    question: "How old are you ?",
    a: "10",
    b: "15",
    c: "23",
    d: "25",
    correct: "c",
  },
  {
    question: "Which is best chips company ?",
    a: "kurkure",
    b: "lays",
    c: "parle",
    d: "pingles",
    correct: "b",
  },
  {
    question: "Best earphone company ?",
    a: "AKG",
    b: "herman",
    c: "sennheiser",
    d: "skullcandy",
    correct: "c",
  },
  {
    question: "Which is best tech company ?",
    a: "apple",
    b: "microsoft",
    c: "google",
    d: "amazon",
    correct: "a",
  },
  {
    question: "Best programming language ?",
    a: "JS",
    b: "HTML",
    c: "C++",
    d: "Python",
    correct: "a",
  },
];

const questionElem = document.getElementById('question')
const a_text = document.getElementById('a_text') 
const b_text = document.getElementById('b_text')
const c_text = document.getElementById('c_text')
const d_text = document.getElementById('d_text')


let currentQuestion = 0
let selectedAns;
    
loadQuiz()
function loadQuiz() {

    questionElem.innerText = quizData[currentQuestion].question
    a_text.innerHTML = quizData[currentQuestion].a
    b_text.innerHTML = quizData[currentQuestion].b;
    c_text.innerHTML = quizData[currentQuestion].c;
    d_text.innerHTML = quizData[currentQuestion].d;
};

function getSelectedAnswers() {
    const allAns = document.querySelectorAll('.selectedanswer')
    allAns.forEach((ans) => {
        if (ans.checked) {
            selectedAns = ans.id
        }
    });

    if (selectedAns == quizData[currentQuestion].correct) {
        alert("🥳 Wohoo! 🎉🎉");
        deSelectAns();
        return true
    } 
    else {
        alert('😥 50rupay kaat iska!');
        return false
    }
  
}

function deSelectAns() {
    const allAns = document.querySelectorAll(".selectedanswer");
    allAns.forEach((ans) => {
        ans.checked = false
    });
}

function nextQuestion() {
    
    if (getSelectedAnswers()) {
        currentQuestion++;
    };
  
    if (currentQuestion < quizData.length) {
        loadQuiz();
    } else {
        const final = (document.getElementById("quiz")
            .innerHTML = `<img src=\./final.jpg\ width=\"600px"\ height=\"300px"\">
            <button class="btn" onclick="location.reload()">RePlay</button>
            `);
    }
   
}