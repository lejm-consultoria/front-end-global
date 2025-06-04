// ELEMENTOS DO MENU HAMBURGER PARA TODAS AS PÁGINAS
document.addEventListener('DOMContentLoaded', () => {
  function configurarHamburger(hamburgerId, navLinksId) {
    const hamburger = document.getElementById(hamburgerId);
    const navLinks = document.getElementById(navLinksId);

    if (!hamburger || !navLinks) return;

    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
      });
    });
  }

  configurarHamburger('hamburger-btn', 'nav-links');
  configurarHamburger('hamburger-btn-quiz', 'nav-links-quiz');
  configurarHamburger('hamburger-btn-contato', 'nav-links-contato');
  configurarHamburger('hamburger-btn-sobre', 'nav-links-sobre');
  configurarHamburger('hamburger-btn-blog', 'nav-links-blog');

  /* ------------------------------------------------------
     VALIDAÇÃO DO FORMULÁRIO DE CONTATO
     ------------------------------------------------------ */
  const form = document.getElementById('contact-form');
  if (form) {
    const nomeInput = document.getElementById('nome');
    const emailInput = document.getElementById('email');
    const telefoneInput = document.getElementById('telefone');
    const interesseSelect = document.getElementById('interesse');
    const mensagemInput = document.getElementById('mensagem');

    const errorNome = document.getElementById('error-nome');
    const errorEmail = document.getElementById('error-email');
    const errorTelefone = document.getElementById('error-telefone');
    const errorInteresse = document.getElementById('error-interesse');
    const errorMensagem = document.getElementById('error-mensagem');
    const successMsg = document.getElementById('form-success');

    function validarEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(String(email).toLowerCase());
    }

    function showError(element, mensagem) {
      element.innerText = mensagem;
      element.previousElementSibling.classList.add('input-error');
    }

    function clearError(element) {
      element.innerText = '';
      if (element.previousElementSibling) {
        element.previousElementSibling.classList.remove('input-error');
      }
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let isValid = true;

      if (nomeInput.value.trim().length < 3) {
        showError(errorNome, 'Digite ao menos 3 caracteres.');
        isValid = false;
      } else {
        clearError(errorNome);
      }

      if (!validarEmail(emailInput.value.trim())) {
        showError(errorEmail, 'E-mail inválido.');
        isValid = false;
      } else {
        clearError(errorEmail);
      }

      const telefoneVal = telefoneInput.value.trim();
      if (!/^\d{10,11}$/.test(telefoneVal)) {
        showError(errorTelefone, 'Digite somente números (10-11 dígitos).');
        isValid = false;
      } else {
        clearError(errorTelefone);
      }

      if (!interesseSelect.value) {
        showError(errorInteresse, 'Selecione uma opção válida.');
        isValid = false;
      } else {
        clearError(errorInteresse);
      }

      if (mensagemInput.value.trim().length < 10) {
        showError(errorMensagem, 'Digite ao menos 10 caracteres.');
        isValid = false;
      } else {
        clearError(errorMensagem);
      }

      if (isValid) {
        successMsg.classList.remove('hidden');
        setTimeout(() => {
          successMsg.classList.add('hidden');
          form.reset();
        }, 3000);
      }
    });
  }

  /* ------------------------------------------------------
     LÓGICA DO QUIZ INTERATIVO
     ------------------------------------------------------ */
  const quizBox = document.getElementById('quiz-box');
  const resultBox = document.getElementById('result-box');
  const questionText = document.getElementById('question-text');
  const answersContainer = document.getElementById('answers-container');
  const nextButton = document.getElementById('next-btn');
  const retryButton = document.getElementById('retry-btn');
  const progressBar = document.getElementById('progress');
  const scoreText = document.getElementById('score-text');
  const resultMsg = document.getElementById('result-msg');

  const questions = [
    {
      question: "Por que pavimentos convencionais agravam enchentes?",
      answers: [
        { text: "Não absorvem água, gerando escoamento excessivo.", correct: true },
        { text: "São muito caros para instalar.", correct: false },
        { text: "São muito escorregadios.", correct: false },
        { text: "Têm pouca durabilidade.", correct: false }
      ]
    },
    {
      question: "Qual material remove metais pesados do escoamento?",
      answers: [
        { text: "Areia grossa.", correct: false },
        { text: "Carvão ativado.", correct: true },
        { text: "Concreto convencional.", correct: false },
        { text: "Asfalto comum.", correct: false }
      ]
    },
    {
      question: "Para que serve a camada biológica no sistema Foylabo?",
      answers: [
        { text: "Decorar o reservatório.", correct: false },
        { text: "Favorecer a biorremediação de nutrientes.", correct: true },
        { text: "Reduzir o peso do pavimento.", correct: false },
        { text: "Proteção contra raios UV.", correct: false }
      ]
    },
    {
      question: "Como parte da água pode ser usada após tratamento?",
      answers: [
        { text: "Geração de energia eólica.", correct: false },
        { text: "Irrigação de hortas urbanas.", correct: true },
        { text: "Combustível para veículos.", correct: false },
        { text: "Filtração para produzir petróleo sintético.", correct: false }
      ]
    },
    {
      question: "Qual é o principal objetivo do Foylabo?",
      answers: [
        { text: "Aumentar a velocidade de tráfego.", correct: false },
        { text: "Maximizar o lucro de empresas de drenagem.", correct: false },
        { text: "Reduzir enchentes e gerar água reutilizável.", correct: true },
        { text: "Construir arranha-céus em áreas alagadiças.", correct: false }
      ]
    },
    {
      question: "O que acontece com a água que excede a capacidade dos tanques?",
      answers: [
        { text: "É enviada a reservatórios municipais já existentes.", correct: true },
        { text: "É descartada em rios sem tratamento.", correct: false },
        { text: "Evapora imediatamente.", correct: false },
        { text: "Se transforma em vapor de água pura.", correct: false }
      ]
    }
  ];

  let currentQuestionIndex = 0;
  let score = 0;

  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    resultBox.classList.add('hidden');
    quizBox.classList.remove('hidden');
    showQuestion();
  }

  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;

    currentQuestion.answers.forEach((ans, idx) => {
      const button = document.createElement('button');
      button.classList.add('answer-btn');
      button.textContent = ans.text;
      button.dataset.correct = ans.correct;
      button.addEventListener('click', selectAnswer);
      answersContainer.appendChild(button);
    });

    const progressPercent = ((currentQuestionIndex) / questions.length) * 100;
    progressBar.style.width = `${progressPercent}%`;
    nextButton.classList.add('hidden');
  }

  function resetState() {
    nextButton.classList.add('hidden');
    while (answersContainer.firstChild) {
      answersContainer.removeChild(answersContainer.firstChild);
    }
  }

  function selectAnswer(e) {
    const selectedBtn = e.target;
    const correct = selectedBtn.dataset.correct === 'true';

    if (correct) {
      score++;
      selectedBtn.classList.add('selected');
    } else {
      selectedBtn.classList.add('selected');
    }

    Array.from(answersContainer.children).forEach(button => {
      button.disabled = true;
    });

    nextButton.classList.remove('hidden');
  }

  nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
      showQuestion();
    } else {
      showResult();
    }
  });

  function showResult() {
    quizBox.classList.add('hidden');
    resultBox.classList.remove('hidden');
    scoreText.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
    const percent = Math.round((score / questions.length) * 100);
    if (percent >= 80) {
      resultMsg.textContent = "Excelente! Você conhece bem o tema.";
    } else if (percent >= 50) {
      resultMsg.textContent = "Bom, mas ainda há informação a aprender.";
    } else {
      resultMsg.textContent = "Esse é um ótimo começo! Continue estudando.";
    }
  }

  retryButton.addEventListener('click', startQuiz);

  if (quizBox) {
    startQuiz();
  }
  
  const heroInfo = document.querySelector('.hero .hero-content');
  if (heroInfo && window.location.pathname.endsWith('index.html')) {
    fetch('https://api.open-meteo.com/v1/forecast?latitude=-23.55&longitude=-46.633&hourly=precipitation')
      .then(response => response.json())
      .then(data => {
        const chuva = data.hourly.precipitation[0];
        const aviso = document.createElement('p');
        aviso.textContent = `Prec. atual em SP: ${chuva} mm/h.`;
        aviso.style.marginTop = '1rem';
        aviso.style.fontSize = '0.9rem';
        aviso.style.color = 'var(--cor-preto)';
        heroInfo.appendChild(aviso);
      })
      .catch(err => {
        console.error('Erro ao buscar dados meteorológicos:', err);
      });
  }
  
});
