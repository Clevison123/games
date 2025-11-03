class Pergunta {
  constructor(enunciado, opcoes, corretaLetter) {
    this.enunciado = enunciado;
    this.opcoes = [...opcoes];
    this.respostaCorreta = corretaLetter.toUpperCase();
  }

  verificar(resposta) {
    return resposta.toUpperCase() === this.respostaCorreta;
  }
}

class PerguntaMultiplaEscolha extends Pergunta {
  constructor(enunciado, opcoes, corretaLetter) {
    super(enunciado, opcoes, corretaLetter);
    this.embaralhar();
  }

  embaralhar() {
    const corretaText = this.opcoes[this.respostaCorreta.charCodeAt(0) - 65];
    for (let i = this.opcoes.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.opcoes[i], this.opcoes[j]] = [this.opcoes[j], this.opcoes[i]];
    }
    for (let i = 0; i < this.opcoes.length; i++) {
      if (this.opcoes[i] === corretaText) {
        this.respostaCorreta = String.fromCharCode(65 + i);
        break;
      }
    }
  }
}

class Jogador {
  constructor(nome) {
    this.nome = nome;
    this.pontuacao = 0;
  }
  addPonto() { this.pontuacao++; }
}

const bancoPerguntas = (() => {
  const arr = [];
  arr.push(new PerguntaMultiplaEscolha("Qual a capital do Brasil?", ["São Paulo","Rio de Janeiro","Brasília","Salvador"], "C"));
  arr.push(new PerguntaMultiplaEscolha("Quantos planetas há no Sistema Solar?", ["7","8","9","10"], "B"));
  arr.push(new PerguntaMultiplaEscolha("Quem desenvolveu a Teoria da Relatividade?", ["Newton","Einstein","Galileu","Tesla"], "B"));
  arr.push(new PerguntaMultiplaEscolha("Qual o maior oceano do mundo?", ["Atlântico","Pacífico","Índico","Ártico"], "B"));
  arr.push(new PerguntaMultiplaEscolha("Qual é o menor país do mundo?", ["Mônaco","Malta","Vaticano","San Marino"], "C"));
  arr.push(new PerguntaMultiplaEscolha("Quem pintou a Mona Lisa?", ["Leonardo da Vinci","Michelangelo","Pablo Picasso","Rembrandt"], "A"));
  arr.push(new PerguntaMultiplaEscolha("Qual é o símbolo químico da água?", ["HO","H2O","OH2","HHO"], "B"));
  arr.push(new PerguntaMultiplaEscolha("Em que ano o homem pisou na Lua pela primeira vez?", ["1969","1959","1979","1981"], "A"));
  arr.push(new PerguntaMultiplaEscolha("Qual é o maior animal terrestre?", ["Elefante africano","Baleia azul","Girafa","Hipopótamo"], "A"));
  arr.push(new PerguntaMultiplaEscolha("Qual é a moeda oficial do Japão?", ["Won","Iene","Yuan","Rupia"], "B"));

  const novas = [
    ["Qual é o maior animal do planeta?", ["Elefante", "Baleia Azul", "Girafa", "Orca"], "B"],
    ["Qual planeta é conhecido como o 'Planeta Vermelho'?", ["Vênus", "Marte", "Júpiter", "Saturno"], "B"],
    ["Quantos segundos há em um minuto?", ["60", "100", "30", "90"], "A"],
    ["Qual é o menor continente do mundo?", ["Europa", "Ásia", "Oceania", "Antártida"], "C"],
    ["De que cor é o sol?", ["Amarelo", "Branco", "Laranja", "Vermelho"], "B"],
    ["Qual animal é conhecido por mudar de cor?", ["Camaleão", "Polvo", "Peixe-palhaço", "Sapo"], "A"],
    ["Quantos dias tem um ano bissexto?", ["365", "366", "364", "360"], "B"],
    ["Quem pintou a Mona Lisa?", ["Leonardo da Vinci", "Michelangelo", "Van Gogh", "Picasso"], "A"],
    ["Qual é o país do samba e do futebol?", ["Argentina", "Espanha", "Brasil", "Portugal"], "C"],
    ["Qual é o maior oceano da Terra?", ["Atlântico", "Pacífico", "Índico", "Ártico"], "B"],
    ["O que as abelhas produzem?", ["Leite", "Mel", "Pólen", "Néctar"], "B"],
    ["Qual é o nome do brinquedo de madeira que sobe e desce com uma corda?", ["Yo-yo", "Pião", "Catavento", "Bumerangue"], "A"],
    ["Quantas patas tem uma aranha?", ["6", "8", "10", "12"], "B"],
    ["Qual é o principal gás que respiramos?", ["Hidrogênio", "Carbono", "Oxigênio", "Nitrogênio"], "C"],
    ["Em que estação as flores desabrocham?", ["Verão", "Outono", "Primavera", "Inverno"], "C"],
    ["Quem é o 'Rei do Pop'?", ["Elvis Presley", "Michael Jackson", "Freddie Mercury", "Justin Bieber"], "B"],
    ["Qual é o maior deserto do mundo?", ["Saara", "Gobi", "Atacama", "Antártida"], "D"],
    ["Quantos planetas existem no Sistema Solar?", ["7", "8", "9", "10"], "B"],
    ["Qual é o país conhecido pelas pizzas e massas?", ["Espanha", "França", "Itália", "Grécia"], "C"],
    ["O que um termômetro mede?", ["Pressão", "Temperatura", "Peso", "Velocidade"], "B"],
    ["Qual é a capital da França?", ["Londres", "Roma", "Paris", "Berlim"], "C"],
    ["Qual é o animal símbolo da Austrália?", ["Canguru", "Urso", "Elefante", "Tigre"], "A"],
    ["O que usamos para ver estrelas de perto?", ["Microscópio", "Telescópio", "Binóculo", "Radar"], "B"],
    ["Qual é o nome da estrela mais próxima da Terra?", ["Lua", "Sol", "Vênus", "Marte"], "B"],
    ["Qual fruta é conhecida por afastar médicos se comida por dia?", ["Laranja", "Maçã", "Banana", "Uva"], "B"],
    ["Qual é o animal mais rápido do mundo?", ["Guepardo", "Falcão", "Leopardo", "Tigre"], "A"],
    ["O que um pianista toca?", ["Guitarra", "Bateria", "Piano", "Violino"], "C"],
    ["Qual animal vive tanto na água quanto na terra?", ["Sapo", "Peixe", "Jacaré", "Cachorro"], "A"],
    ["Qual é o maior país do mundo?", ["China", "Rússia", "Canadá", "EUA"], "B"],
    ["Quantos meses têm 31 dias?", ["6", "7", "8", "9"], "B"],
    ["Qual desses é um mamífero?", ["Tubarão", "Golfinho", "Peixe-boi", "Polvo"], "B"],
    ["Em que país está localizada a Torre Eiffel?", ["Espanha", "França", "Itália", "Portugal"], "B"],
    ["O que usamos para cortar papel?", ["Régua", "Tesoura", "Cola", "Caneta"], "B"],
    ["Quantos dentes tem um adulto (normalmente)?", ["28", "30", "32", "36"], "C"],
    ["Qual planeta tem os anéis mais famosos?", ["Marte", "Júpiter", "Saturno", "Netuno"], "C"],
    ["Qual é o idioma mais falado do mundo?", ["Inglês", "Espanhol", "Mandarim", "Árabe"], "C"],
    ["Qual instrumento mede o tempo?", ["Bússola", "Relógio", "Termômetro", "Barômetro"], "B"],
    ["O que é H2O?", ["Água", "Oxigênio", "Gelo", "Vapor"], "A"],
    ["Quantos continentes existem?", ["5", "6", "7", "8"], "C"],
    ["Qual é o nome do rato mais famoso do mundo?", ["Jerry", "Mickey", "Stuart", "Speedy"], "B"],
    ["Em que país nasceu o futebol moderno?", ["Brasil", "Inglaterra", "Alemanha", "Itália"], "B"],
    ["Qual é a capital do Brasil?", ["São Paulo", "Brasília", "Rio de Janeiro", "Salvador"], "B"],
    ["Qual é o animal símbolo da paz?", ["Coruja", "Pomba", "Leão", "Cervo"], "B"],
    ["Qual é a bebida feita com grãos de café torrados?", ["Suco", "Café", "Chá", "Água"], "B"],
    ["Qual planeta é conhecido por seus ventos fortes e cor azul?", ["Urano", "Netuno", "Vênus", "Mercúrio"], "B"],
    ["Qual é a capital da Itália?", ["Veneza", "Roma", "Milão", "Nápoles"], "B"],
    ["Quem escreveu 'Dom Quixote'?", ["Machado de Assis", "Shakespeare", "Miguel de Cervantes", "Camões"], "C"],
    ["Qual é o nome do personagem principal de 'Toy Story'?", ["Woody", "Buzz", "Andy", "Jessie"], "A"]
  ];
  novas.forEach(n => arr.push(new PerguntaMultiplaEscolha(n[0], n[1], n[2])));
  return arr;
})();

class Jogo {
  constructor(banco) {
    this.bancoOriginal = banco.slice();
    this.reset();
  }

  reset() {
    this.perguntasPool = this.bancoOriginal.slice();
    this.jogador = null;
    this.indice = 0;
    this.selecoes = [];
    this.totalSelecionado = 0;
  }

  iniciar(nome, quantidade) {
    this.reset();
    this.jogador = new Jogador(nome || "Jogador");
    this.perguntasPool = this.perguntasPool.sort(() => Math.random() - 0.5);
    if (quantidade !== 'all') {
      const n = parseInt(quantidade, 10) || 20;
      this.perguntasPool = this.perguntasPool.slice(0, Math.min(n, this.perguntasPool.length));
    }
    this.totalSelecionado = this.perguntasPool.length;
    this.indice = 0;
  }

  perguntaAtual() {
    return this.perguntasPool[this.indice];
  }

  responder(letraEscolhida) {
    const p = this.perguntaAtual();
    const correta = p.respostaCorreta;
    const certo = p.verificar(letraEscolhida);
    if (certo) this.jogador.addPonto();
    this.selecoes.push({
      pergunta: p.enunciado,
      escolhida: letraEscolhida.toUpperCase(),
      correta: correta,
      corretaText: p.opcoes[correta.charCodeAt(0) - 65]
    });
    return { certo, correta };
  }

  avancar() {
    this.indice++;
    return this.indice < this.totalSelecionado;
  }

  progressoPercent() {
    return Math.round((this.indice / this.totalSelecionado) * 100);
  }
}

const jogo = new Jogo(bancoPerguntas);

const $inicio = document.getElementById('inicio');
const $jogo = document.getElementById('jogo');
const $resultado = document.getElementById('resultado');

const $nomeJogador = document.getElementById('nomeJogador');
const $quantidade = document.getElementById('quantidade');
const $btnIniciar = document.getElementById('btnIniciar');
const $btnIniciarFull = document.getElementById('btnIniciarFull');

const $nomeDisplay = document.getElementById('nomeDisplay');
const $pontuacao = document.getElementById('pontuacao');
const $perguntaTexto = document.getElementById('perguntaTexto');
const $opcoes = document.getElementById('opcoes');
const $btnProxima = document.getElementById('btnProxima');
const $btnDesistir = document.getElementById('btnDesistir');

const $progressFill = document.getElementById('progressFill');

const $mensagemFinal = document.getElementById('mensagemFinal');
const $detalhesResultado = document.getElementById('detalhesResultado');
const $reiniciar = document.getElementById('reiniciar');
const $baixarCSV = document.getElementById('baixarCSV');

function iniciarUI(useAll=false) {
  const nome = $nomeJogador.value.trim() || "Jogador";
  const quantidade = useAll ? 'all' : $quantidade.value;
  jogo.iniciar(nome, quantidade);

  $nomeDisplay.textContent = jogo.jogador.nome;
  $pontuacao.textContent = jogo.jogador.pontuacao;
  $inicio.classList.add('hidden');
  $resultado.classList.add('hidden');
  $jogo.classList.remove('hidden');

  renderPergunta();
}

$btnIniciar.addEventListener('click', () => iniciarUI(false));
$btnIniciarFull.addEventListener('click', () => iniciarUI(true));

function renderPergunta() {
  const p = jogo.perguntaAtual();
  $perguntaTexto.textContent = `Q${jogo.indice + 1}. ${p.enunciado}`;
  $opcoes.innerHTML = '';
  p.opcoes.forEach((texto, i) => {
    const letra = String.fromCharCode(65 + i);
    const btn = document.createElement('button');
    btn.textContent = `${letra}) ${texto}`;
    btn.dataset.letra = letra;
    btn.addEventListener('click', () => handleResposta(btn));
    $opcoes.appendChild(btn);
  });
  $btnProxima.classList.add('hidden');
  const pct = jogo.progressoPercent();
  $progressFill.style.width = `${pct}%`;
}

function handleResposta(btn) {
  const botoes = $opcoes.querySelectorAll('button');
  botoes.forEach(b => b.disabled = true);
  const letra = btn.dataset.letra;
  const { certo, correta } = jogo.responder(letra);
  if (certo) btn.classList.add('btn-correct');
  else {
    btn.classList.add('btn-wrong');
    botoes.forEach(b => {
      if (b.dataset.letra === correta) b.classList.add('btn-correct');
    });
  }
  $pontuacao.textContent = jogo.jogador.pontuacao;
  $btnProxima.classList.remove('hidden');
}

$btnProxima.addEventListener('click', () => {
  const temProxima = jogo.avancar();
  if (temProxima) renderPergunta();
  else finalizarUI();
});

$btnDesistir.addEventListener('click', () => {
  if (confirm("Deseja realmente desistir? Sua pontuação será exibida.")) finalizarUI();
});

function finalizarUI() {
  $jogo.classList.add('hidden');
  $resultado.classList.remove('hidden');
  $mensagemFinal.textContent = `🏆 ${jogo.jogador.nome}, sua pontuação final foi: ${jogo.jogador.pontuacao} ponto(s).`;
  $detalhesResultado.textContent = `Você respondeu ${jogo.selecoes.length} de ${jogo.totalSelecionado} perguntas.`;
  $progressFill.style.width = `100%`;
}

$reiniciar.addEventListener('click', () => {
  iniciarUI($quantidade.value === 'all');
  $nomeJogador.value = '';
  $progressFill.style.width = `0%`;
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && !$btnProxima.classList.contains('hidden')) $btnProxima.click();
});
