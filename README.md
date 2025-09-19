# 🎵 A Trilha Musical do Programador

Uma aplicação web interativa que resolve o desafio de encontrar a combinação perfeita de duas músicas que somem exatamente 60 minutos, com interface moderna e efeitos sonoros temáticos.

## 🎯 Sobre o Desafio

Você está caminhando pelo universo geek e de repente encontra um portal para o mundo dos códigos, onde os programadores vivem em perfeita harmonia com suas melhores playlists de música! 🎧

Neste mundo, cada música tem um valor mágico, representado por sua duração em minutos. Seu objetivo é criar a playlist perfeita para a sua jornada matinal, que dure exatamente 60 minutos.

### 🔍 Objetivo
Dado uma lista de durações de músicas, encontre a combinação de duas músicas cuja soma da duração seja igual a 60 minutos.

**Entrada:** Lista de inteiros representando a duração de cada música  
**Saída:** Lista contendo as duas durações encontradas  
**Regra:** Cada música só pode ser usada uma única vez!

## 🚀 Funcionalidades

### ✨ Interface
- **Design Moderno**: Interface dark com efeitos de transparência e blur
- **Vídeo Background**: Background animado em full-screen
- **Responsivo**: Adaptável para desktop e dispositivos móveis
- **Container Fixo**: Posicionado no lado esquerdo da tela

### 🎮 Controles Interativos
- **🎵 PLAY**: Calcula e exibe o resultado com análise detalhada
- **⏮️ BACK**: Carrega a sequência anterior do histórico
- **⏭️ FORWARD**: Carrega próxima sequência predefinida
- **🔀 SHUFFLE**: Embaralha a sequência atual
- **🔁 REPEAT**: Repete o áudio do theme atual

### 🎼 Sequências Temáticas
A aplicação inclui 5 sequências predefinidas com themes musicais:

1. `[15, 30, 45, 20, 35, 5, 25, 10]` → **theme1.mp3**
2. `[12, 48, 25, 35, 10, 50]` → **theme2.mp3**
3. `[5, 55, 30, 29, 31, 15, 45, 20]` → **theme3.mp3**
4. `[17, 23, 40, 20, 10, 50, 43, 37]` → **theme4.mp3**
5. `[1, 59, 28, 32, 2, 58, 45, 15]` → **theme5.mp3**

### 🔍 Análise Detalhada
- **Passo a Passo**: Mostra todo o processo de validação
- **Algoritmo Otimizado**: Implementação O(n) usando hash map
- **Resultado Destacado**: Saída final com estilo especial
- **Scroll Automático**: Área de resultado com barra de rolagem

## 📂 Estrutura do Projeto

```
DESAFIO_298/
│
├── assets/
│   ├── background.mp4  # Vídeo de background
│   ├── favicon.ico     # Ícone do site
│   ├── theme1.mp3      # Tema musical 1
│   ├── theme2.mp3      # Tema musical 2
│   ├── theme3.mp3      # Tema musical 3
│   ├── theme4.mp3      # Tema musical 4
│   └── theme5.mp3      # Tema musical 5
│
├── css/
│   ├── button.css      # Estilos específicos dos botões (compilado)
│   ├── button.css.map  # Source map do button.css
│   ├── styles.css      # Estilos gerais (compilado)
│   └── styles.css.map  # Source map do styles.css
│
├── js/
│   ├── button.js       # Controle dos botões
│   └── script.js       # Lógica principal do desafio
│
├── scss/
│   ├── button.scss     # Estilos específicos dos botões (fonte)
│   └── styles.scss     # Estilos gerais do container (fonte)
│
├── index.html          # Estrutura HTML principal
├── package-lock.json   # Lock file das dependências
├── package.json        # Configurações do projeto e dependências
└── README.md           # Este arquivo
```

## 🛠️ Tecnologias Utilizadas

- **HTML5**: Estrutura semântica e elementos de áudio/vídeo
- **CSS3/SCSS**: Estilos modernos com variáveis CSS e animações
  - Arquivos fonte: `scss/styles.scss` e `scss/button.scss`
  - Arquivos compilados: `css/styles.css` e `css/button.css`
- **JavaScript ES6+**: Lógica do algoritmo e interações
  - `js/script.js` - Lógica principal
  - `js/button.js` - Controle dos botões
- **Phosphor Icons**: Ícones modernos para os botões
- **Google Fonts**: Tipografia Inter
- **Node.js**: Para compilação SCSS (package.json)

## 🎨 Design System

### 🎭 Cores (Modo Dark)
- **Primária**: `rgb(180, 188, 208)` - Texto principal
- **Secundária**: `rgb(255, 255, 255)` - Texto de destaque
- **Background**: `rgb(24, 24, 27)` - Fundo principal
- **Surface**: `rgb(34, 35, 38)` - Superfícies de elementos
- **Accent**: `rgb(85, 214, 121)` - Cor de destaque
- **Border**: `rgb(49, 48, 53)` - Bordas e divisores

### 🎯 Características
- **Transparência**: Container com `backdrop-filter: blur(15px)`
- **Bordas**: Cantos arredondados de `20px` no container principal
- **Sombras**: Sombras suaves para profundidade
- **Animações**: Transições suaves em todos os elementos

## 🚀 Como Usar

### 1. Configuração Inicial
```bash
# Estrutura de pastas já organizada
DESAFIO_298/
├── assets/     # Adicione os arquivos de mídia aqui
├── css/        # Arquivos CSS compilados (se usando SCSS)
├── js/         # Arquivos JavaScript
├── scss/       # Arquivos SCSS fonte (se usando preprocessador)
└── index.html  # Arquivo principal
```

**Arquivos de mídia necessários:**
- `assets/background.mp4` - Vídeo de background
- `assets/favicon.ico` - Ícone do site
- `assets/theme1.mp3` até `assets/theme5.mp3` - Themes musicais

### 2. Execução
- Abra o `index.html` em um navegador moderno
- A primeira sequência será carregada automaticamente

### 3. Interação
1. **Digite** as durações das músicas separadas por vírgula
2. **Clique em PLAY** para calcular o resultado
3. **Visualize** a análise detalhada passo a passo
4. **Use os controles** para navegar entre sequências

## 🧮 Algoritmo

O algoritmo utiliza uma abordagem otimizada com **complexidade O(n)**:

```javascript
function findPerfectPlaylist(durations) {
    const seen = new Map();
    
    for (let i = 0; i < durations.length; i++) {
        const current = durations[i];
        const complement = 60 - current;
        
        if (seen.has(complement)) {
            return [complement, current]; // Encontrou!
        }
        
        seen.set(current, i);
    }
    
    return null; // Não encontrou combinação
}
```

## 📱 Responsividade

### 💻 Desktop
- Container fixo à esquerda (`450px` de largura)
- Botões em linha horizontal
- Máxima altura de `90vh`

### 📱 Mobile (< 768px)
- Container relativo ocupando largura total
- Botões empilhados verticalmente
- Espaçamentos ajustados
- Fontes redimensionadas

### 🔧 Acessibilidade
- **Contraste**: Cores com contraste adequado
- **Labels**: Campos com rótulos claros
- **Teclado**: Navegação por `tabindex`
- **Focus**: Indicadores visuais de foco
- **Semântica**: HTML semântico correto

## 🎵 Áudio e Vídeo

### 📹 Vídeo Background
- **Resolução**: 1920x1080 (Full HD)
- **Formato**: MP4
- **Comportamento**: Autoplay, loop, sem áudio
- **Ajuste**: `object-fit: cover` para preencher tela

### 🔊 Themes Musicais
- **Formato**: MP3
- **Reprodução**: Automática ao encontrar resultado correto
- **Controle**: Play/pause via botões de interface

## 🙏 Agradecimentos

### 🎵 Play Button Design
Agradecimento especial ao **Håvard Brynjulfsen** por disponibilizar o design incrível do **Play button** utilizado neste projeto.

**📎 Fonte original:** [CodePen - Play button](https://codepen.io/havardob/pen/MWqMmgb)

O design dos botões musicais foi adaptado e integrado ao tema da aplicação, mantendo a essência e funcionalidade originais.

## 🤝 Contribuição

### 🐛 Reportar Bugs
- Abra uma issue descrevendo o problema
- Inclua steps para reproduzir
- Mencione navegador e versão

### 💡 Sugestões
- Novas funcionalidades
- Melhorias de UX/UI
- Otimizações de performance

## 📄 Licença

Este projeto é desenvolvido para fins educacionais e de demonstração.

---

**Desenvolvido com 💚 para a comunidade de programadores que amam música! 🎵👨‍💻**
