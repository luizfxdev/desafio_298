// button.js - Controle dos botões e funcionalidades extras
let isCalculating = false;

// Adiciona funcionalidade de toggle para todos os botões com classe button--toggle
const buttons = document.querySelectorAll('.button--toggle:not(#play-btn)');
for (let button of buttons) {
  button.addEventListener('click', function () {
    button.classList.toggle('is-active');
  });
}

// Controle específico do botão Play/Pause
document.getElementById('play-btn').addEventListener('click', function () {
  const input = musicInput.value.trim();

  // Se está tocando música, pausa
  if (currentAudio && !currentAudio.paused) {
    currentAudio.pause();
    this.classList.remove('is-active');
    return;
  }

  // Se tem áudio pausado, retoma
  if (currentAudio && currentAudio.paused) {
    currentAudio.play().catch(console.error);
    this.classList.add('is-active');
    return;
  }

  // Se não tem input, mostra erro
  if (!input) {
    resultContent.innerHTML = '<div class="error-message">⚠️ Por favor, insira as durações das músicas!</div>';
    return;
  }

  // Calcula o resultado
  try {
    const numbers = processInput(input);
    const result = findPerfectPlaylist(numbers);

    // Salva na história
    sequenceHistory.push(input);
    displayResult(result, input);

    // Toca o theme se a sequência for reconhecida
    if (result.success) {
      playThemeForSequence(numbers);
      this.classList.add('is-active');
    }
  } catch (error) {
    resultContent.innerHTML = `<div class="error-message">❌ ${error.message}</div>`;
  }
});

// Funcionalidade adicional para o botão shuffle (embaralhar)
document.getElementById('shuffle-btn').addEventListener('click', function () {
  const input = musicInput.value.trim();
  if (input) {
    try {
      const numbers = processInput(input);
      // Embaralha o array usando algoritmo Fisher-Yates
      for (let i = numbers.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
      }
      musicInput.value = numbers.join(', ');
      resultContent.innerHTML =
        '<div class="result-placeholder">🔀 Sequência embaralhada! Clique em PLAY para calcular.</div>';
    } catch (error) {
      resultContent.innerHTML = '<div class="error-message">❌ Erro ao embaralhar: formato inválido</div>';
    }
  }
});

// Funcionalidade para o botão repeat (repetir)
document.getElementById('repeat-btn').addEventListener('click', function () {
  if (currentAudio) {
    currentAudio.currentTime = 0;
    if (currentAudio.paused) {
      currentAudio.play().catch(console.error);
      document.getElementById('play-btn').classList.add('is-active');
    }
  }
});
