// =============================================
//  Jogo do Número Secreto
// =============================================

// --- Variáveis do jogo ---
let numeroSecreto = gerarNumero();
let tentativas = 0;
let jogoAtivo = true;
let historico = [];

// --- Gera um número aleatório de 1 a 10 ---
function gerarNumero() {
  return Math.floor(Math.random() * 10) + 1;
}

// --- Função principal: verifica o palpite ---
function verificar() {
  if (!jogoAtivo) return;

  const input = document.getElementById('palpite');
  const palpite = parseInt(input.value);

  // Valida o que o usuário digitou
  if (isNaN(palpite) || palpite < 1 || palpite > 10) {
    mostrarMensagem('Digite um número real entre 1 e 10!', 'neutro');
    return;
  }

  tentativas++;
  historico.push(palpite);
  atualizarTentativas();
  atualizarHistorico();

  if (palpite === numeroSecreto) {
    // Acertou!
    mostrarMensagem(
      `Parabéns! Você acertou em ${tentativas} ${tentativas === 1 ? 'tentativa' : 'tentativas'}!`,
      'acerto'
    );
    jogoAtivo = false;
    document.getElementById('btnReiniciar').classList.add('visivel');
    input.disabled = true;

  } else {
    // Dica: quente ou frio
    const distancia = Math.abs(palpite - numeroSecreto);

    if (distancia === 1) {
      mostrarMensagem('Quente! Você está muito perto!', 'quente');
    } else if (distancia <= 3) {
      mostrarMensagem('Morno... está chegando!', 'quente');
    } else {
      mostrarMensagem('Frio! Está longe ainda.', 'frio');
    }
  }

  // Limpa o input após cada tentativa
  input.value = '';
  input.focus();
}

// --- Atualiza o contador de tentativas na tela ---
function atualizarTentativas() {
  document.getElementById('tentativas').textContent =
    `Tentativas: ${tentativas}`;
}

// --- Mostra o histórico de palpites ---
function atualizarHistorico() {
  const area = document.getElementById('historicoArea');
  const lista = document.getElementById('historicoLista');

  area.style.display = 'block';
  lista.innerHTML = historico
    .map(n => `<span>${n}</span>`)
    .join('');
}

// --- Atualiza a mensagem na tela com estilo ---
function mostrarMensagem(texto, estilo) {
  const el = document.getElementById('mensagem');
  el.textContent = texto;
  el.className = `mensagem ${estilo}`;
}

// --- Reinicia o jogo do zero ---
function reiniciar() {
  numeroSecreto = gerarNumero();
  tentativas = 0;
  jogoAtivo = true;
  historico = [];

  const input = document.getElementById('palpite');
  input.disabled = false;
  input.value = '';
  input.focus();

  atualizarTentativas();
  mostrarMensagem('Digite um número e clique em Tentar!', 'neutro');

  document.getElementById('btnReiniciar').classList.remove('visivel');
  document.getElementById('historicoArea').style.display = 'none';
  document.getElementById('historicoLista').innerHTML = '';
}

// --- Permite usar Enter para enviar o palpite ---
document.getElementById('palpite').addEventListener('keydown', function (e) {
  if (e.key === 'Enter') verificar();
});

// --- Botões ---
document.getElementById('btnTentar').addEventListener('click', verificar);
document.getElementById('btnReiniciar').addEventListener('click', reiniciar);
