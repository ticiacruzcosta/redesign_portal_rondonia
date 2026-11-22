(() => {
  'use strict';

  const html = document.documentElement;
  const btnDiminuir = document.getElementById('btn-diminuir-fonte');
  const btnAumentar = document.getElementById('btn-aumentar-fonte');
  const btnContraste = document.getElementById('btn-alto-contraste');

  const formBusca = document.getElementById('form-busca');
  const campoBusca = document.getElementById('campo-busca');
  const tagsBusca = document.querySelectorAll('.tag-rapida[data-busca]');
  const cardsServico = document.querySelectorAll('.card-servico');
  const statusBusca = document.getElementById('status-busca');
  const estadoVazio = document.getElementById('estado-vazio');
  const termoVazio = document.getElementById('termo-vazio');
  const btnLimparFiltro = document.getElementById('btn-limpar-filtro');
  const btnResetarBusca = document.getElementById('btn-resetar-busca');
  const secaoServicos = document.getElementById('servicos');

  // --- Controles de Acessibilidade ---
  let tamanhoFonte = 100;
  const TAMANHO_MIN = 90;
  const TAMANHO_MAX = 125;
  const PASSO_FONTE = 10;

  function aplicarTamanhoFonte(valor) {
    tamanhoFonte = Math.min(TAMANHO_MAX, Math.max(TAMANHO_MIN, valor));
    html.style.fontSize = `${tamanhoFonte}%`;
    try {
      localStorage.setItem('ro-portal-fonte', String(tamanhoFonte));
    } catch {
      // Ignora caso o armazenamento local esteja indisponível
    }
  }

  function aplicarAltoContraste(ativo) {
    if (ativo) {
      html.setAttribute('data-contrast', 'high');
    } else {
      html.removeAttribute('data-contrast');
    }
    btnContraste.setAttribute('aria-pressed', String(ativo));
    try {
      localStorage.setItem('ro-portal-contraste', ativo ? 'high' : 'normal');
    } catch {
      // Ignora caso o armazenamento local esteja indisponível
    }
  }

  // Restaura preferências salvas
  try {
    const fonteSalva = Number(localStorage.getItem('ro-portal-fonte'));
    if (fonteSalva >= TAMANHO_MIN && fonteSalva <= TAMANHO_MAX) {
      aplicarTamanhoFonte(fonteSalva);
    }
    const contrasteSalvo = localStorage.getItem('ro-portal-contraste');
    if (contrasteSalvo === 'high') {
      aplicarAltoContraste(true);
    }
  } catch {
    // Sem efeito se localStorage estiver bloqueado
  }

  btnDiminuir.addEventListener('click', () => {
    aplicarTamanhoFonte(tamanhoFonte - PASSO_FONTE);
  });

  btnAumentar.addEventListener('click', () => {
    aplicarTamanhoFonte(tamanhoFonte + PASSO_FONTE);
  });

  btnContraste.addEventListener('click', () => {
    const ativo = html.getAttribute('data-contrast') === 'high';
    aplicarAltoContraste(!ativo);
  });

  // --- Busca e Filtro de Serviços ---
  function normalizarTexto(texto) {
    return texto
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  }

  function filtrarServicos(termoBruto, rolarAteServicos = false) {
    const termoNormalizado = normalizarTexto(termoBruto);
    let encontrados = 0;

    cardsServico.forEach((card) => {
      const conteudo = normalizarTexto(
        `${card.textContent} ${card.dataset.palavras || ''}`
      );
      const corresponde = !termoNormalizado || conteudo.includes(termoNormalizado);
      card.hidden = !corresponde;
      if (corresponde) {
        encontrados += 1;
      }
    });

    if (!termoNormalizado) {
      statusBusca.textContent = '';
      estadoVazio.hidden = true;
      btnLimparFiltro.hidden = true;
      return;
    }

    btnLimparFiltro.hidden = false;

    if (encontrados === 0) {
      statusBusca.textContent = `Nenhum serviço encontrado para "${termoBruto}".`;
      termoVazio.textContent = termoBruto;
      estadoVazio.hidden = false;
    } else {
      const plural = encontrados === 1 ? 'serviço encontrado' : 'serviços encontrados';
      statusBusca.textContent = `${encontrados} ${plural} para "${termoBruto}".`;
      estadoVazio.hidden = true;
    }

    if (rolarAteServicos && secaoServicos) {
      secaoServicos.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  function limparBusca() {
    campoBusca.value = '';
    filtrarServicos('');
    campoBusca.focus();
  }

  formBusca.addEventListener('submit', (evento) => {
    evento.preventDefault();
    filtrarServicos(campoBusca.value, true);
  });

  campoBusca.addEventListener('input', () => {
    filtrarServicos(campoBusca.value, false);
  });

  tagsBusca.forEach((tag) => {
    tag.addEventListener('click', () => {
      const termo = tag.dataset.busca || '';
      campoBusca.value = termo;
      filtrarServicos(termo, true);
    });
  });

  btnLimparFiltro.addEventListener('click', limparBusca);
  btnResetarBusca.addEventListener('click', limparBusca);
})();
