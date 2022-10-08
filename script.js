//Dados Inicias:
let currentQuestion = 0;
let correctAnswer = 0;

//Eventos:
document.querySelector('.scoreArea button').addEventListener('click', resetar);
document.querySelector('.iniciar button').addEventListener('click', startTest);

//Funções:
function showQuestion() {
    if(questions[currentQuestion]){
        let q = questions[currentQuestion];
        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`

        document.querySelector('.scoreArea').style.display = 'none';
        document.querySelector('.questionArea').style.display = 'block';
        document.querySelector('.question').innerHTML = q.question;//Eixibir a questão.
        
        let optionsHtml = '';
        for(let i in q.options) {
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+1}</span>${q.options[i]}</div>` //parseInt Transforma uma String em um Number.
        }
        document.querySelector('.options').innerHTML = optionsHtml;

        document.querySelectorAll('.options .option').forEach(item=>{
            item.addEventListener('click', optionClickEvent);
        });
    }else{
        finishQuiz();
    };
};

function optionClickEvent(e) {
    let clickedOption = parseInt(e.target.getAttribute('data-op'));
    if(questions[currentQuestion].answer === clickedOption) {
        correctAnswer ++;
    };

    currentQuestion ++;
    showQuestion();
};

function finishQuiz() {
    let points = Math.floor((correctAnswer / questions.length) * 100);
    if(points < 30) {
        document.querySelector('.scoreText1').innerHTML = 'Ta ruim em? Assita mais um pouco e tente novamente!';
        document.querySelector('.scorePct').style.color = 'red';
        document.querySelector('.prizeImage').src = 'images/theOffice errou.gif'; 
    }else if (points >= 30 && points < 70) {
        document.querySelector('.scoreText1').innerHTML = 'Muito bom! Você é um fã mediano de The Office';
        document.querySelector('.scorePct').style.color = 'yellow';
        document.querySelector('.prizeImage').src = 'images/theOffice acertos.gif'; 
    }else if (points >=70) {
        document.querySelector('.scoreText1').innerHTML = 'Parabéns! Você definitivamente sabe tudo sobre The Office!';
        document.querySelector('.scorePct').style.color = '#0D630D';
        document.querySelector('.prizeImage').style.width = '40%';
        document.querySelector('.prizeImage').src = 'images/theOffice medio.gif'; 
    };


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`
    document.querySelector('.scoreText2').innerHTML = `Você acertou ${correctAnswer} de ${questions.length} questões`
    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = `100%`;
};

function resetar() {
     currentQuestion = 0;
     correctAnswer = 0;
     showQuestion();
}

function startTest() {
    document.querySelector('.iniciar').style.display = 'none';
    currentQuestion = 0;
     correctAnswer = 0;
     showQuestion();
     
}