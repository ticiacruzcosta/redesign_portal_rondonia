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

### Como publicar no GitHub Pages (link ao vivo para portfólio)
1. Acesse o repositório no GitHub e entre em **Settings** > **Pages**.
2. Em **Source**, selecione **Deploy from a branch**.
3. Escolha a branch **`main`** e a pasta **`/ (root)`**, depois clique em **Save**.
4. Em poucos minutos, o site ficará disponível em `https://ticiacruzcosta.github.io/redesign_portal_rondonia/`.

---

## Decisões de UX/UI e Acessibilidade (Heurísticas de Nielsen + WCAG)

### 1. Estética e design minimalista (Heurística #8)
- **Redução de carga cognitiva:** Remoção de carrosséis automáticos, banners promocionais concorrentes e colunas laterais saturadas.
- **Hierarquia visual clara:** Página organizada em cinco blocos objetivos:
  1. Barra discreta de acessibilidade e cabeçalho enxuto com o brasão oficial de Rondônia e menu responsivo.
  2. Hero centralizado com foto das Três Caixas D'Água integrada em degradê azul-escuro (`#0B2545`) e foco total na busca.
  3. Grade de **Serviços mais procurados** com cards compactos e clicáveis.
  4. Bloco horizontal compacto para **Transparência**, **Ouvidoria (Fala.BR)** e **Diário Oficial (DIOF)**.
  5. Seção **Últimas notícias e Destaques** limitada a 3 cards limpos com capas `16:9` sem texto sobreposto.
- **Paleta institucional equilibrada:** Azul-escuro (`#0B2545`) como cor principal de autoridade, fundo neutro claro (`#F5F7FA`) para conforto visual e verde/amarelo aplicados apenas em detalhes pontuais de destaque.

### 2. Correspondência entre o sistema e o mundo real (Heurística #2)
- **Linguagem orientada a tarefas:** Substituição de siglas burocráticas de órgãos e secretarias (como SEFIN, DETRAN, SESAU, SEDUC e SEGEP) por rótulos claros centrados na necessidade do cidadão:
  - *Impostos e IPVA*
  - *Trânsito e CNH*
  - *Saúde*
  - *Educação e Concursos*
  - *Contracheque do Servidor*
  - *Empresas e Notas Fiscais*
- **Sinônimos cotidianos na busca:** Palavras-chave naturais (*boleto*, *carro*, *moto*, *médico*, *remédio*, *salário*, *vaga*, *certidão*) indexadas nos cards para que o cidadão encontre o serviço sem conhecer termos técnicos.

### 3. Flexibilidade e eficiência de uso (Heurística #7)
- **Busca protagonista:** Campo de pesquisa em formato pílula logo na primeira dobra com a pergunta direta *"O que você precisa resolver hoje?"*, filtragem instantânea com normalização de acentos e botão de limpar acessível.
- **Atalhos de acesso rápido:** Tags clicáveis abaixo da busca (*IPVA*, *Trânsito e CNH*, *Concursos*, *Contracheque*, *Diário Oficial* e *Ouvidoria*) com suporte a toggle (clicar novamente desativa o filtro) e destaque `:target` nos canais institucionais.
- **Filtros por perfil de público:** Botões acessíveis (*Todos os públicos*, *Cidadão*, *Servidor Público* e *Empresa*) na grade de serviços, espelhando os públicos do portal oficial.
- **Botão "Voltar ao topo":** Controle discreto exibido apenas após rolagem, agilizando o retorno à barra de busca em dispositivos móveis.

### 4. Visibilidade do status e prevenção de erros (Heurísticas #1, #3 e #5)
- **Feedback para links simulados:** Toast acessível (`role="status"`, `aria-live="polite"`) informando qual serviço ou notícia oficial seria aberta no portal real, com fechamento por clique ou tecla `Esc`.
- **Limites visuais na barra de acessibilidade:** Exibição da escala atual (`90%` a `120%`) e desabilitação automática (`disabled`) dos botões `A-` e `A+` ao atingir os extremos.

### 5. Acessibilidade (WCAG AA/AAA)
- **Semântica e leitores de tela:** Uso de landmarks HTML5 (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`), link de salto (*"Ir para o conteúdo principal"*), atributos `aria-pressed`, `aria-expanded`, `aria-live="polite"` e SVGs decorativos marcados com `aria-hidden="true"`.
- **Alto Contraste:** Alternância dedicada com fundo preto (`#000000`), texto branco e destaques em amarelo (`#FFE600`), preservando a legibilidade do brasão.
- **Ergonomia e teclado:** Tipografia base de `16px`, áreas de toque com no mínimo `48px` de altura em botões, links e tags, anéis de foco (`:focus-visible` e `:focus-within`) nítidos e respeito a `prefers-reduced-motion`.
