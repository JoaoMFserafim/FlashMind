<div align="center">

# FlashMind
### Transformando estudo em diversão

**Flashcards personalizados · Sessões cronometradas · Resultados de estudo**

[Explorar o código](src) · [Reportar um problema](../../issues)

</div>

---

## O projeto

Aplicação de estudo com flashcards, desenvolvida com **React, TypeScript e Vite**. Permite organizar perguntas e respostas em decks e praticar em sessões com limite de tempo.

## Funcionalidades

- Criar, editar e excluir decks.
- Adicionar e remover flashcards com pergunta, resposta e imagem opcional.
- Praticar com um temporizador de 15 segundos por pergunta.
- Consultar o resumo de acertos, erros e tempo ao terminar a sessão.
- Persistir decks e resultados no navegador.

## Tecnologias

| Camada | Ferramentas |
| --- | --- |
| Interface | React 19 e CSS |
| Linguagem | TypeScript |
| Navegação | React Router |
| Desenvolvimento | Vite e ESLint |
| Identificadores | UUID |

## Executar localmente

Pré-requisito: Node.js compatível com Vite 7 (20.19+ ou 22.12+) e npm.

```bash
git clone https://github.com/JoaoMFserafim/FlashMind.git
cd FlashMind
npm ci
npm run dev
```

Abra o endereço informado pelo Vite no terminal.

| Comando | Finalidade |
| --- | --- |
| `npm run dev` | Iniciar o ambiente de desenvolvimento |
| `npm run build` | Verificar TypeScript e gerar a versão de produção |
| `npm run preview` | Visualizar a versão gerada |
| `npm run lint` | Executar a análise estática |

## Organização

```text
src/
├── hooks/    # Temporizador e sessão de jogo
├── pages/    # Início, editor de decks, jogo e resultados
├── styles/   # Estilos das páginas
├── types/    # Tipos da aplicação
└── utils/    # Persistência e funções auxiliares
```

## Estado atual

Projeto de portfólio em evolução. A opção “Meu Desempenho” na página inicial ainda está desabilitada. Os dados ficam no navegador utilizado; não há sincronização entre dispositivos.

---

Desenvolvido por [JoaoMFserafim](https://github.com/JoaoMFserafim).
