# Redesign Conceitual — Portal do Governo de Rondônia (UX/UI & Acessibilidade)

Protótipo conceitual da página inicial do **Portal do Governo de Rondônia**, desenvolvido para estudo de caso de portfólio em **UX/UI Design** e **Desenvolvimento Front-end (GovTech)** com foco em acessibilidade (**WCAG AA/AAA**), utilizando apenas **HTML5 semântico**, **CSS3 puro** e **JavaScript vanilla**.

> **Aviso:** Este é um projeto conceitual de portfólio, sem vínculo oficial com o Governo do Estado de Rondônia.

---

## Como executar localmente

1. Clone o repositório:
   ```bash
   git clone https://github.com/ticiacruzcosta/redesign_portal_rondonia.git
   ```
2. Abra o arquivo `index.html` diretamente no navegador de sua preferência.

---

## Decisões de UX/UI e Acessibilidade (Heurísticas de Nielsen + WCAG)

### 1. Estética e design minimalista (Heurística #8)
- **Redução de carga cognitiva:** Remoção de carrosséis automáticos, banners promocionais concorrentes e colunas laterais saturadas.
- **Hierarquia visual clara:** Página organizada em cinco blocos objetivos:
  1. Barra discreta de acessibilidade e cabeçalho enxuto com navegação direta.
  2. Hero centralizado com foco total na busca de serviços.
  3. Grade de **Serviços mais procurados**.
  4. Bloco dedicado à **Transparência**, **Ouvidoria (Fala.BR)** e **Diário Oficial (DIOF)**.
  5. Seção **Últimas notícias** limitada a 3 cards limpos e escaneáveis.
- **Paleta institucional equilibrada:** Azul-escuro (`#0B2545`) como cor principal de autoridade, fundo neutro claro (`#F5F7FA`) para conforto visual e verde/amarelo aplicados apenas em detalhes pontuais de destaque.

### 2. Correspondência entre o sistema e o mundo real (Heurística #2)
- **Linguagem orientada a tarefas:** Substituição de siglas burocráticas de órgãos e secretarias (como SEFIN, DETRAN, SESAU, SEDUC e SEGEP) por rótulos claros centrados na necessidade do cidadão:
  - *Impostos e IPVA*
  - *Trânsito e CNH*
  - *Saúde*
  - *Educação e Concursos*
  - *Contracheque do Servidor*
  - *Empresas e Notas Fiscais*
- **Palavras-chave internas:** As siglas continuam indexadas no atributo `data-palavras` dos cards para que quem já as conhece também encontre o serviço pela busca.

### 3. Flexibilidade e eficiência de uso (Heurística #7)
- **Busca protagonista:** Campo de pesquisa amplo logo na primeira dobra com a pergunta direta *"O que você precisa resolver hoje?"* e filtragem instantânea com normalização de acentos.
- **Atalhos de acesso rápido:** Tags clicáveis abaixo da busca (*IPVA*, *Trânsito e CNH*, *Concursos*, *Contracheque*, *Diário Oficial* e *Ouvidoria*) para reduzir o número de cliques até os serviços mais demandados.
- **Filtros por perfil de público:** Botões acessíveis (*Todos os públicos*, *Cidadão*, *Servidor Público* e *Empresa*) na grade de serviços, espelhando os públicos do portal atual sem poluir a interface.

### 4. Acessibilidade (WCAG AA/AAA)
- **Semântica e leitores de tela:** Uso de landmarks HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), link de salto (*"Ir para o conteúdo principal"*), atributos `aria-pressed`, `aria-live="polite"` no status da busca e SVGs decorativos marcados com `aria-hidden="true"`.
- **Controles no topo:** Botões para ajuste progressivo da fonte (`A-` / `A+`) e ativação do modo **Alto Contraste** com fundo preto e destaques em amarelo (`#FFE600`).
- **Ergonomia e teclado:** Tipografia base de `16px`, áreas de toque com no mínimo `48px` de altura em botões, links e tags, além de anéis de foco (`:focus-visible`) com alto contraste e respeito à preferência `prefers-reduced-motion`.
