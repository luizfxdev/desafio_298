// script.js - Lógica principal do desafio da Trilha Musical do Programador

// Sequências predefinidas com seus respectivos themes
const predefinedSequences = [
  { numbers: [15, 30, 45, 20, 35, 5, 25, 10], theme: 'theme1' },
  { numbers: [12, 48, 25, 35, 10, 50], theme: 'theme2' },
  { numbers: [5, 55, 30, 29, 31, 15, 45, 20], theme: 'theme3' },
  { numbers: [17, 23, 40, 20, 10, 50, 43, 37], theme: 'theme4' },
  { numbers: [1, 59, 28, 32, 2, 58, 45, 15], theme: 'theme5' }
];

let currentSequenceIndex = 0;
let sequenceHistory = [];
let currentAudio = null;
let isPlaying = false;

// Elementos do DOM
const musicInput = document.getElementById('music-input');
const resultContent = document.getElementById('result-content');
const playBtn = document.getElementById('play-btn');
const backBtn = document.getElementById('back-btn');
const forwardBtn = document.getElementById('forward-btn');

/**
 * Função principal para encontrar duas músicas que somem 60 minutos
 * Utiliza abordagem de hash map para otimização O(n)
 * @param {number[]} durations - Array com as durações das músicas
 * @returns {Object} - Objeto com resultado da análise
 */
function findPerfectPlaylist(durations) {
  const steps = [];
  steps.push('🎯 Iniciando busca pela combinação perfeita...');
  steps.push(`📝 Durações fornecidas: [${durations.join(', ')}]`);
  steps.push('🔍 Procurando duas músicas que somem exatamente 60 minutos...');

  // Using hash map approach for O(n) optimization
  const seen = new Map();
  for (let i = 0; i < durations.length; i++) {
    const current = durations[i];
    const complement = 60 - current;

    steps.push(`🔸 Analisando música de ${current} minutos...`);
    steps.push(` Complemento necessário: 60 - ${current} = ${complement} minutos`);

    if (seen.has(complement)) {
      const foundIndex = seen.get(complement);
      steps.push(`✅ ENCONTRADO! Música de ${complement} minutos já foi vista na posição ${foundIndex}`);
      steps.push(`🎵 Combinação perfeita: ${complement} + ${current} = 60 minutos`);

      return {
        success: true,
        result: [complement, current],
        steps: steps,
        indices: [foundIndex, i]
      };
    }

    seen.set(current, i);
    steps.push(` Música de ${current} minutos armazenada para futuras verificações`);
  }

  steps.push('❌ Nenhuma combinação de duas músicas soma exatamente 60 minutos');
  return {
    success: false,
    result: null,
    steps: steps
  };
}

/**
 * Função para validar e processar a entrada do usuário
 * @param {string} input - String de entrada com números separados por vírgula
 * @returns {number[]} - Array de números válidos
 * @throws {Error} - Lança erro se entrada for inválida
 */
function processInput(input) {
  try {
    // Remove espaços e converte para array de números
    const numbers = input
      .split(',')
      .map(num => parseInt(num.trim()))
      .filter(num => !isNaN(num) && num > 0);

    if (numbers.length < 2) {
      throw new Error('É necessário pelo menos 2 durações válidas');
    }

    return numbers;
  } catch (error) {
    throw new Error('Formato inválido. Use números separados por vírgula (ex: 15, 30, 45)');
  }
}

/**
 * Função para exibir o resultado da análise na interface
 * @param {Object} analysisResult - Resultado da análise do algoritmo
 * @param {string} originalInput - Input original do usuário
 */
function displayResult(analysisResult, originalInput) {
  let html = '';

  // Exibe os passos do cálculo
  html += '<div class="calculation-steps">';
  analysisResult.steps.forEach(step => {
    html += `<div class="calculation-step">${step}</div>`;
  });
  html += '</div>';

  // Exibe o resultado final
  if (analysisResult.success) {
    html += `
      <div class="final-result">
        🎉 <strong>Saída Esperada:</strong> [${analysisResult.result.join(', ')}]
        <br>
        <small>Playlist perfeita de 60 minutos encontrada!</small>
      </div>
    `;
  } else {
    html += `
      <div class="error-message">
        😔 <strong>Resultado:</strong> Nenhuma combinação encontrada
        <br>
        <small>Tente com outras durações de música</small>
      </div>
    `;
  }

  resultContent.innerHTML = html;

  // Força o scroll para mostrar o resultado
  const resultSection = document.getElementById('result-section');
  resultSection.scrollTop = resultSection.scrollHeight;
}

/**
 * Função para tocar o theme baseado na sequência de números
 * @param {number[]} numbers - Array com as durações das músicas
 */
function playThemeForSequence(numbers) {
  // Para o áudio atual se estiver tocando
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
  }

  // Encontra qual sequência predefinida corresponde aos números
  const matchingSequence = predefinedSequences.find(
    seq => seq.numbers.length === numbers.length && seq.numbers.every((num, index) => num === numbers[index])
  );

  if (matchingSequence) {
    const audio = document.getElementById(matchingSequence.theme);

    if (audio) {
      currentAudio = audio;

      // Event listeners para controlar o estado do botão
      audio.onplay = () => {
        isPlaying = true;
        updatePlayButton();
      };

      audio.onpause = () => {
        isPlaying = false;
        updatePlayButton();
      };

      audio.onended = () => {
        isPlaying = false;
        updatePlayButton();
      };

      audio
        .play()
        .then(() => {
          isPlaying = true;
          updatePlayButton();
        })
        .catch(console.error);
    }
  }
}

// Botão BACK - Mostra a sequência anterior
backBtn.addEventListener('click', function () {
  if (sequenceHistory.length > 0) {
    const lastSequence = sequenceHistory.pop();
    const numbers = lastSequence.split(',').map(n => parseInt(n.trim()));

    musicInput.value = lastSequence;

    // Interrompe áudio atual, se houver
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Toca o theme correspondente à sequência
    playThemeForSequence(numbers);

    // Calcula o resultado automaticamente
    try {
      const result = findPerfectPlaylist(numbers);
      displayResult(result, lastSequence);
      document.getElementById('play-btn').classList.add('is-active');
    } catch (error) {
      resultContent.innerHTML = `<div class="error-message">❌ ${error.message}</div>`;
    }
  } else {
    resultContent.innerHTML = '<div class="error-message">📝 Nenhuma sequência anterior encontrada!</div>';
  }
});

// Botão Forward - Carrega próxima sequência predefinida
forwardBtn.addEventListener('click', function () {
  if (currentSequenceIndex < predefinedSequences.length) {
    const sequence = predefinedSequences[currentSequenceIndex];
    musicInput.value = sequence.numbers.join(', ');

    // Interrompe áudio atual, se houver
    if (currentAudio) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
    }

    // Toca o theme correspondente à sequência
    playThemeForSequence(sequence.numbers);

    // Atualiza o índice para próxima sequência
    currentSequenceIndex = (currentSequenceIndex + 1) % predefinedSequences.length;

    // Calcula o resultado automaticamente
    try {
      const result = findPerfectPlaylist(sequence.numbers);
      displayResult(result, sequence.numbers.join(', '));
      document.getElementById('play-btn').classList.add('is-active');
    } catch (error) {
      resultContent.innerHTML = `<div class="error-message">❌ ${error.message}</div>`;
    }
  }
});

// Carrega a primeira sequência por padrão ao inicializar a página
window.addEventListener('load', function () {
  musicInput.value = predefinedSequences[0].numbers.join(', ');
});

// Função para atualizar o estado do botão Play/Pause
function updatePlayButton() {
  const playBtn = document.getElementById('play-btn');

  if (isPlaying) {
    playBtn.classList.add('is-active');
  } else {
    playBtn.classList.remove('is-active');
  }
}
