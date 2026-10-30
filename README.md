# Portfólio Profissional — Leonardo Moraes

Site de portfólio moderno, minimalista, responsivo e com identidade visual sofisticada em **branco-gelo**, desenvolvido com **HTML5**, **CSS3** e **JavaScript puro** (Vanilla).

---

## 🎨 Identidade Visual — Branco-Gelo

O projeto utiliza uma paleta elegante, limpa e iluminada com predomínio do branco-gelo:

- **Fundo Principal — Branco-Gelo (`#F8FAF9`):** Predomina em praticamente todo o site, oferecendo uma experiência visual arejada e moderna.
- **Fundo Alternativo das Seções (`#F0F4F2`):** Cria transições harmônicas e ritmo entre blocos de conteúdo (Sobre Mim e Contato).
- **Cards e Superfícies Elevadas (`#FFFFFF`):** Destaque limpo com sombras suaves e bordas finas.
- **Textos Principais (`#252B29`):** Máxima nitidez e legibilidade.
- **Textos Secundários (`#68716D`):** Hierarquia suave para parágrafos e informações complementares.
- **Verde Acinzentado (`#638378`):** Identidade de apoio, marcas e ícones institucionais.
- **Azul Turquesa (`#00A7B5` / hover `#0093A0`):** Cor de ação para botões (CTA), links e estados ativos.
- **Tipografia:** Fonte **Inter** (Google Fonts).

---

## ✨ Transições & Experiência Fluida (Inspiração Lusion)

1. **Animação de Entrada na Apresentação Inicial:** Elementos da Hero (badge, títulos, texto e arte interativa) entram de forma sequencial suave no carregamento.
2. **Revelação Gradual das Seções:** Elementos entram na tela com *fade-in* e suave deslocamento vertical à medida que a página é rolada (*IntersectionObserver*).
3. **Parallax & Efeito 3D Tilt:** Efeito magnético de inclinação no card visual do Hero e nos cards de projetos, com microdeslocamento de nós flutuantes.
4. **Microinterações em Botões e Ícones:** Efeitos de elevação, escala, pulso e transição de cores ao passar o mouse.
5. **Navegação com Rolagem Suave:** Compensação de altura do cabeçalho fixo com destaque dinâmico da seção ativa.
6. **Alternância entre Tema Claro e Escuro:** Transição suave com persistência no `localStorage`.
7. **Acessibilidade:** Suporte completo à redução de movimento (`prefers-reduced-motion`).

---

## 📂 Estrutura de Arquivos

```text
portifolio/
├── index.html         # Estrutura semântica e conteúdo de todas as seções
├── style.css          # Estilos com paleta branco-gelo, temas e animações
├── script.js          # Lógica de interações, entrada da Hero, tilt 3D e validação
├── README.md          # Documentação do projeto
├── agentes.md         # Regras e premissas de desenvolvimento
├── funcionalidade.md  # Especificação técnica das funcionalidades
├── identidade.md      # Guia de identidade visual oficial
└── referencia.md      # Diretrizes de inspiração visual
```

---

## 🛠️ Como Personalizar

- **Foto de Perfil:** Localize `#photo-container` no `index.html` e insira sua imagem.
- **Projetos:** Duplique os blocos `<article class="project-card">` no `index.html` e edite títulos, descrições e links.
- **Contato e Redes Sociais:** Atualize os links de e-mail, GitHub e LinkedIn na seção `#contato`.
- **Formulário:** O formulário possui validação interativa no navegador. Para envio real, conecte a um serviço como [Formspree](https://formspree.io) adicionando `action="https://formspree.io/f/SEU_CODIGO"` ao `<form>`.

---

## 💻 Como Visualizar Localmente

Abra diretamente o arquivo `index.html` em qualquer navegador web moderno ou utilize a extensão **Live Server** no VS Code.
