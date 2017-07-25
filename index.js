//array of objects with questions and answers
let scoreCount = 0;
let counter = 0;
let displayCounter = counter + 1;

const QUIZ = [
// question one
{ 
  question: "What is the capital city of the United States?",
  answers: [
  "New York, NY",
  "Washington, D.C.",
  "Los Angeles, CA",
  "Chicago, IL"
  ],
  correctAnswerString: "Washington, D.C.",
},
// question two
{ 
  question: "What is the capital city of Spain?",
  answers: [
  "Madrid",
  "Barcelona", 
  "San Sebasti&#225;n", 
  "Pamplona"
  ],
  correctAnswerString: "Madrid",
},
//question three
{ 
  question: "What is the capital city of France?",
  answers: [
  "Marseille",
  "Nice",
  "Avignon",
  "Paris" 
  ],
  correctAnswerString: "Paris",
},
//question four
{ question: "What is the capital city of Japan?",
  answers: [
  "Kyoto",
  "Tokyo",
  "Osaka",
  "Hiroshima"
  ],
  correctAnswerString: "Tokyo",
},
// question five
{ question: "What is the capital city of China?",
  answers: [
  "Sichuan",
  "Shanghai",
  "Beijing",
  "Hainan"
  ],
  correctAnswerString: "Beijing",
},
//question six
{ question: "What is the capital city of Australia?",
  answers: [
  "Canberra",
  "Melbourne",
  "Sydney",
  "Perth"
  ],
  correctAnswerString: "Canberra",
},
//question seven
{ question: "What is the capital city of Uganda?",
  answers: [
  "Lira",
  "Masaka",
  "Kampala",
  "Soroti"
  ],
  correctAnswerString: "Kampala",
},
//question eight
{ question: "What is the capital city of Germany?",
  answers: [
  "Munich",
  "Hamburg",
  "Berlin",
  "Nuremburg"
  ],
  correctAnswerString: "Berlin",
},
//question nine
{ question: "What is the capital city of Chile?",
  answers: [
  "Santa Cruz",
  "Santiago",
  "Puc&#243;n",
  "Limache"
  ],
  correctAnswerString: "Santiago",
},
//question ten
{ question: "What is the capital city of Switzerland?",
  answers: [
  "Bern",
  "Lauterbrunnen",
  "Davos",
  "Burgdorf"
  ],
  correctAnswerString: "Bern",
 }
];


//Click on Start Button to set display of .start-page to none, 
//and set .quiz-questions display:none to visible
function startQuiz() {
  $('.start-button').on('click', function(event) {
    console.log('Hide start page and display questions');
    $('#quiz-questions').removeClass("hide-display");
    $('#start-page').addClass("hide-display");
   $('#quiz-nav').removeClass("hide-display");
  });
}

//Generate questions in a form
// pass in the counter variable
// retrieve the question with the index of the counter variable
// display the question
function generateQuestions(counter) {
  if (counter < 10) {
    let currentQuestion = QUIZ[counter];
    let quizHTML = `
      <form>
      <h1 class="question-one">${currentQuestion.question}</h1>
      <fieldset class="options">
        <input type="radio" name="question-option" id="question-option-one" value="${currentQuestion.answers[0]}">
        <label for="question-option-one">${currentQuestion.answers[0]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-two" value="${currentQuestion.answers[1]}">
        <label for="question-option-two">${currentQuestion.answers[1]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-three" value="${currentQuestion.answers[2]}">
        <label for="question-option-three">${currentQuestion.answers[2]}</label>
        <br><br>
        <input type="radio" name="question-option" id="question-option-four" value="${currentQuestion.answers[3]}">
        <label for="question-option-four">${currentQuestion.answers[3]}</label>
      </fieldset>
      </form> 
      <p>Question: ${counter + 1}/10</p>
      <p>Score: ${scoreCount}/10</p>`;
    $('#quiz-questions').html(quizHTML);
  };
}


//press on answer and receive a correct or wrong message
function answerFeedback (counter) {
  if (counter < 10) {
    let correctAnswer = QUIZ[counter].correctAnswerString;
    $('input[type=radio]').click(function(event) {
      $('.options').children('input').attr('disabled', true); 
      let userAnswer = $(this).val();
      if (userAnswer === correctAnswer) {
        scoreCount += 1;
        $('input[type=radio]:checked').next('label').addClass('correct-answer');
        $('#quiz-questions').append(`<p class='correct-answer'>Correct!</p>`);
      } else {
        $('#quiz-questions').append(`<p class='correct-answer'>Wrong! The correct answer is: ${correctAnswer}</p>`)
        $('input[type=radio]:checked').next('label').addClass('wrong-answer');
      }
    });
  }
}


//prevents Next Button from being clicked on if no option is chosen
function preventClickNextButton () {
  $('.next-button').attr('disabled', true);
  $('.options').children('input').on('click', function () {
     if ($(this).prop("checked") === true) {
      $('.next-button').attr('disabled', false);
      }
    });
}

//Click on Next button to go to next question
function nextQuestionButton () {
  preventClickNextButton();
  $('.next-button').click(function(event) {
    console.log('next button clicked');
    counter += 1;
    generateQuestions(counter);
    answerFeedback(counter);
    preventClickNextButton();
    console.log(counter);
  });
}

//Display final results page
// hide the quiz-questions section
// hide the quiz nav section
function finalFeedback() {
  $('.next-button').on('click', function() {
    if (counter === 10) {
      $('#quiz-questions').addClass('hide-display');
      $('#quiz-nav').addClass("hide-display");
      $('.feedback-page').removeClass('hide-display');
      $('.final-score').append(`You got ${scoreCount}/10 questions right!`)
    }
  });
}

//Click on Try Again button to reset the quiz
function tryAgain() {
  $('.try-again-button').on('click', function() {
    document.location.reload();
  });
}


function renderQuiz() {
  startQuiz();
  generateQuestions(counter);
  answerFeedback(counter);
  nextQuestionButton();
  finalFeedback();
  tryAgain();
}

$(renderQuiz);