const $startGameButton = document.querySelector(".start-quiz")
const $nextQuestionButton = document.querySelector(".next-question")
const $questionsContainer = document.querySelector(".questions-container")
const $questionText = document.querySelector(".question")
const $answersContainer = document.querySelector(".answers-container")
const $answers = document.querySelectorAll(".answer")

let currentQuestionIndex = 0
let totalCorrect = 0

$startGameButton.addEventListener("click", startGame)
$nextQuestionButton.addEventListener("click", displayNextQuestion)

function startGame() {
  $startGameButton.classList.add("hide")
  $questionsContainer.classList.remove("hide")
  displayNextQuestion()
}

function displayNextQuestion() {
  resetState()
  
  if (questions.length === currentQuestionIndex) {
    return finishGame()
  }

  $questionText.textContent = questions[currentQuestionIndex].question
  questions[currentQuestionIndex].answers.forEach(answer => {
    const newAsnwer = document.createElement("button")
    newAsnwer.classList.add("button", "answer")
    newAsnwer.textContent = answer.text
    if (answer.correct) {
      newAsnwer.dataset.correct = answer.correct
    }
    $answersContainer.appendChild(newAsnwer)

    newAsnwer.addEventListener("click", selectAnswer)
  })
}

function resetState() {
  while($answersContainer.firstChild) {
    $answersContainer.removeChild($answersContainer.firstChild)
  }

  document.body.removeAttribute("class")
  $nextQuestionButton.classList.add("hide")
}

function selectAnswer(event) {
  const answerClicked = event.target

  if (answerClicked.dataset.correct) {
    document.body.classList.add("correct")
    totalCorrect++
  } else {
    document.body.classList.add("incorrect") 
  }

  document.querySelectorAll(".answer").forEach(button => {
    button.disabled = true

    if (button.dataset.correct) {
      button.classList.add("correct")
    } else {
      button.classList.add("incorrect")
    }
  })
  
  $nextQuestionButton.classList.remove("hide")
  currentQuestionIndex++
}

function finishGame() {
  const totalQuestions = questions.length
  const performance = Math.floor(totalCorrect * 100 / totalQuestions)
  
  let message = ""

  switch (true) {
    case (performance >= 90):
      message = "Excelente :)"
      break
    case (performance >= 70):
      message = "Muito bom :)"
      break
    case (performance >= 50):
      message = "Bom"
      break
    default:
      message = "Pode melhorar :("
  }

  $questionsContainer.innerHTML = 
  `
    <p class="final-message">
      Você acertou ${totalCorrect} de ${totalQuestions} questões!
      <span>Resultado: ${message}</span>
    </p>
    <button 
      onclick=window.location.reload() 
      class="button"
    >
      Refazer teste
    </button>
  `
}


const questions = [
  {
    question: "1) No território brasileiro, a ausência de cadeias montanhosas explica-se:",
    answers: [
      { text: "a) pela pouca atuação dos agentes externos de transformação do relevo", correct: false },
      { text: "b) pela ausência de dobramentos modernos", correct: true },
      { text: "c) pelas intensas atuações do tectonismo", correct: false },
      { text: "d) pelo escasseamento dos depósitos sedimentares", correct: false }
    ]
  },
  {
    question: "2) A estrutura geológica do Brasil é basicamente constituída por crátons (ou escudos cristalinos e maciços antigos) e bacias sedimentares. Essas últimas são predominantes, ocupando cerca de 60% do território, o que pode indicar:",
    answers: [
      { text: "a) uma boa disponibilidade de combustíveis fósseis", correct: true },
      { text: "b) a predominância de áreas de planície", correct: false },
      { text: "c) a ausência de depressões relativas", correct: false },
      { text: "d) uma acentuada amplitude altimétrica", correct: false }
    ]
  },
  {
    question: "3) (Uma cratera em um terreno no Bairro Cidade Jardim em Uberlândia preocupa os moradores da região. O problema é causado por uma erosão que ameaça a estrutura de algumas casas na Rua dos Jasmins e é agravado com a proximidade do Córrego do Óleo (...). A Prefeitura de Uberlândia informou que um estudo foi feito para solucionar o problema.) A causa provável do problema ambiental apresentado, conforme as informações disponíveis na reportagem, está associada a uma combinação entre:",
    answers: [
      { text: "a) ocupação de encostas e saturação do solo", correct: false },
      { text: "b) intemperismo superficial e intensidade das chuvas", correct: false },
      { text: "c) urbanização de reservas ambientais e ação erosiva dos ventos", correct: false },
      { text: "d) remoção da cobertura vegetal e erosão fluvial", correct: true }
    ]
  },
  {
    question: '4) Qual é a formação geológica predominante no Brasil?',
    answers: [
      { text: 'a) A formação geológica predominante no Brasil é de origem vulcânica.', correct: false },
      { text: 'b) A formação geológica predominante no Brasil é de origem sedimentar.', correct: false },
      { text: 'c) A formação geológica predominante no Brasil é de origem metamórfica.', correct: false },
      { text: 'd) A formação geológica predominante no Brasil é de origem granítica', correct: true },
    ]
  },
  {
    question: '5) Qual é a maior bacia hidrográfica do Brasil em extensão territorial?',
    answers: [
      { text: 'a) A maior bacia hidrográfica do Brasil em extensão territorial é a Bacia do Rio Tietê.', correct: false },
      { text: 'b) A maior bacia hidrográfica do Brasil em extensão territorial é a Bacia do Rio Amazonas.', correct: false },
      { text: 'c) A maior bacia hidrográfica do Brasil em extensão territorial é a Bacia do Rio São Francisco.', correct: true },
      { text: 'd) A maior bacia hidrográfica do Brasil em extensão territorial é a Bacia do Rio Paraná', correct: false }
    ]
  },
  {
    question: '6) Quais são as principais formas de relevo encontradas no Brasil?',
    answers: [
      { text: 'As principais formas de relevo encontradas no Brasil são planícies costeiras.', correct: false },
      { text: 'As principais formas de relevo encontradas no Brasil são serras e montanhas', correct: true },
      { text: 'As principais formas de relevo encontradas no Brasil são planaltos.', correct: false },
      { text: ' As principais formas de relevo encontradas no Brasil são desertos.', correct: false }
    ]
  },
  {
    question: '7) Quais são os principais tipos de planaltos encontrados no Brasil?',
    answers: [
      { text: ' Pampas e campos sulinos', correct: true },
      { text: ' Serras e montanhas', correct: false },
      { text: '  Planícies costeiras', correct: false },
      { text: ' Vales fluviais', correct: false },
    ]
  },
]