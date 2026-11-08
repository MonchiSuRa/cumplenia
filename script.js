/**
 * LÓGICA PRINCIPAL DEL JUEGO
 */

document.addEventListener('DOMContentLoaded', () => {
  // Elementos DOM de Pantallas
  const screenStart = document.getElementById('screen-start');
  const screenQuiz = document.getElementById('screen-quiz');
  const screenPrize = document.getElementById('screen-prize');
  const screenConfirm = document.getElementById('screen-confirm');
  const screenCatch = document.getElementById('screen-catch');
  const screenReveal = document.getElementById('screen-reveal');

  // Pantalla de Inicio
  const startTitle = document.getElementById('start-title');
  const startDesc = document.getElementById('start-desc');
  const btnStart = document.getElementById('btn-start');

  // Pantalla de Quiz
  const questionIndicator = document.getElementById('question-indicator');
  const scoreCounter = document.getElementById('score-counter');
  const progressBar = document.getElementById('progress-bar');
  const questionText = document.getElementById('question-text');
  const optionsContainer = document.getElementById('options-container');
  const feedbackMessage = document.getElementById('feedback-message');

  // Pantalla de Premio
  const giftWrapper = document.getElementById('gift-wrapper');
  const btnOpenGift = document.getElementById('btn-open-gift');
  const btnGiftText = document.getElementById('btn-gift-text');

  // Pantallas de Confirmación ("¿Estás segura?")
  const confirmEmoji = document.getElementById('confirm-emoji');
  const confirmTitle = document.getElementById('confirm-title');
  const confirmSubtitle = document.getElementById('confirm-subtitle');
  const btnConfirmNext = document.getElementById('btn-confirm-next');
  const confirmBtnText = document.getElementById('confirm-btn-text');

  // Pantalla de Botón Escurridizo
  const catchEmoji = document.getElementById('catch-emoji');
  const catchTitle = document.getElementById('catch-title');
  const catchSubtitle = document.getElementById('catch-subtitle');
  const catchStatus = document.getElementById('catch-status');
  const btnMovingTarget = document.getElementById('btn-moving-target');
  const catchBtnText = document.getElementById('catch-btn-text');
  const catchArena = document.getElementById('catch-arena');

  // Pantalla de Revelación
  const revealTitle = document.getElementById('reveal-title');
  const revealSubtitle = document.getElementById('reveal-subtitle');
  const revealParagraphs = document.getElementById('reveal-paragraphs');
  const revealDedication = document.getElementById('reveal-dedication');
  const btnAccept = document.getElementById('btn-accept');
  const btnRestart = document.getElementById('btn-restart');

  // Estado del juego
  let currentQuestionIndex = 0;
  let correctCount = 0;
  let isAnsweringBlocked = false;

  let confirmStep = 0;
  let catchMoveInterval = null;
  let catchPauseTimeout = null;
  let catchGiveUpTimeout = null;   // ⏱ temporizador de 2 minutos
  let isCatchPaused = false;
  let isCatchOver = false;         // 🏳 bandera cuando se agotó el tiempo
  let catchMoveCount = 0;

  const questions = QUIZ_CONFIG.preguntas || [];
  const totalQuestions = questions.length;
  const letters = ['A', 'B', 'C', 'D'];

  const confirmSteps = QUIZ_CONFIG.pantallasConfirmacion || [
    {
      emoji: "🤔",
      titulo: "¿Estás segura que quieres ver tu regalo?",
      subtitulo: "Una vez que lo veas no habrá marcha atrás...",
      textoBoton: "¡Sí, estoy segurísima! ➔"
    },
    {
      emoji: "👀",
      titulo: "¿10000% segura?",
      subtitulo: "Piénsalo bien, ¿de verdad estás lista?",
      textoBoton: "¡Que sí, 10000% segura! ➔"
    },
    {
      emoji: "😏",
      titulo: "Mmm... no te siento muy segura...",
      subtitulo: "Tus clics dudan un poco... ¿segura que no quieres esperar?",
      textoBoton: "¡Cero dudas, muéstramelo ya! ➔"
    },
    {
      emoji: "😅",
      titulo: "Bueno, ¿en serio estás segura?",
      subtitulo: "¡Última oportunidad para pensarlo dos veces!",
      textoBoton: "¡SÍIIII, YA DÁMELO! ➔"
    }
  ];

  const catchConfig = QUIZ_CONFIG.pantallaEscurridiza || {
    emoji: "🏃‍♂️💨",
    titulo: "¡Veamos si realmente quieres ver tu sorpresa!",
    subtitulo: "¡Atrápalo si de verdad lo quieres ver!",
    textoBoton: "🎁 ¡DAME MI REGALO!"
  };

  // 1. Inicializar Textos desde la configuración
  function initConfig() {
    if (QUIZ_CONFIG.titulo) startTitle.textContent = QUIZ_CONFIG.titulo;
    if (QUIZ_CONFIG.subtitulo) startDesc.textContent = QUIZ_CONFIG.subtitulo;
    if (QUIZ_CONFIG.textoBotonPremio) btnGiftText.textContent = QUIZ_CONFIG.textoBotonPremio;

    if (QUIZ_CONFIG.mensajeFinal) {
      if (QUIZ_CONFIG.mensajeFinal.tituloPrincipal) {
        revealTitle.textContent = QUIZ_CONFIG.mensajeFinal.tituloPrincipal;
      }
      if (QUIZ_CONFIG.mensajeFinal.subtitulo) {
        revealSubtitle.textContent = QUIZ_CONFIG.mensajeFinal.subtitulo;
      }
      if (QUIZ_CONFIG.mensajeFinal.dedicatoria) {
        revealDedication.textContent = QUIZ_CONFIG.mensajeFinal.dedicatoria;
      }
      if (Array.isArray(QUIZ_CONFIG.mensajeFinal.parrafos)) {
        revealParagraphs.innerHTML = QUIZ_CONFIG.mensajeFinal.parrafos
          .map(p => `<p>${p}</p>`)
          .join('');
      }
    }
  }

  // 2. Transición entre pantallas
  function switchScreen(activeScreen) {
    // Si salimos de la pantalla catch, limpiamos TODO el movimiento
    if (activeScreen !== screenCatch) {
      stopCatchMovement();
      isCatchOver = false;
    }

    [screenStart, screenQuiz, screenPrize, screenConfirm, screenCatch, screenReveal].forEach(screen => {
      screen.classList.remove('active');
    });
    activeScreen.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // 3. Comenzar Quiz
  function startQuiz() {
    currentQuestionIndex = 0;
    correctCount = 0;
    scoreCounter.textContent = `Aciertos: 0`;
    switchScreen(screenQuiz);
    loadQuestion();
  }

  // 4. Cargar una pregunta
  function loadQuestion() {
    isAnsweringBlocked = false;
    feedbackMessage.textContent = '';
    feedbackMessage.className = 'feedback-toast';

    const currentQ = questions[currentQuestionIndex];
    questionIndicator.textContent = `Pregunta ${currentQuestionIndex + 1} de ${totalQuestions}`;
    const progressPercent = ((currentQuestionIndex) / totalQuestions) * 100;
    progressBar.style.width = `${progressPercent}%`;

    questionText.textContent = currentQ.pregunta;
    optionsContainer.innerHTML = '';

    currentQ.opciones.forEach((opcion, index) => {
      const button = document.createElement('button');
      button.className = 'option-btn';
      button.dataset.index = index;

      const letterBadge = document.createElement('span');
      letterBadge.className = 'option-letter';
      letterBadge.textContent = letters[index] || (index + 1);

      const optionLabel = document.createElement('span');
      optionLabel.className = 'option-text';
      optionLabel.textContent = opcion;

      button.appendChild(letterBadge);
      button.appendChild(optionLabel);

      button.addEventListener('click', () => handleOptionClick(index, button, currentQ.correcta));
      optionsContainer.appendChild(button);
    });
  }

  // 5. Manejar click en opción
  function handleOptionClick(selectedIndex, buttonElement, correctIndex) {
    if (isAnsweringBlocked || buttonElement.classList.contains('disabled')) return;

    if (selectedIndex === correctIndex) {
      // RESPUESTA CORRECTA
      isAnsweringBlocked = true;
      buttonElement.classList.add('correct');
      feedbackMessage.textContent = '¡Correcto! Excelente deducción ✨';
      feedbackMessage.className = 'feedback-toast correct';

      correctCount++;
      scoreCounter.textContent = `Aciertos: ${correctCount}`;

      // Deshabilitar todas las opciones temporalmente
      const allButtons = optionsContainer.querySelectorAll('.option-btn');
      allButtons.forEach(btn => btn.classList.add('disabled'));

      // Efecto suave de confeti pequeño
      fireSmallConfetti();

      setTimeout(() => {
        currentQuestionIndex++;
        if (currentQuestionIndex < totalQuestions) {
          loadQuestion();
        } else {
          // Completó todas las preguntas con éxito
          finishQuiz();
        }
      }, 1000);

    } else {
      // RESPUESTA INCORRECTA
      buttonElement.classList.add('wrong');
      feedbackMessage.textContent = '¡Ups! Esa no es, pero no te preocupes, ¡intenta de nuevo! 💡';
      feedbackMessage.className = 'feedback-toast wrong';

      // Permitir que vuelva a intentar con otra opción tras un momento
      setTimeout(() => {
        buttonElement.classList.add('disabled');
      }, 400);
    }
  }

  // 6. Finalizar Quiz y mostrar pantalla de premio
  function finishQuiz() {
    progressBar.style.width = '100%';
    switchScreen(screenPrize);
    fireCelebrationConfetti();
  }

  // 7. Iniciar secuencia de Confirmación ("¿Estás segura?")
  function startConfirmationFlow() {
    confirmStep = 0;
    renderConfirmStep();
    switchScreen(screenConfirm);
  }

  function renderConfirmStep() {
    const step = confirmSteps[confirmStep];
    confirmEmoji.textContent = step.emoji || "🤔";
    confirmTitle.textContent = step.titulo;
    confirmSubtitle.textContent = step.subtitulo;
    confirmBtnText.textContent = step.textoBoton;

    // Pequeña animación de entrada
    screenConfirm.classList.remove('active');
    void screenConfirm.offsetWidth; // Forzar reflow
    screenConfirm.classList.add('active');
  }

  function handleConfirmNext() {
    confirmStep++;
    if (confirmStep < confirmSteps.length) {
      renderConfirmStep();
    } else {
      // Pasó todas las preguntas de "¿estás segura?", ahora viene el botón escurridizo
      startCatchFlow();
    }
  }

  // 8. Pantalla del Botón Escurridizo ("Atrápame si puedes")
  function startCatchFlow() {
    switchScreen(screenCatch);

    catchEmoji.textContent = catchConfig.emoji || "🏃‍♂️💨";
    catchTitle.textContent = catchConfig.titulo || "¡Veamos si realmente quieres ver tu sorpresa!";
    catchSubtitle.textContent = catchConfig.subtitulo || "¡Atrápalo si de verdad lo quieres ver!";
    catchBtnText.textContent = catchConfig.textoBoton || "🎁 ¡DAME MI REGALO!";

    catchStatus.textContent = "🏃‍♂️ ¡Se está moviendo! ¡Atenta!";
    catchStatus.classList.remove('stopped');

    isCatchPaused = false;
    catchMoveCount = 0;
    isCatchOver = false;

    btnMovingTarget.classList.remove('paused');

    // Colocar el botón en el centro del arena al inicio
    // Esperar un frame para que el layout ya se haya renderizado
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        btnMovingTarget.style.pointerEvents = 'none'; // 🚫 empieza bloqueado
        moveButtonToRandomPos();
        startCatchMovement();

        // ⏱ Si en 2 minutos no lo atrapa, rendición piadosa
        catchGiveUpTimeout = setTimeout(() => {
          giveUpCatch();
        }, 2 * 60 * 1000);
      });
    });
  }

  function getArenaAndBtnSizes() {
    const arena = document.getElementById('catch-arena');
    if (!arena) return null;
    const arenaW = arena.clientWidth  || 500;
    const arenaH = arena.clientHeight || 240;
    // Si el botón todavía no tiene dimensiones (primer frame), usamos estimados fijos
    const btnW = btnMovingTarget.offsetWidth  || 200;
    const btnH = btnMovingTarget.offsetHeight || 58;
    return { arenaW, arenaH, btnW, btnH };
  }

  function moveButtonToRandomPos() {
    const sizes = getArenaAndBtnSizes();
    if (!sizes) return;
    const { arenaW, arenaH, btnW, btnH } = sizes;

    const pad = 8;
    const maxLeft = Math.max(pad, arenaW - btnW - pad);
    const maxTop  = Math.max(pad, arenaH - btnH - pad);

    const randLeft = Math.floor(Math.random() * (maxLeft - pad + 1)) + pad;
    const randTop  = Math.floor(Math.random() * (maxTop  - pad + 1)) + pad;

    btnMovingTarget.style.left = randLeft + 'px';
    btnMovingTarget.style.top  = randTop  + 'px';
    btnMovingTarget.style.transform = 'none';
  }

  function startCatchMovement() {
    stopCatchMovement();
    // Mueve cada 420ms — velocidad rápida
    catchMoveInterval = setInterval(() => {
      if (isCatchPaused) return;

      moveButtonToRandomPos();
      catchMoveCount++;

      // Cada 7 movimientos se pausa (más tiempo en rojo, más difícil)
      if (catchMoveCount % 7 === 0) {
        pauseCatchMovement();
      }
    }, 420);
  }

  function pauseCatchMovement() {
    isCatchPaused = true;
    btnMovingTarget.classList.add('paused');
    btnMovingTarget.style.pointerEvents = 'auto'; // ✅ solo aquí se puede hacer clic
    catchStatus.textContent = "🛑 ¡SE DETUVO! ¡HAZ CLIC RÁPIDO! 🛑";
    catchStatus.classList.add('stopped');

    catchPauseTimeout = setTimeout(() => {
      isCatchPaused = false;
      btnMovingTarget.classList.remove('paused');
      btnMovingTarget.style.pointerEvents = 'none'; // 🚫 en movimiento no se puede clickear
      catchStatus.textContent = "🏃‍♂️ ¡Se está moviendo! ¡Atenta!";
      catchStatus.classList.remove('stopped');
    }, 500); // ⏱ 0.5 segundos parado
  }

  function stopCatchMovement() {
    if (catchMoveInterval) {
      clearInterval(catchMoveInterval);
      catchMoveInterval = null;
    }
    if (catchPauseTimeout) {
      clearTimeout(catchPauseTimeout);
      catchPauseTimeout = null;
    }
    if (catchGiveUpTimeout) {
      clearTimeout(catchGiveUpTimeout);
      catchGiveUpTimeout = null;
    }
    btnMovingTarget.classList.remove('paused');
    btnMovingTarget.style.pointerEvents = 'none';
    isCatchPaused = false;
  }

  // 🏳 Rendición piadosa: se acabó el tiempo, el botón queda quieto y clickeable
  function giveUpCatch() {
    if (isCatchOver) return;
    isCatchOver = true;

    // Parar todo movimiento
    if (catchMoveInterval) { clearInterval(catchMoveInterval); catchMoveInterval = null; }
    if (catchPauseTimeout) { clearTimeout(catchPauseTimeout);  catchPauseTimeout = null; }

    // Dejar el botón quieto en el centro y clickeable
    btnMovingTarget.style.left      = '50%';
    btnMovingTarget.style.top       = '50%';
    btnMovingTarget.style.transform = 'translate(-50%, -50%)';
    btnMovingTarget.classList.add('paused');
    btnMovingTarget.style.pointerEvents = 'auto';

    // Mensaje divertido y piadoso
    catchStatus.classList.add('stopped');
    catchStatus.textContent = "😂 ¡Las señoras mayores son lentas! Ya está quieto, dale clic 👆";
    catchTitle.textContent   = "😅 Bueno... te lo dejo quieto...";
    catchSubtitle.textContent = "¡No te lo mereces pero igual te quiero! 😂💖";
  }

  // 9. Clic en el botón atrapado -> Revelar la sorpresa final
  function catchTargetSuccess() {
    stopCatchMovement();
    fireCelebrationConfetti();

    setTimeout(() => {
      switchScreen(screenReveal);
      fireBigCelebration();
    }, 500);
  }

  // 10. Efectos de Confeti
  function fireSmallConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8 },
        colors: ['#ff758c', '#ff7eb3', '#22c55e', '#f9bf3b']
      });
    }
  }

  function fireCelebrationConfetti() {
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#e85d75', '#f9bf3b', '#2ec4b6', '#a6c1ee']
      });
    }
  }

  function fireBigCelebration() {
    if (typeof confetti === 'function') {
      const duration = 3.5 * 1000;
      const end = Date.now() + duration;

      (function frame() {
        confetti({
          particleCount: 4,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#ff416c', '#ff4b2b', '#ff7eb3', '#ffd700']
        });
        confetti({
          particleCount: 4,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#ff416c', '#ff4b2b', '#ff7eb3', '#ffd700']
        });

        if (Date.now() < end) {
          requestAnimationFrame(frame);
        }
      }());
    }
  }

  // Event Listeners
  btnStart.addEventListener('click', startQuiz);
  
  // Al hacer clic en reclamar premio o en la caja, inicia la secuencia de confirmación
  btnOpenGift.addEventListener('click', startConfirmationFlow);
  if (giftWrapper) giftWrapper.addEventListener('click', startConfirmationFlow);

  // Siguiente en pantallas "¿Estás segura?"
  btnConfirmNext.addEventListener('click', handleConfirmNext);

  // Clic en el botón escurridizo que se mueve
  btnMovingTarget.addEventListener('click', catchTargetSuccess);

  // Clic en "¡Sí, acepto!" en la carta final
  btnAccept.addEventListener('click', () => {
    fireBigCelebration();
    btnAccept.innerHTML = '<span>¡¡¡Siiiiii!!! 🥳❤️🍾</span>';
    btnAccept.style.transform = 'scale(1.05)';
  });

  // Volver a jugar
  btnRestart.addEventListener('click', () => {
    stopCatchMovement();
    const giftBox = document.querySelector('.gift-box');
    if (giftBox) giftBox.classList.remove('open');
    startQuiz();
  });

  // Iniciar configuración inicial
  initConfig();
});
